"""Sales service for business logic."""
from models.sales_dao import SalesInvoiceDAO, SalesItemDAO
from models.product_dao import ProductDAO
from database.connection import db_manager
from services.audit_service import AuditService
from typing import Optional, List, Dict, Any
from datetime import date
import re
import logging

logger = logging.getLogger(__name__)


class SalesService:
    """Service for sales invoice management."""
    
    def __init__(self):
        self.invoice_dao = SalesInvoiceDAO()
        self.item_dao = SalesItemDAO()
        self.product_dao = ProductDAO()
    
    def _generate_invoice_number(self, tenant_id: int) -> str:
        """Generate next sales invoice number."""
        settings_query = "SELECT sales_invoice_prefix, sales_invoice_start_number FROM invoice_settings WHERE tenant_id = ?"
        settings = db_manager.fetch_one(settings_query, (tenant_id,))
        
        if settings:
            prefix = settings[0] or "INV"
            start_num = settings[1] or 1
        else:
            prefix = "INV"
            start_num = 1
        
        last_invoice = self.invoice_dao.get_all(tenant_id, order_by="id DESC", limit=1)
        
        if last_invoice:
            last_number = last_invoice[0].get('invoice_number', '')
            match = re.search(r'\d+$', last_number)
            if match:
                next_num = int(match.group()) + 1
            else:
                next_num = start_num
        else:
            next_num = start_num
        
        return f"{prefix}-{next_num:06d}"
    
    def _calculate_gst(self, amount: float, tax_rate: float, customer_state: str, tenant_state: str, place_of_supply: str = None) -> Dict[str, float]:
        """Calculate CGST/SGST or IGST based on states."""
        cgst = 0.0
        sgst = 0.0
        igst = 0.0
        
        if tax_rate > 0:
            tax_amount = (amount * tax_rate) / 100
            supply_state = place_of_supply or customer_state
            if supply_state and tenant_state and supply_state.upper() == tenant_state.upper():
                cgst = tax_amount / 2
                sgst = tax_amount / 2
            else:
                igst = tax_amount
        
        return {"cgst": cgst, "sgst": sgst, "igst": igst}
    
    def create_sales_invoice(self, tenant_id: int, user_id: int, invoice_data: Dict[str, Any]) -> Optional[int]:
        """Create a new sales invoice with items."""
        try:
            invoice_number = self._generate_invoice_number(tenant_id)
            
            customer_id = invoice_data.get('customer_id')
            customer_state = None
            if customer_id:
                customer_query = "SELECT state FROM customers WHERE id = ? AND tenant_id = ?"
                customer = db_manager.fetch_one(customer_query, (customer_id, tenant_id))
                customer_state = customer[0] if customer else None
            
            tenant_query = "SELECT state FROM tenants WHERE id = ?"
            tenant = db_manager.fetch_one(tenant_query, (tenant_id,))
            tenant_state = tenant[0] if tenant else None
            
            place_of_supply = invoice_data.get('place_of_supply')
            
            items = invoice_data.pop('items', [])
            subtotal = 0.0
            total_cgst = 0.0
            total_sgst = 0.0
            total_igst = 0.0
            
            # Normalize optional fields
            due_date = invoice_data.get("due_date") or None
            if due_date == "":
                due_date = None

            invoice_record = {
                'invoice_number': invoice_number,
                'customer_id': customer_id,
                'invoice_type': invoice_data.get('invoice_type', 'B2B'),
                'invoice_date': invoice_data.get('invoice_date', date.today().isoformat()),
                'due_date': due_date,
                'place_of_supply': place_of_supply,
                'subtotal': 0.0,
                'cgst_amount': 0.0,
                'sgst_amount': 0.0,
                'igst_amount': 0.0,
                'total_amount': 0.0,
                'paid_amount': invoice_data.get('paid_amount', 0.0),
                'status': 'PENDING',
                'notes': invoice_data.get('notes'),
                'created_by': user_id,
            }
            
            max_id_result = db_manager.fetch_one("SELECT COALESCE(MAX(id), 0) FROM sales_invoices")
            next_id = (max_id_result[0] if max_id_result else 0) + 1
            invoice_record['id'] = next_id
            invoice_id = self.invoice_dao.create(tenant_id, invoice_record)
            if not invoice_id:
                return None
            
            for item in items:
                product_id = item.get('product_id')
                if not product_id:
                    raise ValueError("Each sales item must have a product selected")
                quantity = float(item.get('quantity', 0))
                unit_price = float(item.get('unit_price', 0))
                tax_rate = float(item.get('tax_rate', 0))
                
                item_amount = quantity * unit_price
                subtotal += item_amount
                
                gst = self._calculate_gst(item_amount, tax_rate, customer_state, tenant_state, place_of_supply)
                total_cgst += gst['cgst']
                total_sgst += gst['sgst']
                total_igst += gst['igst']
                
                max_item_id = db_manager.fetch_one("SELECT COALESCE(MAX(id), 0) FROM sales_items")
                next_item_id = (max_item_id[0] if max_item_id else 0) + 1
                item_record = {
                    'id': next_item_id,
                    'sales_invoice_id': invoice_id,
                    'product_id': product_id,
                    'quantity': quantity,
                    'unit_price': unit_price,
                    'tax_rate': tax_rate,
                    'cgst_amount': gst['cgst'],
                    'sgst_amount': gst['sgst'],
                    'igst_amount': gst['igst'],
                    'total_amount': item_amount + gst['cgst'] + gst['sgst'] + gst['igst'],
                }
                self.item_dao.create(tenant_id, item_record)
                
                self.product_dao.update_stock(tenant_id, product_id, quantity, "subtract")
            
            total_amount = subtotal + total_cgst + total_sgst + total_igst
            paid_amount = float(invoice_data.get('paid_amount', 0))
            status = 'PAID' if paid_amount >= total_amount else ('PARTIAL' if paid_amount > 0 else 'PENDING')
            
            self.invoice_dao.update(tenant_id, invoice_id, {
                'subtotal': subtotal,
                'cgst_amount': total_cgst,
                'sgst_amount': total_sgst,
                'igst_amount': total_igst,
                'total_amount': total_amount,
                'paid_amount': paid_amount,
                'status': status,
            })
            
            if total_amount > paid_amount and customer_id:
                outstanding = total_amount - paid_amount
                customer_query = "UPDATE customers SET outstanding_balance = outstanding_balance + ? WHERE id = ? AND tenant_id = ?"
                db_manager.execute(customer_query, (outstanding, customer_id, tenant_id))
                db_manager.commit()
            
            AuditService.log_action(
                tenant_id, user_id, "CREATE_SALES_INVOICE",
                entity_type="sales_invoices", entity_id=invoice_id,
                details=f"Created sales invoice: {invoice_number}"
            )
            
            return invoice_id
        except Exception as e:
            logger.error(f"Error creating sales invoice: {e}", exc_info=True)
            try:
                db_manager.rollback()
            except Exception:
                pass
            # Surface error to route so UI gets a real 4xx/5xx response
            raise
    
    def get_sales_invoice(self, tenant_id: int, invoice_id: int) -> Optional[Dict[str, Any]]:
        """Get sales invoice with items."""
        invoice = self.invoice_dao.get_with_customer(tenant_id, invoice_id)
        if invoice:
            invoice['items'] = self.item_dao.get_by_invoice_id(tenant_id, invoice_id)
        return invoice
    
    def list_sales_invoices(self, tenant_id: int, filters: Dict[str, Any] = None) -> List[Dict[str, Any]]:
        """List all sales invoices."""
        return self.invoice_dao.get_all_with_customer(tenant_id, filters)
    
    def record_payment(
        self,
        tenant_id: int,
        user_id: int,
        invoice_id: int,
        payment_amount: float,
        payment_date: str | None = None,
        payment_mode: str = "CASH",
        reference_number: str | None = None,
        notes: str | None = None,
    ) -> bool:
        """Record a payment on a sales invoice.

        - Increases invoice.paid_amount (capped at total_amount)
        - Updates invoice.status
        - Reduces customer.outstanding_balance (if customer_id exists)
        - Inserts a row into payments_received (if customer_id exists)
        """
        try:
            if payment_amount is None or float(payment_amount) <= 0:
                raise ValueError("Payment amount must be greater than 0")

            # Get current invoice
            invoice = self.invoice_dao.get_by_id(tenant_id, invoice_id)
            if not invoice:
                return False
            
            current_paid = float(invoice.get('paid_amount', 0))
            total_amount = float(invoice['total_amount'])
            customer_id = invoice.get('customer_id')

            remaining = max(0.0, total_amount - current_paid)
            applied_amount = min(float(payment_amount), remaining)
            if applied_amount <= 0:
                return True
            
            # Calculate new paid amount
            new_paid = current_paid + applied_amount
            
            # Calculate status
            if new_paid >= total_amount:
                status = 'PAID'
            elif new_paid > 0:
                status = 'PARTIAL'
            else:
                status = 'PENDING'
            
            # Update invoice
            update_data = {
                'paid_amount': new_paid,
                'status': status,
            }
            self.invoice_dao.update(tenant_id, invoice_id, update_data)
            
            # Update customer outstanding balance
            if customer_id:
                # Calculate outstanding before and after payment
                old_outstanding = total_amount - current_paid
                new_outstanding = total_amount - new_paid
                outstanding_reduction = old_outstanding - new_outstanding
                
                if outstanding_reduction > 0:
                    customer_query = "UPDATE customers SET outstanding_balance = outstanding_balance - ? WHERE id = ? AND tenant_id = ?"
                    db_manager.execute(customer_query, (outstanding_reduction, customer_id, tenant_id))

                # Insert payment row (customer_id is NOT NULL in schema)
                max_id_result = db_manager.fetch_one("SELECT COALESCE(MAX(id), 0) FROM payments_received")
                next_id = (max_id_result[0] if max_id_result else 0) + 1
                pay_date = payment_date or date.today().isoformat()
                mode = (payment_mode or "CASH").strip().upper()
                db_manager.execute(
                    """
                    INSERT INTO payments_received
                    (id, tenant_id, customer_id, sales_invoice_id, payment_date, amount, payment_mode, reference_number, notes, created_by)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    """,
                    (next_id, tenant_id, customer_id, invoice_id, pay_date, applied_amount, mode, reference_number, notes, user_id),
                )
                db_manager.commit()
            
            AuditService.log_action(
                tenant_id, user_id, "RECORD_SALES_PAYMENT",
                entity_type="sales_invoices", entity_id=invoice_id,
                details=f"Recorded payment of {applied_amount} on sales invoice"
            )
            
            return True
        except Exception as e:
            logger.error(f"Error recording sales payment: {e}", exc_info=True)
            try:
                db_manager.rollback()
            except Exception:
                pass
            raise
    
    def delete_sales_invoice(self, tenant_id: int, user_id: int, invoice_id: int) -> bool:
        """Delete sales invoice."""
        try:
            invoice = self.invoice_dao.get_by_id(tenant_id, invoice_id)
            if not invoice:
                return False
            
            # Delete related payments first (to avoid foreign key constraint)
            payments_query = "DELETE FROM payments_received WHERE sales_invoice_id = ? AND tenant_id = ?"
            db_manager.execute(payments_query, (invoice_id, tenant_id))
            db_manager.commit()
            
            items = self.item_dao.get_by_invoice_id(tenant_id, invoice_id)
            for item in items:
                self.product_dao.update_stock(tenant_id, item['product_id'], float(item['quantity']), "add")
            
            outstanding = float(invoice['total_amount']) - float(invoice.get('paid_amount', 0))
            if outstanding > 0 and invoice.get('customer_id'):
                customer_query = "UPDATE customers SET outstanding_balance = outstanding_balance - ? WHERE id = ? AND tenant_id = ?"
                db_manager.execute(customer_query, (outstanding, invoice['customer_id'], tenant_id))
                db_manager.commit()
            
            # Delete stock transactions related to this invoice
            stock_transactions_query = """
                DELETE FROM stock_transactions 
                WHERE tenant_id = ? 
                AND reference_type = 'SALES_INVOICE' 
                AND reference_id = ?
            """
            db_manager.execute(stock_transactions_query, (tenant_id, invoice_id))
            db_manager.commit()
            
            # Delete items (must be deleted before invoice due to foreign key)
            self.item_dao.delete_by_invoice_id(tenant_id, invoice_id)
            
            # Delete invoice
            result = self.invoice_dao.delete(tenant_id, invoice_id)
            
            if result:
                db_manager.commit()
                AuditService.log_action(
                    tenant_id, user_id, "DELETE_SALES_INVOICE",
                    entity_type="sales_invoices", entity_id=invoice_id,
                    details="Deleted sales invoice"
                )
            
            return result
        except Exception as e:
            print(f"Error deleting sales invoice: {e}")
            db_manager.rollback()
            # Re-raise the exception so the UI can display the error message
            raise

