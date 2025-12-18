"""Opportunity/Deal service for CRM."""
from models.base import BaseDAO
from database.connection import db_manager
from typing import Optional, List, Dict, Any
from services.audit_service import AuditService


class OpportunityDAO(BaseDAO):
    """Data Access Object for opportunities."""
    
    def __init__(self):
        super().__init__("opportunities")
    
    def get_by_customer(self, tenant_id: int, customer_id: int) -> List[Dict[str, Any]]:
        """Get all opportunities for a customer."""
        query = f"SELECT * FROM {self.table_name} WHERE tenant_id = ? AND customer_id = ? ORDER BY created_at DESC"
        conn = db_manager.get_connection()
        cursor = conn.execute(query, (tenant_id, customer_id))
        results = cursor.fetchall()
        if results:
            columns = [desc[0] for desc in cursor.description]
            return [dict(zip(columns, row)) for row in results]
        return []
    
    def get_by_stage(self, tenant_id: int, stage: str) -> List[Dict[str, Any]]:
        """Get opportunities by stage."""
        query = f"SELECT * FROM {self.table_name} WHERE tenant_id = ? AND stage = ? ORDER BY created_at DESC"
        conn = db_manager.get_connection()
        cursor = conn.execute(query, (tenant_id, stage))
        results = cursor.fetchall()
        if results:
            columns = [desc[0] for desc in cursor.description]
            return [dict(zip(columns, row)) for row in results]
        return []


class OpportunityService:
    """Service for opportunity/deal management."""
    
    def __init__(self):
        self.dao = OpportunityDAO()
    
    def create_opportunity(self, tenant_id: int, user_id: int, opportunity_data: Dict[str, Any]) -> Optional[int]:
        """Create a new opportunity."""
        max_id_result = db_manager.fetch_one("SELECT COALESCE(MAX(id), 0) FROM opportunities")
        next_id = (max_id_result[0] if max_id_result else 0) + 1
        opportunity_data['id'] = next_id
        opportunity_data['created_by'] = user_id
        
        opportunity_id = self.dao.create(tenant_id, opportunity_data)
        if opportunity_id:
            AuditService.log_action(
                tenant_id, user_id, "CREATE_OPPORTUNITY",
                entity_type="opportunities", entity_id=opportunity_id,
                details=f"Created opportunity: {opportunity_data.get('title')}"
            )
        return opportunity_id
    
    def get_opportunity(self, tenant_id: int, opportunity_id: int) -> Optional[Dict[str, Any]]:
        """Get an opportunity by ID."""
        return self.dao.get_by_id(tenant_id, opportunity_id)
    
    def list_opportunities(self, tenant_id: int, filters: Dict[str, Any] = None) -> List[Dict[str, Any]]:
        """List all opportunities for a tenant."""
        query = f"SELECT * FROM {self.dao.table_name} WHERE tenant_id = ?"
        params = [tenant_id]
        
        if filters:
            if filters.get('stage'):
                query += " AND stage = ?"
                params.append(filters['stage'])
            if filters.get('status'):
                query += " AND status = ?"
                params.append(filters['status'])
            if filters.get('customer_id'):
                query += " AND customer_id = ?"
                params.append(filters['customer_id'])
            if filters.get('assigned_to'):
                query += " AND assigned_to = ?"
                params.append(filters['assigned_to'])
        
        query += " ORDER BY created_at DESC"
        
        conn = db_manager.get_connection()
        cursor = conn.execute(query, tuple(params))
        results = cursor.fetchall()
        if results:
            columns = [desc[0] for desc in cursor.description]
            return [dict(zip(columns, row)) for row in results]
        return []
    
    def update_opportunity(self, tenant_id: int, user_id: int, opportunity_id: int, opportunity_data: Dict[str, Any]) -> bool:
        """Update an opportunity."""
        result = self.dao.update(tenant_id, opportunity_id, opportunity_data)
        if result:
            AuditService.log_action(
                tenant_id, user_id, "UPDATE_OPPORTUNITY",
                entity_type="opportunities", entity_id=opportunity_id,
                details="Updated opportunity"
            )
        return result
    
    def delete_opportunity(self, tenant_id: int, user_id: int, opportunity_id: int) -> bool:
        """Delete an opportunity."""
        result = self.dao.delete(tenant_id, opportunity_id)
        if result:
            AuditService.log_action(
                tenant_id, user_id, "DELETE_OPPORTUNITY",
                entity_type="opportunities", entity_id=opportunity_id,
                details="Deleted opportunity"
            )
        return result
    
    def get_pipeline_stats(self, tenant_id: int) -> Dict[str, Any]:
        """Get pipeline statistics."""
        stages = ['LEAD', 'QUALIFIED', 'PROPOSAL', 'NEGOTIATION', 'WON', 'LOST']
        stats = {}
        
        for stage in stages:
            query = """
                SELECT COUNT(*) as count, COALESCE(SUM(value), 0) as total_value
                FROM opportunities
                WHERE tenant_id = ? AND stage = ? AND status = 'OPEN'
            """
            result = db_manager.fetch_one(query, (tenant_id, stage))
            stats[stage] = {
                'count': result[0] if result else 0,
                'value': float(result[1]) if result and result[1] else 0.0
            }
        
        # Overall stats
        total_query = """
            SELECT 
                COUNT(*) as total,
                COALESCE(SUM(value), 0) as total_value,
                COUNT(CASE WHEN status = 'WON' THEN 1 END) as won_count,
                COUNT(CASE WHEN status = 'LOST' THEN 1 END) as lost_count
            FROM opportunities
            WHERE tenant_id = ?
        """
        total_result = db_manager.fetch_one(total_query, (tenant_id,))
        stats['overall'] = {
            'total': total_result[0] if total_result else 0,
            'total_value': float(total_result[1]) if total_result and total_result[1] else 0.0,
            'won_count': total_result[2] if total_result else 0,
            'lost_count': total_result[3] if total_result else 0,
        }
        
        return stats

