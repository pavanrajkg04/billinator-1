# Testing Guide

## Overview

Billinator uses pytest for testing. This guide covers running tests and writing new tests.

## 🧪 Running Tests

### Run All Tests

```bash
pytest
```

### Run with Coverage

```bash
pytest --cov
```

### Run Specific Test File

```bash
pytest tests/test_auth_service.py
```

### Run Specific Test

```bash
pytest tests/test_auth_service.py::test_hash_password
```

### Verbose Output

```bash
pytest -v
```

## 📁 Test Structure

```
tests/
├── conftest.py              # Pytest configuration and fixtures
├── test_auth_service.py     # Authentication service tests
├── test_product_service.py  # Product service tests
├── test_api_auth.py         # API endpoint tests
└── ...
```

## 🔧 Test Fixtures

Common fixtures available in `conftest.py`:

- `test_database` - Temporary test database
- `test_tenant` - Test tenant created in database
- `test_user` - Test user with credentials
- `auth_token` - JWT token for authenticated requests

## ✍️ Writing Tests

### Service Tests

Example service test:

```python
def test_create_product(test_user):
    """Test product creation."""
    service = ProductService()
    product_data = {
        "sku": "TEST001",
        "name": "Test Product",
        "unit": "PCS",
        "sale_price": 100.00
    }
    
    product_id = service.create_product(
        test_user["tenant_id"],
        test_user["user_id"],
        product_data
    )
    
    assert product_id is not None
    assert product_id > 0
```

### API Tests

Example API endpoint test:

```python
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
```

## 🎯 Test Categories

### Unit Tests

Test individual functions/methods in isolation:

```python
def test_hash_password():
    """Test password hashing."""
    password = "testpassword123"
    hashed = AuthService.hash_password(password)
    assert hashed != password
```

### Integration Tests

Test interactions between components:

```python
def test_create_and_get_product(test_user):
    """Test creating and retrieving a product."""
    # Create product
    product_id = service.create_product(...)
    # Retrieve product
    product = service.get_product(...)
    assert product is not None
```

### API Tests

Test HTTP endpoints:

```python
def test_get_products_endpoint(auth_token):
    """Test GET /api/products endpoint."""
    response = client.get(
        "/api/products",
        headers={"Authorization": f"Bearer {auth_token}"}
    )
    assert response.status_code == 200
```

## 📊 Coverage Goals

- **Minimum:** 70% overall coverage
- **Critical paths:** 90%+ (auth, payments, invoices)
- **Services:** 80%+
- **API routes:** 75%+

## ✅ Test Best Practices

1. **Test Names:** Use descriptive names that explain what is tested
2. **Arrange-Act-Assert:** Structure tests clearly
3. **One Assertion:** Focus each test on one behavior
4. **Isolation:** Tests should not depend on each other
5. **Cleanup:** Use fixtures for setup/teardown
6. **Edge Cases:** Test boundary conditions and errors
7. **Mocking:** Mock external dependencies when appropriate

## 🚫 What to Test

**Do Test:**
- Business logic
- API endpoints
- Data validation
- Error handling
- Security (auth, authorization)

**Don't Test:**
- Framework code
- Third-party libraries
- Database internals
- Simple getters/setters

## 🔍 Debugging Tests

### Run with Print Statements

```python
def test_something():
    result = some_function()
    print(f"Result: {result}")  # Will show in pytest output with -s
    assert result == expected
```

Run with:
```bash
pytest -s
```

### Use PDB Debugger

```python
def test_something():
    result = some_function()
    import pdb; pdb.set_trace()  # Drop into debugger
    assert result == expected
```

## 📈 Continuous Integration

Tests should run automatically in CI/CD:

```yaml
# Example GitHub Actions
- name: Run tests
  run: |
    pip install -r requirements.txt
    pytest --cov --cov-report=xml
```

## 🎓 Learning Resources

- [pytest documentation](https://docs.pytest.org/)
- [FastAPI testing](https://fastapi.tiangolo.com/tutorial/testing/)
- [Test-driven development](https://en.wikipedia.org/wiki/Test-driven_development)

