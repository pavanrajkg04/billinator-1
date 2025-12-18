"""Pytest configuration and fixtures."""
import pytest
import sys
from pathlib import Path
import tempfile
import os

# Add project root to path
project_root = Path(__file__).parent.parent
sys.path.insert(0, str(project_root))

from database.connection import db_manager
from database.schema import init_schema
from services.auth_service import AuthService
import config

@pytest.fixture(scope="session")
def test_database():
    """Create a temporary test database."""
    # Create a temporary DuckDB database path.
    # Important: DuckDB can error if the file exists but is empty/invalid, so we
    # generate a path and ensure DuckDB initializes it.
    temp_dir = tempfile.TemporaryDirectory()
    temp_db_path = str(Path(temp_dir.name) / "test.db")
    
    # Override database path
    original_path = config.DATABASE_PATH
    original_db_manager_path = db_manager.db_path
    config.DATABASE_PATH = temp_db_path
    db_manager.db_path = temp_db_path
    # Ensure we reconnect to the new database file
    db_manager.close_connection()
    # Initialize the DuckDB file
    import duckdb
    duckdb.connect(temp_db_path).close()
    
    # Initialize schema
    init_schema()
    
    yield temp_db_path
    
    # Cleanup
    db_manager.close_connection()
    temp_dir.cleanup()
    config.DATABASE_PATH = original_path
    db_manager.db_path = original_db_manager_path

@pytest.fixture(scope="session")
def test_tenant(test_database):
    """Create a test tenant."""
    tenant_data = {
        "name": "Test Business",
        "gstin": "29ABCDE1234F1Z5",
        "address": "123 Test St",
        "city": "Test City",
        "state": "Karnataka",
        "pincode": "560001",
        "phone": "9876543210",
        "email": "test@example.com",
    }
    tenant_id = AuthService.register_tenant(tenant_data)
    return tenant_id

@pytest.fixture(scope="session")
def test_user(test_tenant):
    """Create a test user."""
    user_data = {
        "username": "testuser",
        "email": "testuser@example.com",
        "password": "testpass123",
        "full_name": "Test User",
        "role": "ADMIN"
    }
    user_id = AuthService.create_user(test_tenant, user_data)
    return {
        "tenant_id": test_tenant,
        "user_id": user_id,
        "username": "testuser",
        "password": "testpass123"
    }

@pytest.fixture(scope="session")
def auth_token(test_user):
    """Get authentication token for test user."""
    user = AuthService.authenticate_user(
        test_user["username"],
        test_user["password"],
        test_user["tenant_id"]
    )
    token_data = {
        "user_id": user['id'],
        "tenant_id": user['tenant_id'],
        "username": user['username'],
        "role": user['role']
    }
    return AuthService.create_access_token(token_data)

