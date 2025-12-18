"""Base model classes for tenant-aware data access."""
from typing import Optional, List, Dict, Any
from database.connection import db_manager
from datetime import datetime


class BaseDAO:
    """Base Data Access Object with tenant isolation."""
    
    def __init__(self, table_name: str):
        self.table_name = table_name
    
    def _add_tenant_filter(self, query: str, tenant_id: int) -> str:
        """Add tenant_id filter to WHERE clause."""
        if "WHERE" in query.upper():
            return f"{query} AND tenant_id = ?"
        return f"{query} WHERE tenant_id = ?"
    
    def create(self, tenant_id: int, data: Dict[str, Any]) -> int:
        """Create a new record with tenant_id."""
        data['tenant_id'] = tenant_id
        data['created_at'] = datetime.utcnow()
        if 'updated_at' not in data:
            data['updated_at'] = datetime.utcnow()
        
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
    
    def get_by_id(self, tenant_id: int, record_id: int) -> Optional[Dict[str, Any]]:
        """Get a record by ID with tenant check."""
        query = f"SELECT * FROM {self.table_name} WHERE id = ? AND tenant_id = ?"
        result = db_manager.fetch_one(query, (record_id, tenant_id))
        if result:
            # Get column names from the query result
            conn = db_manager.get_connection()
            cursor = conn.execute(query, (record_id, tenant_id))
            columns = [desc[0] for desc in cursor.description]
            return dict(zip(columns, result))
        return None
    
    def get_all(self, tenant_id: int, filters: Dict[str, Any] = None, 
                order_by: str = "id DESC", limit: int = None) -> List[Dict[str, Any]]:
        """Get all records for a tenant with optional filters."""
        query = f"SELECT * FROM {self.table_name} WHERE tenant_id = ?"
        params = [tenant_id]
        
        if filters:
            for key, value in filters.items():
                query += f" AND {key} = ?"
                params.append(value)
        
        query += f" ORDER BY {order_by}"
        
        if limit:
            query += f" LIMIT ?"
            params.append(limit)
        
        results = db_manager.fetch_all(query, tuple(params))
        if results:
            # Get column names from the query result
            conn = db_manager.get_connection()
            cursor = conn.execute(query, tuple(params))
            columns = [desc[0] for desc in cursor.description]
            return [dict(zip(columns, row)) for row in results]
        return []
    
    def update(self, tenant_id: int, record_id: int, data: Dict[str, Any]) -> bool:
        """Update a record with tenant check."""
        # Don't update updated_at if it's not in the table schema
        # Only add updated_at if the table has this column
        if 'updated_at' not in data:
            data['updated_at'] = datetime.utcnow()
        
        # Keep all values including None (for setting fields to NULL in database)
        # Only exclude id and tenant_id from the update
        filtered_data = {k: v for k, v in data.items() if k != 'id' and k != 'tenant_id'}
        
        if not filtered_data:
            return False
        
        set_clause = ', '.join([f"{key} = ?" for key in filtered_data.keys()])
        values = list(filtered_data.values())
        values.extend([record_id, tenant_id])
        
        query = f"UPDATE {self.table_name} SET {set_clause} WHERE id = ? AND tenant_id = ?"
        db_manager.execute(query, tuple(values))
        db_manager.commit()
        return True
    
    def delete(self, tenant_id: int, record_id: int) -> bool:
        """Delete a record with tenant check."""
        query = f"DELETE FROM {self.table_name} WHERE id = ? AND tenant_id = ?"
        db_manager.execute(query, (record_id, tenant_id))
        db_manager.commit()
        return True
    
    def count(self, tenant_id: int, filters: Dict[str, Any] = None) -> int:
        """Count records for a tenant."""
        query = f"SELECT COUNT(*) FROM {self.table_name} WHERE tenant_id = ?"
        params = [tenant_id]
        
        if filters:
            for key, value in filters.items():
                query += f" AND {key} = ?"
                params.append(value)
        
        result = db_manager.fetch_one(query, tuple(params))
        return result[0] if result else 0

