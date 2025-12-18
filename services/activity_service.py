"""Activity/Task service for CRM."""
from models.base import BaseDAO
from database.connection import db_manager
from typing import Optional, List, Dict, Any
from services.audit_service import AuditService
from datetime import datetime


class ActivityDAO(BaseDAO):
    """Data Access Object for activities."""
    
    def __init__(self):
        super().__init__("activities")
    
    def get_by_customer(self, tenant_id: int, customer_id: int) -> List[Dict[str, Any]]:
        """Get all activities for a customer."""
        query = f"SELECT * FROM {self.table_name} WHERE tenant_id = ? AND customer_id = ? ORDER BY due_date DESC, created_at DESC"
        conn = db_manager.get_connection()
        cursor = conn.execute(query, (tenant_id, customer_id))
        results = cursor.fetchall()
        if results:
            columns = [desc[0] for desc in cursor.description]
            return [dict(zip(columns, row)) for row in results]
        return []
    
    def get_pending_tasks(self, tenant_id: int, user_id: int = None) -> List[Dict[str, Any]]:
        """Get pending tasks."""
        query = f"SELECT * FROM {self.table_name} WHERE tenant_id = ? AND status = 'PENDING'"
        params = [tenant_id]
        
        if user_id:
            query += " AND assigned_to = ?"
            params.append(user_id)
        
        query += " ORDER BY due_date ASC, priority DESC"
        
        conn = db_manager.get_connection()
        cursor = conn.execute(query, tuple(params))
        results = cursor.fetchall()
        if results:
            columns = [desc[0] for desc in cursor.description]
            return [dict(zip(columns, row)) for row in results]
        return []


class ActivityService:
    """Service for activity/task management."""
    
    def __init__(self):
        self.dao = ActivityDAO()
    
    def create_activity(self, tenant_id: int, user_id: int, activity_data: Dict[str, Any]) -> Optional[int]:
        """Create a new activity."""
        max_id_result = db_manager.fetch_one("SELECT COALESCE(MAX(id), 0) FROM activities")
        next_id = (max_id_result[0] if max_id_result else 0) + 1
        activity_data['id'] = next_id
        activity_data['created_by'] = user_id
        
        activity_id = self.dao.create(tenant_id, activity_data)
        if activity_id:
            AuditService.log_action(
                tenant_id, user_id, "CREATE_ACTIVITY",
                entity_type="activities", entity_id=activity_id,
                details=f"Created activity: {activity_data.get('subject')}"
            )
        return activity_id
    
    def get_activity(self, tenant_id: int, activity_id: int) -> Optional[Dict[str, Any]]:
        """Get an activity by ID."""
        return self.dao.get_by_id(tenant_id, activity_id)
    
    def list_activities(self, tenant_id: int, filters: Dict[str, Any] = None) -> List[Dict[str, Any]]:
        """List all activities for a tenant."""
        query = f"SELECT * FROM {self.dao.table_name} WHERE tenant_id = ?"
        params = [tenant_id]
        
        if filters:
            if filters.get('customer_id'):
                query += " AND customer_id = ?"
                params.append(filters['customer_id'])
            if filters.get('type'):
                query += " AND type = ?"
                params.append(filters['type'])
            if filters.get('status'):
                query += " AND status = ?"
                params.append(filters['status'])
            if filters.get('assigned_to'):
                query += " AND assigned_to = ?"
                params.append(filters['assigned_to'])
        
        query += " ORDER BY due_date ASC, created_at DESC"
        
        conn = db_manager.get_connection()
        cursor = conn.execute(query, tuple(params))
        results = cursor.fetchall()
        if results:
            columns = [desc[0] for desc in cursor.description]
            return [dict(zip(columns, row)) for row in results]
        return []
    
    def update_activity(self, tenant_id: int, user_id: int, activity_id: int, activity_data: Dict[str, Any]) -> bool:
        """Update an activity."""
        # If marking as completed, set completed_date
        if activity_data.get('status') == 'COMPLETED' and not activity_data.get('completed_date'):
            activity_data['completed_date'] = datetime.utcnow()
        
        result = self.dao.update(tenant_id, activity_id, activity_data)
        if result:
            AuditService.log_action(
                tenant_id, user_id, "UPDATE_ACTIVITY",
                entity_type="activities", entity_id=activity_id,
                details="Updated activity"
            )
        return result
    
    def delete_activity(self, tenant_id: int, user_id: int, activity_id: int) -> bool:
        """Delete an activity."""
        result = self.dao.delete(tenant_id, activity_id)
        if result:
            AuditService.log_action(
                tenant_id, user_id, "DELETE_ACTIVITY",
                entity_type="activities", entity_id=activity_id,
                details="Deleted activity"
            )
        return result
    
    def get_upcoming_tasks(self, tenant_id: int, days: int = 7) -> List[Dict[str, Any]]:
        """Get upcoming tasks within specified days."""
        query = """
            SELECT * FROM activities
            WHERE tenant_id = ? 
            AND status = 'PENDING'
            AND due_date IS NOT NULL
            AND due_date <= DATE('now', '+' || ? || ' days')
            ORDER BY due_date ASC, priority DESC
        """
        conn = db_manager.get_connection()
        cursor = conn.execute(query, (tenant_id, days))
        results = cursor.fetchall()
        if results:
            columns = [desc[0] for desc in cursor.description]
            return [dict(zip(columns, row)) for row in results]
        return []

