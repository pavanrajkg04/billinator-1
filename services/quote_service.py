"""Quote/Estimate service for CRM."""
from models.base import BaseDAO
from database.connection import db_manager
from typing import Optional, List, Dict, Any
from services.audit_service import AuditService
from datetime import datetime


class QuoteDAO(BaseDAO):
    """Data Access Object for quotes."""
    
    def __init__(self):
        super().__init__("quotes")
    
    def get_by_customer(self, tenant_id: int, customer_id: int) -> List[Dict[str, Any]]:
        """Get all quotes for a customer."""
        query = f"SELECT * FROM {self.table_name} WHERE tenant_id = ? AND customer_id = ? ORDER BY created_at DESC"
        conn = db_manager.get_connection()
        cursor = conn.execute(query, (tenant_id, customer_id))
        results = cursor.fetchall()
        if results:
            columns = [desc[0] for desc in cursor.description]
            return [dict(zip(columns, row)) for row in results]
        return []


class QuoteItemDAO(BaseDAO):
    """Data Access Object for quote items."""
    
    def __init__(self):
        super().__init__("quote_items")
    
    def get_by_quote_id(self, tenant_id: int, quote_id: int) -> List[Dict[str, Any]]:
        """Get all items for a quote."""
        query = f"SELECT * FROM {self.table_name} WHERE tenant_id = ? AND quote_id = ? ORDER BY id"
        conn = db_manager.get_connection()
        cursor = conn.execute(query, (tenant_id, quote_id))
        results = cursor.fetchall()
        if results:
            columns = [desc[0] for desc in cursor.description]
            return [dict(zip(columns, row)) for row in results]
        return []
    
    def delete_by_quote_id(self, tenant_id: int, quote_id: int):
        """Delete all items for a quote."""
        query = f"DELETE FROM {self.table_name} WHERE tenant_id = ? AND quote_id = ?"
        db_manager.execute(query, (tenant_id, quote_id))
        db_manager.commit()


