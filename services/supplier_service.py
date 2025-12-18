"""Supplier service for business logic."""
from models.supplier_dao import SupplierDAO
from database.connection import db_manager
from typing import Optional, List, Dict, Any
from services.audit_service import AuditService


class SupplierService:
    """Service for supplier management."""
    
    def __init__(self):
        self.dao = SupplierDAO()
    
    def create_supplier(self, tenant_id: int, user_id: int, supplier_data: Dict[str, Any]) -> Optional[int]:
        """Create a new supplier."""
        # Get next ID manually (DuckDB auto-increment may not work as expected)
        max_id_result = db_manager.fetch_one("SELECT COALESCE(MAX(id), 0) FROM suppliers")
        next_id = (max_id_result[0] if max_id_result else 0) + 1
        supplier_data['id'] = next_id
        
        supplier_id = self.dao.create(tenant_id, supplier_data)
        if supplier_id:
            AuditService.log_action(
                tenant_id, user_id, "CREATE_SUPPLIER",
                entity_type="suppliers", entity_id=supplier_id,
                details=f"Created supplier: {supplier_data.get('name')}"
            )
        return supplier_id
    
    def get_supplier(self, tenant_id: int, supplier_id: int) -> Optional[Dict[str, Any]]:
        """Get a supplier by ID."""
        return self.dao.get_by_id(tenant_id, supplier_id)
    
    def list_suppliers(self, tenant_id: int, filters: Dict[str, Any] = None) -> List[Dict[str, Any]]:
        """List all suppliers for a tenant."""
        return self.dao.get_all(tenant_id, filters, order_by="name ASC")
    
    def update_supplier(self, tenant_id: int, user_id: int, supplier_id: int, supplier_data: Dict[str, Any]) -> bool:
        """Update a supplier."""
        result = self.dao.update(tenant_id, supplier_id, supplier_data)
        if result:
            AuditService.log_action(
                tenant_id, user_id, "UPDATE_SUPPLIER",
                entity_type="suppliers", entity_id=supplier_id,
                details="Updated supplier"
            )
        return result
    
    def delete_supplier(self, tenant_id: int, user_id: int, supplier_id: int) -> bool:
        """Delete a supplier permanently. Checks if supplier is referenced in invoices first."""
        # Check if supplier is used in purchase invoices
        purchase_check = db_manager.fetch_one(
            "SELECT COUNT(*) FROM purchase_invoices WHERE tenant_id = ? AND supplier_id = ?",
            (tenant_id, supplier_id)
        )
        if purchase_check and purchase_check[0] > 0:
            raise ValueError("Cannot delete supplier: it is used in purchase invoices")
        
        # Check if supplier is used in payments made
        payments_check = db_manager.fetch_one(
            "SELECT COUNT(*) FROM payments_made WHERE tenant_id = ? AND supplier_id = ?",
            (tenant_id, supplier_id)
        )
        if payments_check and payments_check[0] > 0:
            raise ValueError("Cannot delete supplier: it has payment records")
        
        # If no references, delete the supplier
        result = self.dao.delete(tenant_id, supplier_id)
        if result:
            AuditService.log_action(
                tenant_id, user_id, "DELETE_SUPPLIER",
                entity_type="suppliers", entity_id=supplier_id,
                details="Deleted supplier"
            )
        return result

