"""Customer notes/communication service for CRM."""
from models.base import BaseDAO
from database.connection import db_manager
from typing import Optional, List, Dict, Any
from services.audit_service import AuditService


class NoteDAO(BaseDAO):
    """Data Access Object for customer notes."""
    
    def __init__(self):
        super().__init__("customer_notes")
    
    def get_by_customer(self, tenant_id: int, customer_id: int) -> List[Dict[str, Any]]:
        """Get all notes for a customer."""
        query = f"""
            SELECT n.*, u.username as created_by_name
            FROM {self.table_name} n
            LEFT JOIN users u ON n.created_by = u.id
            WHERE n.tenant_id = ? AND n.customer_id = ?
            ORDER BY n.created_at DESC
        """
        conn = db_manager.get_connection()
        cursor = conn.execute(query, (tenant_id, customer_id))
        results = cursor.fetchall()
        if results:
            columns = [desc[0] for desc in cursor.description]
            return [dict(zip(columns, row)) for row in results]
        return []


class NoteService:
    """Service for customer notes/communication management."""
    
    def __init__(self):
        self.dao = NoteDAO()
    
    def create_note(self, tenant_id: int, user_id: int, note_data: Dict[str, Any]) -> Optional[int]:
        """Create a new note."""
        max_id_result = db_manager.fetch_one("SELECT COALESCE(MAX(id), 0) FROM customer_notes")
        next_id = (max_id_result[0] if max_id_result else 0) + 1
        note_data['id'] = next_id
        note_data['created_by'] = user_id
        
        note_id = self.dao.create(tenant_id, note_data)
        if note_id:
            AuditService.log_action(
                tenant_id, user_id, "CREATE_NOTE",
                entity_type="customer_notes", entity_id=note_id,
                details=f"Created note for customer"
            )
        return note_id
    
    def get_note(self, tenant_id: int, note_id: int) -> Optional[Dict[str, Any]]:
        """Get a note by ID."""
        return self.dao.get_by_id(tenant_id, note_id)
    
    def list_notes(self, tenant_id: int, customer_id: int) -> List[Dict[str, Any]]:
        """List all notes for a customer."""
        return self.dao.get_by_customer(tenant_id, customer_id)
    
    def update_note(self, tenant_id: int, user_id: int, note_id: int, note_data: Dict[str, Any]) -> bool:
        """Update a note."""
        result = self.dao.update(tenant_id, note_id, note_data)
        if result:
            AuditService.log_action(
                tenant_id, user_id, "UPDATE_NOTE",
                entity_type="customer_notes", entity_id=note_id,
                details="Updated note"
            )
        return result
    
    def delete_note(self, tenant_id: int, user_id: int, note_id: int) -> bool:
        """Delete a note."""
        result = self.dao.delete(tenant_id, note_id)
        if result:
            AuditService.log_action(
                tenant_id, user_id, "DELETE_NOTE",
                entity_type="customer_notes", entity_id=note_id,
                details="Deleted note"
            )
        return result

