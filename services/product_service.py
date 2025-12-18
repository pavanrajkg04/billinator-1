"""Product service for business logic."""
from models.product_dao import ProductDAO
from database.connection import db_manager
from typing import Optional, List, Dict, Any
from services.audit_service import AuditService


class ProductService:
    """Service for product management."""
    
    def __init__(self):
        self.dao = ProductDAO()
    
    def create_product(self, tenant_id: int, user_id: int, product_data: Dict[str, Any]) -> Optional[int]:
        """Create a new product."""
        # Check if SKU already exists
        existing = self.dao.get_by_sku(tenant_id, product_data.get('sku', ''))
        if existing:
            raise ValueError(f"Product with SKU '{product_data.get('sku')}' already exists")
        
        # Get next ID manually (DuckDB auto-increment may not work as expected)
        max_id_result = db_manager.fetch_one("SELECT COALESCE(MAX(id), 0) FROM products")
        next_id = (max_id_result[0] if max_id_result else 0) + 1
        product_data['id'] = next_id
        
        product_id = self.dao.create(tenant_id, product_data)
        if product_id:
            AuditService.log_action(
                tenant_id, user_id, "CREATE_PRODUCT",
                entity_type="products", entity_id=product_id,
                details=f"Created product: {product_data.get('name')}"
            )
        return product_id
    
    def get_product(self, tenant_id: int, product_id: int) -> Optional[Dict[str, Any]]:
        """Get a product by ID."""
        return self.dao.get_by_id(tenant_id, product_id)
    
    def list_products(self, tenant_id: int, filters: Dict[str, Any] = None) -> List[Dict[str, Any]]:
        """List all products for a tenant."""
        return self.dao.get_all(tenant_id, filters, order_by="name ASC")
    
    def update_product(self, tenant_id: int, user_id: int, product_id: int, product_data: Dict[str, Any]) -> bool:
        """Update a product."""
        # If SKU is being changed, check for duplicates
        if 'sku' in product_data:
            existing = self.dao.get_by_sku(tenant_id, product_data['sku'])
            if existing and existing['id'] != product_id:
                raise ValueError(f"Product with SKU '{product_data['sku']}' already exists")
        
        try:
            # If category_id is being set, verify it exists (if not None and not 0)
            # category_id = 0 or None means no category
            if 'category_id' in product_data:
                category_id = product_data['category_id']
                # Convert 0 to None (no category)
                if category_id == 0 or category_id is None:
                    product_data['category_id'] = None
                elif category_id > 0:
                    # Verify category exists
                    category_check = db_manager.fetch_one(
                        "SELECT COUNT(*) FROM product_categories WHERE id = ? AND tenant_id = ?",
                        (category_id, tenant_id)
                    )
                    if not category_check or category_check[0] == 0:
                        raise ValueError(f"Category with ID {category_id} does not exist")
            
            result = self.dao.update(tenant_id, product_id, product_data)
            if result:
                db_manager.commit()
                AuditService.log_action(
                    tenant_id, user_id, "UPDATE_PRODUCT",
                    entity_type="products", entity_id=product_id,
                    details=f"Updated product"
                )
            return result
        except ValueError:
            # Re-raise ValueError (our custom error messages)
            raise
        except Exception as e:
            # Catch foreign key constraint errors and provide a user-friendly message
            error_msg = str(e)
            if "foreign key" in error_msg.lower() or "constraint" in error_msg.lower():
                # Check if it's a category issue or product reference issue
                if "category" in error_msg.lower():
                    raise ValueError("Cannot update product: invalid category ID. Please select a valid category or leave it empty.")
                else:
                    # This shouldn't happen for updates, but handle it anyway
                    raise ValueError("Cannot update product: product is referenced in invoices. Updates should still be allowed - please contact support if you see this error.")
            # Re-raise other exceptions with original message
            raise ValueError(f"Error updating product: {str(e)}")
    
    def delete_product(self, tenant_id: int, user_id: int, product_id: int) -> bool:
        """Delete a product permanently. Checks if product is referenced in invoices first."""
        try:
            # Check if product is used in purchase items
            purchase_check = db_manager.fetch_one(
                "SELECT COUNT(*) FROM purchase_items WHERE tenant_id = ? AND product_id = ?",
                (tenant_id, product_id)
            )
            if purchase_check and purchase_check[0] > 0:
                raise ValueError("Cannot delete product: it is used in purchase invoices")
            
            # Check if product is used in sales items
            sales_check = db_manager.fetch_one(
                "SELECT COUNT(*) FROM sales_items WHERE tenant_id = ? AND product_id = ?",
                (tenant_id, product_id)
            )
            if sales_check and sales_check[0] > 0:
                raise ValueError("Cannot delete product: it is used in sales invoices")
            
            # Check if product is used in stock transactions
            stock_check = db_manager.fetch_one(
                "SELECT COUNT(*) FROM stock_transactions WHERE tenant_id = ? AND product_id = ?",
                (tenant_id, product_id)
            )
            if stock_check and stock_check[0] > 0:
                raise ValueError("Cannot delete product: it has stock transaction history")
            
            # If no references, delete the product
            result = self.dao.delete(tenant_id, product_id)
            if result:
                db_manager.commit()
                AuditService.log_action(
                    tenant_id, user_id, "DELETE_PRODUCT",
                    entity_type="products", entity_id=product_id,
                    details="Deleted product"
                )
            return result
        except ValueError:
            # Re-raise ValueError (our custom error messages)
            raise
        except Exception as e:
            # Catch foreign key constraint errors and provide a user-friendly message
            error_msg = str(e)
            if "foreign key" in error_msg.lower() or "constraint" in error_msg.lower():
                raise ValueError("Cannot delete product: it is still referenced in invoices or stock transactions. Please delete related invoices first.")
            # Re-raise other exceptions
            raise
    
    def update_stock(self, tenant_id: int, product_id: int, quantity: float, operation: str = "add") -> bool:
        """Update product stock."""
        return self.dao.update_stock(tenant_id, product_id, quantity, operation)
    
    def get_low_stock_products(self, tenant_id: int) -> List[Dict[str, Any]]:
        """Get products with low stock."""
        return self.dao.get_low_stock(tenant_id)

