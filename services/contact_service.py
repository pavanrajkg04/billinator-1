"""Customer contact service for CRM."""
from models.base import BaseDAO
from database.connection import db_manager
from typing import Optional, List, Dict, Any
from services.audit_service import AuditService


class ContactDAO(BaseDAO):
    """Data Access Object for customer contacts."""
    
    def __init__(self):
        super().__init__("customer_contacts")
    
    def get_by_customer(self, tenant_id: int, customer_id: int) -> List[Dict[str, Any]]:
        """Get all contacts for a customer."""
        query = f"SELECT * FROM {self.table_name} WHERE tenant_id = ? AND customer_id = ? ORDER BY is_primary DESC, created_at DESC"
        conn = db_manager.get_connection()
        cursor = conn.execute(query, (tenant_id, customer_id))
        results = cursor.fetchall()
        if results:
            columns = [desc[0] for desc in cursor.description]
            return [dict(zip(columns, row)) for row in results]
        return []


class ContactService:
    """Service for customer contact management."""
    
    def __init__(self):
        self.dao = ContactDAO()
    
    def create_contact(self, tenant_id: int, contact_data: Dict[str, Any]) -> Optional[int]:
        """Create a new contact."""
        # If this is set as primary, unset other primary contacts
        if contact_data.get('is_primary'):
            db_manager.execute(
                "UPDATE customer_contacts SET is_primary = FALSE WHERE tenant_id = ? AND customer_id = ?",
                (tenant_id, contact_data.get('customer_id'))
            )
            db_manager.commit()
        
        max_id_result = db_manager.fetch_one("SELECT COALESCE(MAX(id), 0) FROM customer_contacts")
        next_id = (max_id_result[0] if max_id_result else 0) + 1
        contact_data['id'] = next_id
        
        return self.dao.create(tenant_id, contact_data)
    
    def get_contact(self, tenant_id: int, contact_id: int) -> Optional[Dict[str, Any]]:
        """Get a contact by ID."""
        return self.dao.get_by_id(tenant_id, contact_id)
    
    def list_contacts(self, tenant_id: int, customer_id: int) -> List[Dict[str, Any]]:
        """List all contacts for a customer."""
        return self.dao.get_by_customer(tenant_id, customer_id)
    
    def update_contact(self, tenant_id: int, contact_id: int, contact_data: Dict[str, Any]) -> bool:
        """Update a contact."""
        # If setting as primary, unset other primary contacts
        if contact_data.get('is_primary'):
            contact = self.dao.get_by_id(tenant_id, contact_id)
            if contact:
                db_manager.execute(
                    "UPDATE customer_contacts SET is_primary = FALSE WHERE tenant_id = ? AND customer_id = ? AND id != ?",
                    (tenant_id, contact.get('customer_id'), contact_id)
                )
                db_manager.commit()
        
        return self.dao.update(tenant_id, contact_id, contact_data)
    
    def delete_contact(self, tenant_id: int, contact_id: int) -> bool:
        """Delete a contact."""
        return self.dao.delete(tenant_id, contact_id)

