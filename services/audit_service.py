"""Audit logging service."""
from typing import Optional
from database.connection import db_manager
from datetime import datetime


class AuditService:
    """Service for logging audit trails."""
    
    @staticmethod
    def log_action(tenant_id: int, user_id: Optional[int], action: str,
                   entity_type: Optional[str] = None, entity_id: Optional[int] = None,
                   details: Optional[str] = None, ip_address: Optional[str] = None):
        """Log an audit action."""
        # Get next ID manually
        max_id_result = db_manager.fetch_one("SELECT COALESCE(MAX(id), 0) FROM audit_logs")
        next_id = (max_id_result[0] if max_id_result else 0) + 1
        
        query = """
            INSERT INTO audit_logs (id, tenant_id, user_id, action, entity_type, entity_id, details, ip_address)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """
        params = (next_id, tenant_id, user_id, action, entity_type, entity_id, details, ip_address)
        db_manager.execute(query, params)
        db_manager.commit()