class QuoteService:
    """Service for quote/estimate management."""
    
    def __init__(self):
        self.quote_dao = QuoteDAO()
        self.item_dao = QuoteItemDAO()
    
    def generate_quote_number(self, tenant_id: int) -> str:
        """Generate next quote number."""
        max_num_result = db_manager.fetch_one(
            "SELECT COALESCE(MAX(CAST(SUBSTR(quote_number, 5) AS INTEGER)), 0) FROM quotes WHERE tenant_id = ? AND quote_number LIKE 'QUO-%'",
            (tenant_id,)
        )
        next_num = (max_num_result[0] if max_num_result else 0) + 1
        return f"QUO-{next_num:06d}"
    
    def create_quote(self, tenant_id: int, user_id: int, quote_data: Dict[str, Any]) -> Optional[int]:
        """Create a new quote with items."""
        # Generate quote number
        quote_number = quote_data.get('quote_number') or self.generate_quote_number(tenant_id)
        quote_data['quote_number'] = quote_number
        
        # Calculate totals
        items = quote_data.pop('items', [])
        subtotal = sum(float(item.get('line_total', 0)) for item in items)
        tax_amount = sum(float(item.get('line_total', 0)) * float(item.get('tax_rate', 0)) / 100 for item in items)
        total_amount = subtotal + tax_amount
        
        quote_data['subtotal'] = subtotal
        quote_data['tax_amount'] = tax_amount
        quote_data['total_amount'] = total_amount
        quote_data['created_by'] = user_id
        
        max_id_result = db_manager.fetch_one("SELECT COALESCE(MAX(id), 0) FROM quotes")
        next_id = (max_id_result[0] if max_id_result else 0) + 1
        quote_data['id'] = next_id
        
        quote_id = self.quote_dao.create(tenant_id, quote_data)
        
        if quote_id:
            # Create quote items
            for item in items:
                max_item_id = db_manager.fetch_one("SELECT COALESCE(MAX(id), 0) FROM quote_items")
                next_item_id = (max_item_id[0] if max_item_id else 0) + 1
                item['id'] = next_item_id
                item['quote_id'] = quote_id
                self.item_dao.create(tenant_id, item)
            
            AuditService.log_action(
                tenant_id, user_id, "CREATE_QUOTE",
                entity_type="quotes", entity_id=quote_id,
                details=f"Created quote: {quote_number}"
            )
        
        return quote_id
    
    def get_quote(self, tenant_id: int, quote_id: int) -> Optional[Dict[str, Any]]:
        """Get a quote with items."""
        quote = self.quote_dao.get_by_id(tenant_id, quote_id)
        if quote:
            quote['items'] = self.item_dao.get_by_quote_id(tenant_id, quote_id)
        return quote
    
    def list_quotes(self, tenant_id: int, filters: Dict[str, Any] = None) -> List[Dict[str, Any]]:
        """List all quotes for a tenant."""
        query = f"SELECT * FROM {self.quote_dao.table_name} WHERE tenant_id = ?"
        params = [tenant_id]
        
        if filters:
            if filters.get('customer_id'):
                query += " AND customer_id = ?"
                params.append(filters['customer_id'])
            if filters.get('status'):
                query += " AND status = ?"
                params.append(filters['status'])
        
        query += " ORDER BY created_at DESC"
        
        conn = db_manager.get_connection()
        cursor = conn.execute(query, tuple(params))
        results = cursor.fetchall()
        if results:
            columns = [desc[0] for desc in cursor.description]
            return [dict(zip(columns, row)) for row in results]
        return []
    
    def update_quote(self, tenant_id: int, user_id: int, quote_id: int, quote_data: Dict[str, Any]) -> bool:
        """Update a quote and its items."""
        items = quote_data.pop('items', None)
        
        if items is not None:
            # Recalculate totals
            subtotal = sum(float(item.get('line_total', 0)) for item in items)
            tax_amount = sum(float(item.get('line_total', 0)) * float(item.get('tax_rate', 0)) / 100 for item in items)
            total_amount = subtotal + tax_amount
            
            quote_data['subtotal'] = subtotal
            quote_data['tax_amount'] = tax_amount
            quote_data['total_amount'] = total_amount
            
            # Delete existing items and create new ones
            self.item_dao.delete_by_quote_id(tenant_id, quote_id)
            for item in items:
                max_item_id = db_manager.fetch_one("SELECT COALESCE(MAX(id), 0) FROM quote_items")
                next_item_id = (max_item_id[0] if max_item_id else 0) + 1
                item['id'] = next_item_id
                item['quote_id'] = quote_id
                self.item_dao.create(tenant_id, item)
        
        result = self.quote_dao.update(tenant_id, quote_id, quote_data)
        if result:
            AuditService.log_action(
                tenant_id, user_id, "UPDATE_QUOTE",
                entity_type="quotes", entity_id=quote_id,
                details="Updated quote"
            )
        return result
    
    def delete_quote(self, tenant_id: int, user_id: int, quote_id: int) -> bool:
        """Delete a quote and its items."""
        # Items will be deleted by CASCADE
        result = self.quote_dao.delete(tenant_id, quote_id)
        if result:
            AuditService.log_action(
                tenant_id, user_id, "DELETE_QUOTE",
                entity_type="quotes", entity_id=quote_id,
                details="Deleted quote"
            )
        return result
    
    def convert_to_invoice(self, tenant_id: int, user_id: int, quote_id: int) -> Optional[int]:
        """Convert a quote to a sales invoice."""
        quote = self.get_quote(tenant_id, quote_id)
        if not quote or quote['status'] != 'ACCEPTED':
            raise ValueError("Quote must be accepted before converting to invoice")
        
        # This would integrate with sales_service to create invoice
        # For now, just return None as placeholder
        return None

