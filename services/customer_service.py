"""Customer service for business logic."""
from models.customer_dao import CustomerDAO
from database.connection import db_manager
from typing import Optional, List, Dict, Any
from services.audit_service import AuditService


class CustomerService:
    """Service for customer management."""
    
    def __init__(self):
        self.dao = CustomerDAO()
    
    def create_customer(self, tenant_id: int, user_id: int, customer_data: Dict[str, Any]) -> Optional[int]:
        """Create a new customer."""
        # Get next ID manually (DuckDB auto-increment may not work as expected)
        max_id_result = db_manager.fetch_one("SELECT COALESCE(MAX(id), 0) FROM customers")
        next_id = (max_id_result[0] if max_id_result else 0) + 1
        customer_data['id'] = next_id
        
        customer_id = self.dao.create(tenant_id, customer_data)
        if customer_id:
            AuditService.log_action(
                tenant_id, user_id, "CREATE_CUSTOMER",
                entity_type="customers", entity_id=customer_id,
                details=f"Created customer: {customer_data.get('name')}"
            )
        return customer_id
    
    def get_customer(self, tenant_id: int, customer_id: int) -> Optional[Dict[str, Any]]:
        """Get a customer by ID."""
        return self.dao.get_by_id(tenant_id, customer_id)
    
    def list_customers(self, tenant_id: int, filters: Dict[str, Any] = None) -> List[Dict[str, Any]]:
        """List all customers for a tenant."""
        return self.dao.get_all(tenant_id, filters, order_by="name ASC")
    
    def update_customer(self, tenant_id: int, user_id: int, customer_id: int, customer_data: Dict[str, Any]) -> bool:
        """Update a customer."""
        result = self.dao.update(tenant_id, customer_id, customer_data)
        if result:
            AuditService.log_action(
                tenant_id, user_id, "UPDATE_CUSTOMER",
                entity_type="customers", entity_id=customer_id,
                details="Updated customer"
            )
        return result
    
    def delete_customer(self, tenant_id: int, user_id: int, customer_id: int) -> bool:
        """Delete a customer permanently. Checks if customer is referenced in invoices first."""
        # Check if customer is used in sales invoices
        sales_check = db_manager.fetch_one(
            "SELECT COUNT(*) FROM sales_invoices WHERE tenant_id = ? AND customer_id = ?",
            (tenant_id, customer_id)
        )
        if sales_check and sales_check[0] > 0:
            raise ValueError("Cannot delete customer: it is used in sales invoices")
        
        # Check if customer is used in payments received
        payments_check = db_manager.fetch_one(
            "SELECT COUNT(*) FROM payments_received WHERE tenant_id = ? AND customer_id = ?",
            (tenant_id, customer_id)
        )
        if payments_check and payments_check[0] > 0:
            raise ValueError("Cannot delete customer: it has payment records")
        
        # If no references, delete the customer
        result = self.dao.delete(tenant_id, customer_id)
        if result:
            AuditService.log_action(
                tenant_id, user_id, "DELETE_CUSTOMER",
                entity_type="customers", entity_id=customer_id,
                details="Deleted customer"
            )
        return result

