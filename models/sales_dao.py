"""Sales invoice and items DAO."""
from models.base import BaseDAO
from database.connection import db_manager
from typing import Optional, List, Dict, Any


class SalesInvoiceDAO(BaseDAO):
    """DAO for sales invoices."""
    
    def __init__(self):
        super().__init__("sales_invoices")
    
    def get_by_invoice_number(self, tenant_id: int, invoice_number: str) -> Optional[Dict[str, Any]]:
        """Get sales invoice by invoice number."""
        query = "SELECT * FROM sales_invoices WHERE tenant_id = ? AND invoice_number = ?"
        result = db_manager.fetch_one(query, (tenant_id, invoice_number))
        if result:
            conn = db_manager.get_connection()
            cursor = conn.execute(query, (tenant_id, invoice_number))
            columns = [desc[0] for desc in cursor.description]
            return dict(zip(columns, result))
        return None
    
    def get_with_customer(self, tenant_id: int, invoice_id: int) -> Optional[Dict[str, Any]]:
        """Get sales invoice with customer details."""
        query = """
            SELECT si.*, c.name as customer_name, c.gstin as customer_gstin,
                   c.address as customer_address, c.city as customer_city,
                   c.state as customer_state, c.phone as customer_phone
            FROM sales_invoices si
            LEFT JOIN customers c ON si.customer_id = c.id
            WHERE si.id = ? AND si.tenant_id = ?
        """
        result = db_manager.fetch_one(query, (invoice_id, tenant_id))
        if result:
            conn = db_manager.get_connection()
            cursor = conn.execute(query, (invoice_id, tenant_id))
            columns = [desc[0] for desc in cursor.description]
            return dict(zip(columns, result))
        return None
    
    def get_all_with_customer(self, tenant_id: int, filters: Dict[str, Any] = None,
                              order_by: str = "si.invoice_date DESC, si.id DESC") -> List[Dict[str, Any]]:
        """Get all sales invoices with customer details."""
        query = """
            SELECT si.*, c.name as customer_name
            FROM sales_invoices si
            LEFT JOIN customers c ON si.customer_id = c.id
            WHERE si.tenant_id = ?
        """
        params = [tenant_id]
        
        if filters:
            for key, value in filters.items():
                if key.startswith('si.'):
                    query += f" AND {key} = ?"
                else:
                    query += f" AND si.{key} = ?"
                params.append(value)
        
        query += f" ORDER BY {order_by}"
        
        results = db_manager.fetch_all(query, tuple(params))
        if results:
            conn = db_manager.get_connection()
            cursor = conn.execute(query, tuple(params))
            columns = [desc[0] for desc in cursor.description]
            return [dict(zip(columns, row)) for row in results]
        return []


class SalesItemDAO(BaseDAO):
    """DAO for sales invoice items."""
    
    def __init__(self):
        super().__init__("sales_items")
    
    def create(self, tenant_id: int, data: Dict[str, Any]) -> int:
        """Create a new sales item (without created_at/updated_at)."""
        data['tenant_id'] = tenant_id
        # sales_items table doesn't have created_at/updated_at columns
        
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
        """Get all items for a sales invoice."""
        query = """
            SELECT si.*, p.name as product_name, p.sku as product_sku, p.unit as product_unit
            FROM sales_items si
            LEFT JOIN products p ON si.product_id = p.id
            WHERE si.sales_invoice_id = ? AND si.tenant_id = ?
            ORDER BY si.id
        """
        results = db_manager.fetch_all(query, (invoice_id, tenant_id))
        if results:
            conn = db_manager.get_connection()
            cursor = conn.execute(query, (invoice_id, tenant_id))
            columns = [desc[0] for desc in cursor.description]
            return [dict(zip(columns, row)) for row in results]
        return []
    
    def delete_by_invoice_id(self, tenant_id: int, invoice_id: int) -> bool:
        """Delete all items for a sales invoice."""
        query = "DELETE FROM sales_items WHERE sales_invoice_id = ? AND tenant_id = ?"
        db_manager.execute(query, (invoice_id, tenant_id))
        db_manager.commit()
        return True

