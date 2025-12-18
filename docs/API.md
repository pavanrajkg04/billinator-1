# API Documentation

## Base URL

- **Development:** `http://localhost:8000`
- **Production:** `https://api.yourdomain.com`

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## Endpoints

### Authentication

#### POST `/api/auth/register`

Register a new tenant and admin user.

**Request:**
```json
{
  "tenant_name": "Business Name",
  "tenant_address": "123 Main St",
  "tenant_city": "City",
  "tenant_state": "State",
  "tenant_pincode": "560001",
  "tenant_phone": "9876543210",
  "tenant_email": "business@example.com",
  "username": "admin",
  "password": "password123",
  "full_name": "Admin User"
}
```

**Response:**
```json
{
  "message": "Registration successful",
  "access_token": "eyJ...",
  "token_type": "bearer",
  "user": { ... }
}
```

#### POST `/api/auth/login`

Authenticate user and get JWT token.

**Request:**
```json
{
  "username": "admin",
  "password": "password123",
  "tenant_id": 1
}
```

**Response:**
```json
{
  "access_token": "eyJ...",
  "token_type": "bearer",
  "user": { ... }
}
```

#### GET `/api/auth/me`

Get current authenticated user.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "id": 1,
  "tenant_id": 1,
  "username": "admin",
  "email": "admin@example.com",
  "full_name": "Admin User",
  "role": "ADMIN"
}
```

### Products

#### GET `/api/products/`

List all products.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "products": [
    {
      "id": 1,
      "sku": "PROD001",
      "name": "Product Name",
      "sale_price": 100.00,
      ...
    }
  ]
}
```

#### POST `/api/products/`

Create a new product.

**Request:**
```json
{
  "sku": "PROD001",
  "name": "Product Name",
  "unit": "PCS",
  "sale_price": 100.00,
  "tax_rate": 18.0
}
```

#### GET `/api/products/{id}`

Get product by ID.

#### PUT `/api/products/{id}`

Update product.

#### DELETE `/api/products/{id}`

Delete product.

### Customers

Similar endpoints: `/api/customers/`

### Suppliers

Similar endpoints: `/api/suppliers/`

### Sales Invoices

#### POST `/api/sales/`

Create sales invoice.

**Request:**
```json
{
  "customer_id": 1,
  "invoice_type": "B2B",
  "invoice_date": "2024-01-01",
  "items": [
    {
      "product_id": 1,
      "description": "Product Name",
      "quantity": 2,
      "unit_price": 100.00,
      "tax_rate": 18.0
    }
  ]
}
```

### Reports

#### POST `/api/reports/generate`

Generate a report.

**Request:**
```json
{
  "report_type": "sales",
  "start_date": "2024-01-01",
  "end_date": "2024-01-31"
}
```

**Report Types:**
- `sales` - Sales report
- `purchase` - Purchase report
- `gst` - GST report
- `stock` - Stock report
- `customer` - Customer report
- `profit_loss` - Profit & Loss

## Error Responses

### 400 Bad Request
```json
{
  "detail": "Validation error message"
}
```

### 401 Unauthorized
```json
{
  "detail": "Invalid or expired token"
}
```

### 403 Forbidden
```json
{
  "detail": "Not enough permissions"
}
```

### 404 Not Found
```json
{
  "detail": "Resource not found"
}
```

### 429 Too Many Requests
```json
{
  "detail": "Rate limit exceeded. Please try again later.",
  "retry_after": 60
}
```

### 500 Internal Server Error
```json
{
  "detail": "Internal server error"
}
```

## Rate Limiting

- Default: 60 requests per minute per IP
- Headers included:
  - `X-RateLimit-Limit`: Request limit
  - `X-RateLimit-Remaining`: Remaining requests

## Interactive Documentation

When `APP_ENV=development`, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

