"""DuckDB connection manager with persistent storage."""
import duckdb
import threading
from pathlib import Path
from typing import Optional
import config

# Thread-local storage for database connections
_local = threading.local()


class DatabaseManager:
    """Manages DuckDB connections with thread safety."""
    
    def __init__(self, db_path: str = None):
        self.db_path = db_path or config.DATABASE_PATH
        self._lock = threading.Lock()
        self._ensure_db_exists()
    
    def _ensure_db_exists(self):
        """Ensure database file and directory exist."""
        db_file = Path(self.db_path)
        db_file.parent.mkdir(parents=True, exist_ok=True)
        # Initialize connection to create database if it doesn't exist
        conn = duckdb.connect(self.db_path)
        conn.close()
    
    def get_connection(self) -> duckdb.DuckDBPyConnection:
        """Get thread-local database connection."""
        if not hasattr(_local, 'connection') or _local.connection is None:
            _local.connection = duckdb.connect(self.db_path)
            # Enable foreign keys and set timezone
            _local.connection.execute("SET timezone='UTC'")
        return _local.connection
    
    def close_connection(self):
        """Close thread-local connection."""
        if hasattr(_local, 'connection') and _local.connection is not None:
            _local.connection.close()
            _local.connection = None
    
    def execute(self, query: str, params: tuple = None) -> duckdb.DuckDBPyConnection:
        """Execute a query with optional parameters."""
        conn = self.get_connection()
        if params:
            return conn.execute(query, params)
        return conn.execute(query)
    
    def fetch_one(self, query: str, params: tuple = None) -> Optional[tuple]:
        """Fetch one row."""
        conn = self.get_connection()
        if params:
            result = conn.execute(query, params).fetchone()
        else:
            result = conn.execute(query).fetchone()
        return result
    
    def fetch_all(self, query: str, params: tuple = None) -> list:
        """Fetch all rows."""
        conn = self.get_connection()
        if params:
            result = conn.execute(query, params).fetchall()
        else:
            result = conn.execute(query).fetchall()
        return result
    
    def commit(self):
        """Commit transaction."""
        conn = self.get_connection()
        conn.commit()
    
    def begin_transaction(self):
        """Begin a transaction."""
        conn = self.get_connection()
        conn.begin()
    
    def rollback(self):
        """Rollback transaction."""
        conn = self.get_connection()
        conn.rollback()


# Global database manager instance
db_manager = DatabaseManager()

