"""Purchase service for business logic."""
from models.purchase_dao import PurchaseInvoiceDAO, PurchaseItemDAO
from models.product_dao import ProductDAO
from database.connection import db_manager
from services.audit_service import AuditService
from typing import Optional, List, Dict, Any
from datetime import date, datetime
import re


class PurchaseService:
    """Service for purchase invoice management."""
    
    def __init__(self):
        self.invoice_dao = PurchaseInvoiceDAO()
        self.item_dao = PurchaseItemDAO()
        self.product_dao = ProductDAO()
    
    def _generate_invoice_number(self, tenant_id: int) -> str:
        """Generate next purchase invoice number."""
        # Get invoice settings
        settings_query = "SELECT purchase_invoice_prefix, purchase_invoice_start_number FROM invoice_settings WHERE tenant_id = ?"
        settings = db_manager.fetch_one(settings_query, (tenant_id,))
        
        if settings:
            prefix = settings[0] or "PINV"
            start_num = settings[1] or 1
        else:
            prefix = "PINV"
            start_num = 1
        
        # Get last invoice number
        last_invoice = self.invoice_dao.get_all(tenant_id, order_by="id DESC", limit=1)
        
        if last_invoice:
            last_number = last_invoice[0].get('invoice_number', '')
            # Extract number from last invoice
            match = re.search(r'\d+$', last_number)
            if match:
                next_num = int(match.group()) + 1
            else:
                next_num = start_num
        else:
            next_num = start_num
        
        return f"{prefix}-{next_num:06d}"
    
    def _calculate_gst(self, amount: float, tax_rate: float, supplier_state: str, tenant_state: str) -> Dict[str, float]:
        """Calculate CGST/SGST or IGST based on states."""
        cgst = 0.0
        sgst = 0.0
        igst = 0.0
        
        if tax_rate > 0:
            tax_amount = (amount * tax_rate) / 100
            if supplier_state and tenant_state and supplier_state.upper() == tenant_state.upper():
                # Same state - CGST + SGST
                cgst = tax_amount / 2
                sgst = tax_amount / 2
            else:
                # Different state - IGST
                igst = tax_amount
        
        return {"cgst": cgst, "sgst": sgst, "igst": igst}
    
    def create_purchase_invoice(self, tenant_id: int, user_id: int, invoice_data: Dict[str, Any]) -> Optional[int]:
        """Create a new purchase invoice with items."""
        try:
            # Generate invoice number
            invoice_number = self._generate_invoice_number(tenant_id)
            
            # Get supplier state for GST calculation
            supplier_id = invoice_data.get('supplier_id')
            supplier_query = "SELECT state FROM suppliers WHERE id = ? AND tenant_id = ?"
            supplier = db_manager.fetch_one(supplier_query, (supplier_id, tenant_id))
            supplier_state = supplier[0] if supplier else None
            
            # Get tenant state
            tenant_query = "SELECT state FROM tenants WHERE id = ?"
            tenant = db_manager.fetch_one(tenant_query, (tenant_id,))
            tenant_state = tenant[0] if tenant else None
            
            # Calculate totals from items
            items = invoice_data.pop('items', [])
            subtotal = 0.0
            total_cgst = 0.0
            total_sgst = 0.0
            total_igst = 0.0
            
            # Prepare invoice data
            invoice_record = {
                'invoice_number': invoice_number,
                'supplier_id': invoice_data.get('supplier_id'),
                'invoice_date': invoice_data.get('invoice_date', date.today().isoformat()),
                'due_date': invoice_data.get('due_date'),
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
            
            # Create invoice first (with manual ID generation)
            max_id_result = db_manager.fetch_one("SELECT COALESCE(MAX(id), 0) FROM purchase_invoices")
            next_id = (max_id_result[0] if max_id_result else 0) + 1
            invoice_record['id'] = next_id
            invoice_id = self.invoice_dao.create(tenant_id, invoice_record)
            if not invoice_id:
                return None
            
            # Process items
            for item in items:
                product_id = item.get('product_id')
                quantity = float(item.get('quantity', 0))
                unit_price = float(item.get('unit_price', 0))
                tax_rate = float(item.get('tax_rate', 0))
                
                item_amount = quantity * unit_price
                subtotal += item_amount
                
                # Calculate GST for this item
                gst = self._calculate_gst(item_amount, tax_rate, supplier_state, tenant_state)
                total_cgst += gst['cgst']
                total_sgst += gst['sgst']
                total_igst += gst['igst']
                
                # Create item record (with manual ID generation)
                max_item_id = db_manager.fetch_one("SELECT COALESCE(MAX(id), 0) FROM purchase_items")
                next_item_id = (max_item_id[0] if max_item_id else 0) + 1
                item_record = {
                    'id': next_item_id,
                    'purchase_invoice_id': invoice_id,
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
                
                # Update stock
                self.product_dao.update_stock(tenant_id, product_id, quantity, "add")
            
            # Update invoice totals
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
            
            # Update supplier outstanding balance
            if total_amount > paid_amount:
                outstanding = total_amount - paid_amount
                supplier_query = "UPDATE suppliers SET outstanding_balance = outstanding_balance + ? WHERE id = ? AND tenant_id = ?"
                db_manager.execute(supplier_query, (outstanding, supplier_id, tenant_id))
                db_manager.commit()
            
            # Log action
            AuditService.log_action(
                tenant_id, user_id, "CREATE_PURCHASE_INVOICE",
                entity_type="purchase_invoices", entity_id=invoice_id,
                details=f"Created purchase invoice: {invoice_number}"
            )
            
            return invoice_id
        except Exception as e:
            print(f"Error creating purchase invoice: {e}")
            # Re-raise the exception so the UI can display the error message
            raise
    
    def get_purchase_invoice(self, tenant_id: int, invoice_id: int) -> Optional[Dict[str, Any]]:
        """Get purchase invoice with items."""
        invoice = self.invoice_dao.get_with_supplier(tenant_id, invoice_id)
        if invoice:
            invoice['items'] = self.item_dao.get_by_invoice_id(tenant_id, invoice_id)
        return invoice
    
    def list_purchase_invoices(self, tenant_id: int, filters: Dict[str, Any] = None) -> List[Dict[str, Any]]:
        """List all purchase invoices."""
        return self.invoice_dao.get_all_with_supplier(tenant_id, filters)
    
    def update_purchase_invoice(self, tenant_id: int, user_id: int, invoice_id: int, invoice_data: Dict[str, Any]) -> bool:
        """Update purchase invoice (limited - mainly status and payments)."""
        # For now, only allow updating paid_amount and status
        update_data = {}
        if 'paid_amount' in invoice_data:
            update_data['paid_amount'] = float(invoice_data['paid_amount'])
            # Get current invoice
            invoice = self.invoice_dao.get_by_id(tenant_id, invoice_id)
            if invoice:
                total = float(invoice['total_amount'])
                paid = float(update_data['paid_amount'])
                if paid >= total:
                    update_data['status'] = 'PAID'
                elif paid > 0:
                    update_data['status'] = 'PARTIAL'
                else:
                    update_data['status'] = 'PENDING'
        
        if update_data:
            result = self.invoice_dao.update(tenant_id, invoice_id, update_data)
            if result:
                AuditService.log_action(
                    tenant_id, user_id, "UPDATE_PURCHASE_INVOICE",
                    entity_type="purchase_invoices", entity_id=invoice_id,
                    details="Updated purchase invoice"
                )
            return result
        return False
    
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
        """Record a payment on a purchase invoice.

        - Increases invoice.paid_amount (capped at total_amount)
        - Updates invoice.status
        - Reduces supplier.outstanding_balance
        - Inserts a row into payments_made
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
            supplier_id = invoice['supplier_id']

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
            result = self.invoice_dao.update(tenant_id, invoice_id, update_data)
            
            if result:
                # Update supplier outstanding balance
                # Calculate old outstanding and new outstanding
                old_outstanding = total_amount - current_paid
                new_outstanding = total_amount - new_paid
                outstanding_change = old_outstanding - new_outstanding
                
                if outstanding_change != 0:
                    supplier_query = "UPDATE suppliers SET outstanding_balance = outstanding_balance - ? WHERE id = ? AND tenant_id = ?"
                    db_manager.execute(supplier_query, (outstanding_change, supplier_id, tenant_id))

                # Insert payment row
                max_id_result = db_manager.fetch_one("SELECT COALESCE(MAX(id), 0) FROM payments_made")
                next_id = (max_id_result[0] if max_id_result else 0) + 1
                pay_date = payment_date or date.today().isoformat()
                mode = (payment_mode or "CASH").strip().upper()
                db_manager.execute(
                    """
                    INSERT INTO payments_made
                    (id, tenant_id, supplier_id, purchase_invoice_id, payment_date, amount, payment_mode, reference_number, notes, created_by)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    """,
                    (next_id, tenant_id, supplier_id, invoice_id, pay_date, applied_amount, mode, reference_number, notes, user_id),
                )
                db_manager.commit()
                
                # Log action
                AuditService.log_action(
                    tenant_id, user_id, "RECORD_PURCHASE_PAYMENT",
                    entity_type="purchase_invoices", entity_id=invoice_id,
                    details=f"Recorded payment of {applied_amount} on invoice {invoice.get('invoice_number', '')}"
                )
            
            return result
        except Exception as e:
            print(f"Error recording purchase payment: {e}")
            try:
                db_manager.rollback()
            except Exception:
                pass
            raise
    
    def delete_purchase_invoice(self, tenant_id: int, user_id: int, invoice_id: int) -> bool:
        """Delete purchase invoice (reverse stock and outstanding)."""
        try:
            invoice = self.invoice_dao.get_by_id(tenant_id, invoice_id)
            if not invoice:
                return False
            
            # Delete related payments first (to avoid foreign key constraint)
            payments_query = "DELETE FROM payments_made WHERE purchase_invoice_id = ? AND tenant_id = ?"
            db_manager.execute(payments_query, (invoice_id, tenant_id))
            db_manager.commit()
            
            # Reverse stock updates
            items = self.item_dao.get_by_invoice_id(tenant_id, invoice_id)
            for item in items:
                self.product_dao.update_stock(tenant_id, item['product_id'], float(item['quantity']), "subtract")
            
            # Reverse outstanding balance
            outstanding = float(invoice['total_amount']) - float(invoice.get('paid_amount', 0))
            if outstanding > 0:
                supplier_query = "UPDATE suppliers SET outstanding_balance = outstanding_balance - ? WHERE id = ? AND tenant_id = ?"
                db_manager.execute(supplier_query, (outstanding, invoice['supplier_id'], tenant_id))
                db_manager.commit()
            
            # Delete stock transactions related to this invoice
            stock_transactions_query = """
                DELETE FROM stock_transactions 
                WHERE tenant_id = ? 
                AND reference_type = 'PURCHASE_INVOICE' 
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
                    tenant_id, user_id, "DELETE_PURCHASE_INVOICE",
                    entity_type="purchase_invoices", entity_id=invoice_id,
                    details="Deleted purchase invoice"
                )
            
            return result
        except Exception as e:
            print(f"Error deleting purchase invoice: {e}")
            db_manager.rollback()
            # Re-raise the exception so the UI can display the error message
            raise

