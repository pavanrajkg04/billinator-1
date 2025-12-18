"""Tests for product service."""
import pytest
from services.product_service import ProductService
from services.audit_service import AuditService

def test_create_product(test_user):
    """Test product creation."""
    service = ProductService()
    product_data = {
        "sku": "TEST001",
        "name": "Test Product",
        "description": "A test product",
        "unit": "PCS",
        "sale_price": 100.00,
        "tax_rate": 18.0,
        "current_stock": 50.0,
        "reorder_level": 10.0
    }
    
    product_id = service.create_product(
        test_user["tenant_id"],
        test_user["user_id"],
        product_data
    )
    
    assert product_id is not None
    assert product_id > 0

def test_create_product_duplicate_sku(test_user):
    """Test product creation with duplicate SKU."""
    service = ProductService()
    product_data = {
        "sku": "DUPLICATE",
        "name": "Product 1",
        "unit": "PCS",
        "sale_price": 100.00
    }
    
    # Create first product
    service.create_product(test_user["tenant_id"], test_user["user_id"], product_data)
    
    # Try to create duplicate
    with pytest.raises(ValueError, match="already exists"):
        service.create_product(test_user["tenant_id"], test_user["user_id"], product_data)

def test_get_product(test_user):
    """Test getting a product."""
    service = ProductService()
    product_data = {
        "sku": "GET001",
        "name": "Get Product",
        "unit": "PCS",
        "sale_price": 150.00
    }
    
    product_id = service.create_product(
        test_user["tenant_id"],
        test_user["user_id"],
        product_data
    )
    
    product = service.get_product(test_user["tenant_id"], product_id)
    
    assert product is not None
    assert product["sku"] == "GET001"
    assert product["name"] == "Get Product"
    assert float(product["sale_price"]) == 150.00

def test_update_product(test_user):
    """Test product update."""
    service = ProductService()
    product_data = {
        "sku": "UPDATE001",
        "name": "Original Name",
        "unit": "PCS",
        "sale_price": 100.00
    }
    
    product_id = service.create_product(
        test_user["tenant_id"],
        test_user["user_id"],
        product_data
    )
    
    update_data = {
        "name": "Updated Name",
        "sale_price": 150.00
    }
    
    result = service.update_product(
        test_user["tenant_id"],
        test_user["user_id"],
        product_id,
        update_data
    )
    
    assert result == True
    
    product = service.get_product(test_user["tenant_id"], product_id)
    assert product["name"] == "Updated Name"
    assert float(product["sale_price"]) == 150.00

def test_list_products(test_user):
    """Test listing products."""
    service = ProductService()
    
    # Create multiple products
    for i in range(3):
        product_data = {
            "sku": f"LIST{i:03d}",
            "name": f"Product {i}",
            "unit": "PCS",
            "sale_price": 100.00 + i * 10
        }
        service.create_product(
            test_user["tenant_id"],
            test_user["user_id"],
            product_data
        )
    
    products = service.list_products(test_user["tenant_id"])
    
    assert len(products) >= 3

def test_delete_product(test_user):
    """Test product deletion."""
    service = ProductService()
    product_data = {
        "sku": "DELETE001",
        "name": "Delete Product",
        "unit": "PCS",
        "sale_price": 100.00
    }
    
    product_id = service.create_product(
        test_user["tenant_id"],
        test_user["user_id"],
        product_data
    )
    
    result = service.delete_product(
        test_user["tenant_id"],
        test_user["user_id"],
        product_id
    )
    
    assert result == True
    
    product = service.get_product(test_user["tenant_id"], product_id)
    assert product is None

