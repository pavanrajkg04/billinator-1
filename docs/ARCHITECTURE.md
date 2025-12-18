# Architecture Overview

## System Architecture

Billinator follows a modern microservices-inspired architecture with clear separation between frontend and backend.

```
┌─────────────────┐
│   Next.js       │
│   Frontend      │
│   (Port 3000)   │
└────────┬────────┘
         │ HTTP/REST
         │
┌────────▼────────┐
│   FastAPI       │
│   Backend       │
│   (Port 8000)   │
└────────┬────────┘
         │
┌────────▼────────┐
│   DuckDB        │
│   Database      │
│   (File-based)  │
└─────────────────┘
```

## Technology Stack

### Frontend
- **Framework:** Next.js 14+ (React)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** React Hooks + Context
- **HTTP Client:** Axios
- **Authentication:** JWT tokens (cookies)

### Backend
- **Framework:** FastAPI
- **Language:** Python 3.10+
- **Database:** DuckDB
- **Authentication:** JWT (python-jose)
- **Password Hashing:** bcrypt
- **Validation:** Pydantic

### Infrastructure
- **Containerization:** Docker + Docker Compose
- **Web Server:** Uvicorn (ASGI)
- **Reverse Proxy:** Nginx (production)

## Component Architecture

### Backend Layers

```
┌─────────────────────────────────┐
│      API Routes Layer            │
│  (FastAPI endpoints)             │
└──────────────┬──────────────────┘
               │
┌──────────────▼──────────────────┐
│      Service Layer               │
│  (Business Logic)                │
└──────────────┬──────────────────┘
               │
┌──────────────▼──────────────────┐
│      DAO Layer                   │
│  (Data Access Objects)           │
└──────────────┬──────────────────┘
               │
┌──────────────▼──────────────────┐
│      Database Layer              │
│  (DuckDB Connection)             │
└─────────────────────────────────┘
```

### Multi-Tenancy

- **Tenant Isolation:** Every table has `tenant_id` column
- **Automatic Filtering:** All queries filter by `tenant_id`
- **User Context:** Tenant ID derived from authenticated user
- **Data Separation:** Complete logical separation

## Data Flow

### Request Flow

1. **Client Request** → Frontend (Next.js)
2. **API Call** → Backend (FastAPI)
3. **Authentication** → JWT verification
4. **Authorization** → Role/tenant check
5. **Business Logic** → Service layer
6. **Data Access** → DAO layer
7. **Database** → DuckDB query
8. **Response** → JSON back to frontend

### Authentication Flow

1. User submits credentials
2. Backend validates credentials
3. Backend generates JWT token
4. Token stored in HTTP-only cookie (frontend)
5. Token included in subsequent requests
6. Backend validates token on each request
7. User context extracted from token

## Security Architecture

### Layers

1. **Network Layer:** HTTPS/TLS
2. **Application Layer:** 
   - JWT authentication
   - Rate limiting
   - Security headers
   - Input validation
3. **Data Layer:**
   - Parameterized queries
   - Tenant isolation
   - Audit logging

### Security Components

- **Authentication:** JWT tokens
- **Authorization:** Role-based access control
- **Rate Limiting:** Per-IP request limiting
- **Input Validation:** Pydantic schemas
- **Security Headers:** Multiple headers for protection
- **Audit Logging:** All critical actions logged

## Database Schema

### Core Tables

- `tenants` - Business/tenant information
- `users` - User accounts
- `products` - Product catalog
- `customers` - Customer master
- `suppliers` - Supplier master
- `sales_invoices` - Sales invoice headers
- `sales_items` - Sales invoice line items
- `purchase_invoices` - Purchase invoice headers
- `purchase_items` - Purchase invoice line items
- `stock_transactions` - Stock movements
- `payments_received` - Customer payments
- `payments_made` - Supplier payments

### CRM Tables

- `opportunities` - Sales opportunities
- `quotes` - Quotes/estimates
- `activities` - CRM activities
- `notes` - Customer notes
- `contacts` - Customer contacts

## Scalability Considerations

### Current Architecture

- **Single Instance:** Suitable for small-medium businesses
- **File-based Database:** DuckDB for simplicity
- **Stateless Backend:** Can scale horizontally

### Future Scaling

- **Database:** Migrate to PostgreSQL for larger scale
- **Caching:** Add Redis for session/cache
- **Load Balancing:** Multiple backend instances
- **CDN:** Static asset delivery
- **Queue System:** For async tasks

## Deployment Architecture

### Development

```
Developer Machine
├── Frontend (npm run dev)
└── Backend (uvicorn --reload)
```

### Production (Docker)

```
Docker Host
├── Backend Container
│   ├── FastAPI App
│   └── DuckDB Database
└── Frontend Container
    └── Next.js App
```

### Production (Cloud)

```
Load Balancer
├── Frontend Instances (Multiple)
└── Backend Instances (Multiple)
    └── Shared Database (PostgreSQL)
```

## Monitoring & Logging

### Logging

- **Structured Logging:** JSON format
- **Log Levels:** DEBUG, INFO, WARNING, ERROR
- **Log Files:** Rotated daily
- **Audit Trail:** All critical actions

### Monitoring

- **Health Checks:** `/health`, `/health/ready`, `/health/live`
- **Metrics:** Request counts, response times
- **Error Tracking:** Structured error logs

## Development Workflow

1. **Local Development:**
   - Frontend: `npm run dev`
   - Backend: `uvicorn main:app --reload`

2. **Testing:**
   - Unit tests: `pytest`
   - Integration tests: `pytest tests/`

3. **Deployment:**
   - Build: `docker-compose build`
   - Deploy: `docker-compose up -d`

## Best Practices

1. **Separation of Concerns:** Clear layer boundaries
2. **DRY Principle:** Reusable components
3. **Security First:** Security at every layer
4. **Error Handling:** Graceful error handling
5. **Logging:** Comprehensive logging
6. **Testing:** Test coverage for critical paths
7. **Documentation:** Keep docs updated

