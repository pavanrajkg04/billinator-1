"""Tests for authentication service."""
import pytest
from services.auth_service import AuthService
from services.audit_service import AuditService

def test_hash_password():
    """Test password hashing."""
    password = "testpassword123"
    hashed = AuthService.hash_password(password)
    
    assert hashed != password
    assert len(hashed) > 0
    assert hashed.startswith("$2b$")

def test_verify_password():
    """Test password verification."""
    password = "testpassword123"
    hashed = AuthService.hash_password(password)
    
    assert AuthService.verify_password(password, hashed) == True
    assert AuthService.verify_password("wrongpassword", hashed) == False

def test_create_access_token():
    """Test JWT token creation."""
    data = {
        "user_id": 1,
        "tenant_id": 1,
        "username": "testuser",
        "role": "ADMIN"
    }
    token = AuthService.create_access_token(data)
    
    assert token is not None
    assert len(token) > 0

def test_verify_token():
    """Test JWT token verification."""
    data = {
        "user_id": 1,
        "tenant_id": 1,
        "username": "testuser",
        "role": "ADMIN"
    }
    token = AuthService.create_access_token(data)
    payload = AuthService.verify_token(token)
    
    assert payload is not None
    assert payload["user_id"] == 1
    assert payload["tenant_id"] == 1
    assert payload["username"] == "testuser"

def test_register_tenant(test_database):
    """Test tenant registration."""
    tenant_data = {
        "name": "New Business",
        # Use a different GSTIN than the shared test tenant fixture to avoid UNIQUE collisions.
        "gstin": "27ABCDE1234F1Z5",
        "address": "123 Main St",
        "city": "Bangalore",
        "state": "Karnataka",
        "pincode": "560001",
        "phone": "9876543210",
        "email": "business@example.com",
    }
    tenant_id = AuthService.register_tenant(tenant_data)
    
    assert tenant_id is not None
    assert tenant_id > 0

def test_create_user(test_tenant):
    """Test user creation."""
    user_data = {
        "username": "newuser",
        "email": "newuser@example.com",
        "password": "password123",
        "full_name": "New User",
        "role": "BILLING"
    }
    user_id = AuthService.create_user(test_tenant, user_data)
    
    assert user_id is not None
    assert user_id > 0

def test_authenticate_user(test_user):
    """Test user authentication."""
    user = AuthService.authenticate_user(
        test_user["username"],
        test_user["password"],
        test_user["tenant_id"]
    )
    
    assert user is not None
    assert user["username"] == test_user["username"]
    assert user["tenant_id"] == test_user["tenant_id"]
    assert "password_hash" not in user

def test_authenticate_user_wrong_password(test_user):
    """Test authentication with wrong password."""
    user = AuthService.authenticate_user(
        test_user["username"],
        "wrongpassword",
        test_user["tenant_id"]
    )
    
    assert user is None

def test_authenticate_user_wrong_username(test_user):
    """Test authentication with wrong username."""
    user = AuthService.authenticate_user(
        "wrongusername",
        test_user["password"],
        test_user["tenant_id"]
    )
    
    assert user is None

