"""Tests for authentication API endpoints."""
import pytest
from fastapi.testclient import TestClient
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))
from backend.main import app

client = TestClient(app)

def test_register_endpoint(test_database):
    """Test user registration endpoint."""
    response = client.post("/api/auth/register", json={
        "tenant_name": "API Test Business",
        "tenant_address": "123 Test St",
        "tenant_city": "Test City",
        "tenant_state": "Karnataka",
        "tenant_pincode": "560001",
        "tenant_phone": "9876543210",
        "tenant_email": "apitest@example.com",
        "username": "apitest",
        "password": "testpass123",
        "full_name": "API Test User"
    })
    
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert "user" in data

def test_register_without_gstin_twice_ok(test_database):
    """Registering multiple tenants without a GSTIN should not fail (gstin is UNIQUE but nullable)."""
    payload1 = {
        "tenant_name": "No GSTIN Business 1",
        "tenant_gstin": "",
        "tenant_address": "123 Test St",
        "tenant_city": "Test City",
        "tenant_state": "Karnataka",
        "tenant_pincode": "560001",
        "tenant_phone": "9876543210",
        "tenant_email": "nogstin1@example.com",
        "username": "nogstin1",
        "password": "testpass123",
        "full_name": "No GSTIN User 1"
    }
    payload2 = {
        "tenant_name": "No GSTIN Business 2",
        "tenant_gstin": "   ",
        "tenant_address": "456 Test St",
        "tenant_city": "Test City",
        "tenant_state": "Karnataka",
        "tenant_pincode": "560002",
        "tenant_phone": "9876543211",
        "tenant_email": "nogstin2@example.com",
        "username": "nogstin2",
        "password": "testpass123",
        "full_name": "No GSTIN User 2"
    }

    r1 = client.post("/api/auth/register", json=payload1)
    assert r1.status_code == 200, r1.text

    r2 = client.post("/api/auth/register", json=payload2)
    assert r2.status_code == 200, r2.text

def test_login_endpoint(test_user):
    """Test login endpoint."""
    response = client.post("/api/auth/login", json={
        "username": test_user["username"],
        "password": test_user["password"],
        "tenant_id": test_user["tenant_id"]
    })
    
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert "user" in data

def test_login_invalid_credentials(test_user):
    """Test login with invalid credentials."""
    response = client.post("/api/auth/login", json={
        "username": test_user["username"],
        "password": "wrongpassword",
        "tenant_id": test_user["tenant_id"]
    })
    
    assert response.status_code == 401

def test_me_endpoint(auth_token):
    """Test /me endpoint."""
    response = client.get(
        "/api/auth/me",
        headers={"Authorization": f"Bearer {auth_token}"}
    )
    
    assert response.status_code == 200
    data = response.json()
    assert "username" in data
    assert "tenant_id" in data

def test_me_endpoint_no_token():
    """Test /me endpoint without token."""
    response = client.get("/api/auth/me")
    
    assert response.status_code == 403

