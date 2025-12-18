# Migration from Reflex to Next.js + FastAPI

This document describes the migration from Reflex (full-stack Python) to Next.js (frontend) + FastAPI (backend).

## Architecture Changes

### Before (Reflex)
- Single Python application with Reflex framework
- Frontend and backend combined
- State management in Python
- Pages defined in Python

### After (Next.js + FastAPI)
- **Frontend**: Next.js 14 with TypeScript and Tailwind CSS
- **Backend**: FastAPI REST API
- **Communication**: HTTP REST API with JWT authentication
- **State**: React state management + API calls

## Project Structure

```
billinator/
├── backend/              # FastAPI backend
│   ├── main.py          # FastAPI app entry point
│   ├── api/             # API routes
│   │   ├── routes/      # Route handlers
│   │   └── dependencies.py  # Auth dependencies
│   └── requirements.txt
├── frontend/            # Next.js frontend
│   ├── app/            # Next.js app directory
│   │   ├── page.tsx    # Landing page
│   │   ├── login/      # Login page
│   │   ├── register/   # Register page
│   │   └── dashboard/  # Dashboard page
│   ├── lib/            # Utilities
│   │   └── api.ts      # API client
│   └── package.json
├── services/           # Business logic (shared)
├── models/             # Data access (shared)
├── database/           # Database (shared)
└── docker-compose.yml # Multi-service setup
```

## Running the Application

### Development

1. **Backend**:
   ```bash
   cd backend
   pip install -r requirements.txt
   uvicorn main:app --reload --port 8000
   ```

2. **Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. Access:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Docs: http://localhost:8000/docs

### Production (Docker)

```bash
docker-compose up -d
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products/` - List products
- `GET /api/products/{id}` - Get product
- `POST /api/products/` - Create product
- `PUT /api/products/{id}` - Update product
- `DELETE /api/products/{id}` - Delete product

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

## Authentication Flow

1. User logs in via `/api/auth/login`
2. Backend returns JWT token
3. Frontend stores token in cookie
4. Frontend includes token in `Authorization: Bearer <token>` header
5. Backend validates token on each request

## Environment Variables

### Backend
- `DATABASE_PATH` - Path to DuckDB database
- `JWT_SECRET_KEY` - Secret for JWT tokens
- `JWT_ALGORITHM` - JWT algorithm (default: HS256)
- `JWT_EXPIRATION_HOURS` - Token expiration (default: 24)

### Frontend
- `NEXT_PUBLIC_API_URL` - Backend API URL (default: http://localhost:8000)

## Migration Status

- ✅ Backend API structure
- ✅ Authentication endpoints
- ✅ Products API endpoints
- ✅ Dashboard API endpoint
- ✅ Landing page (Next.js)
- ✅ Login page (Next.js)
- ✅ Register page (Next.js)
- ✅ Dashboard page (Next.js)
- ✅ Docker setup
- ⏳ Remaining pages (customers, suppliers, purchases, sales, etc.)
- ⏳ Complete API routes for all services

## Next Steps

1. Complete remaining API routes
2. Migrate remaining pages to Next.js
3. Add proper error handling
4. Add loading states
5. Add form validation
6. Add unit tests

