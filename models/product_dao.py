"""Product DAO for database operations."""
from models.base import BaseDAO
from database.connection import db_manager
from typing import Optional, List, Dict, Any


class ProductDAO(BaseDAO):
    """Data Access Object for products."""
    
    def __init__(self):
        super().__init__("products")
    
    def get_by_sku(self, tenant_id: int, sku: str) -> Optional[Dict[str, Any]]:
        """Get product by SKU."""
        query = "SELECT * FROM products WHERE tenant_id = ? AND sku = ?"
        result = db_manager.fetch_one(query, (tenant_id, sku))
        if result:
            conn = db_manager.get_connection()
            cursor = conn.execute(query, (tenant_id, sku))
            columns = [desc[0] for desc in cursor.description]
            return dict(zip(columns, result))
        return None
    
    def update_stock(self, tenant_id: int, product_id: int, quantity: float, operation: str = "add"):
        """Update product stock (add or subtract)."""
        product = self.get_by_id(tenant_id, product_id)
        if not product:
            return False
        
        current_stock = float(product['current_stock'])
        if operation == "add":
            new_stock = current_stock + quantity
        elif operation == "subtract":
            new_stock = max(0, current_stock - quantity)
        else:
            new_stock = quantity
        
        return self.update(tenant_id, product_id, {"current_stock": new_stock})
    
    def get_low_stock(self, tenant_id: int) -> List[Dict[str, Any]]:
        """Get products with low stock."""
        query = """
            SELECT * FROM products 
            WHERE tenant_id = ? AND is_active = TRUE 
            AND current_stock <= reorder_level AND reorder_level > 0
            ORDER BY (current_stock / NULLIF(reorder_level, 0)) ASC
        """
        conn = db_manager.get_connection()
        cursor = conn.execute(query, (tenant_id,))
        results = cursor.fetchall()
        if results:
            columns = [desc[0] for desc in cursor.description]
            return [dict(zip(columns, row)) for row in results]
        return []

