"""Purchase invoice and items DAO."""
from models.base import BaseDAO
from database.connection import db_manager
from typing import Optional, List, Dict, Any


class PurchaseInvoiceDAO(BaseDAO):
    """DAO for purchase invoices."""
    
    def __init__(self):
        super().__init__("purchase_invoices")
    
    def get_by_invoice_number(self, tenant_id: int, invoice_number: str) -> Optional[Dict[str, Any]]:
        """Get purchase invoice by invoice number."""
        query = "SELECT * FROM purchase_invoices WHERE tenant_id = ? AND invoice_number = ?"
        result = db_manager.fetch_one(query, (tenant_id, invoice_number))
        if result:
            conn = db_manager.get_connection()
            cursor = conn.execute(query, (tenant_id, invoice_number))
            columns = [desc[0] for desc in cursor.description]
            return dict(zip(columns, result))
        return None
    
    def get_with_supplier(self, tenant_id: int, invoice_id: int) -> Optional[Dict[str, Any]]:
        """Get purchase invoice with supplier details."""
        query = """
            SELECT pi.*, s.name as supplier_name, s.gstin as supplier_gstin,
                   s.address as supplier_address, s.city as supplier_city,
                   s.state as supplier_state, s.phone as supplier_phone
            FROM purchase_invoices pi
            LEFT JOIN suppliers s ON pi.supplier_id = s.id
            WHERE pi.id = ? AND pi.tenant_id = ?
        """
        result = db_manager.fetch_one(query, (invoice_id, tenant_id))
        if result:
            conn = db_manager.get_connection()
            cursor = conn.execute(query, (invoice_id, tenant_id))
            columns = [desc[0] for desc in cursor.description]
            return dict(zip(columns, result))
        return None
    
    def get_all_with_supplier(self, tenant_id: int, filters: Dict[str, Any] = None,
                              order_by: str = "pi.invoice_date DESC, pi.id DESC") -> List[Dict[str, Any]]:
        """Get all purchase invoices with supplier details."""
        query = """
            SELECT pi.*, s.name as supplier_name
            FROM purchase_invoices pi
            LEFT JOIN suppliers s ON pi.supplier_id = s.id
            WHERE pi.tenant_id = ?
        """
        params = [tenant_id]
        
        if filters:
            for key, value in filters.items():
                if key.startswith('pi.'):
                    query += f" AND {key} = ?"
                else:
                    query += f" AND pi.{key} = ?"
                params.append(value)
        
        query += f" ORDER BY {order_by}"
        
        results = db_manager.fetch_all(query, tuple(params))
        if results:
            conn = db_manager.get_connection()
            cursor = conn.execute(query, tuple(params))
            columns = [desc[0] for desc in cursor.description]
            return [dict(zip(columns, row)) for row in results]
        return []


class PurchaseItemDAO(BaseDAO):
    """DAO for purchase invoice items."""
    
    def __init__(self):
        super().__init__("purchase_items")
    
    def create(self, tenant_id: int, data: Dict[str, Any]) -> int:
        """Create a new purchase item (without created_at/updated_at)."""
        data['tenant_id'] = tenant_id
        # purchase_items table doesn't have created_at/updated_at columns
        
        # If ID is provided, use it; otherwise DuckDB will need manual ID generation
        record_id = data.get('id')
        
        columns = ', '.join(data.keys())
        placeholders = ', '.join(['?' for _ in data])
        values = tuple(data.values())
        
        query = f"INSERT INTO {self.table_name} ({columns}) VALUES ({placeholders})"
        db_manager.execute(query, values)
        db_manager.commit()
        
        # Return the ID that was set (either manually provided or from data)
        return record_id if record_id else None
    
    def get_by_invoice_id(self, tenant_id: int, invoice_id: int) -> List[Dict[str, Any]]:
        """Get all items for a purchase invoice."""
        query = """
            SELECT pi.*, p.name as product_name, p.sku as product_sku, p.unit as product_unit
            FROM purchase_items pi
            LEFT JOIN products p ON pi.product_id = p.id
            WHERE pi.purchase_invoice_id = ? AND pi.tenant_id = ?
            ORDER BY pi.id
        """
        results = db_manager.fetch_all(query, (invoice_id, tenant_id))
        if results:
            conn = db_manager.get_connection()
            cursor = conn.execute(query, (invoice_id, tenant_id))
            columns = [desc[0] for desc in cursor.description]
            return [dict(zip(columns, row)) for row in results]
        return []
    
    def delete_by_invoice_id(self, tenant_id: int, invoice_id: int) -> bool:
        """Delete all items for a purchase invoice."""
        query = "DELETE FROM purchase_items WHERE purchase_invoice_id = ? AND tenant_id = ?"
        db_manager.execute(query, (invoice_id, tenant_id))
        db_manager.commit()
        return True

