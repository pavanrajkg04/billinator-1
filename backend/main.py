"""FastAPI backend for Billinator."""
from fastapi import FastAPI, Depends, HTTPException, status, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from contextlib import asynccontextmanager
import sys
from pathlib import Path
import logging

# Add project root to path (for `config`, `database`, etc.)
sys.path.insert(0, str(Path(__file__).parent.parent))
# Add backend directory to path so `import api...` works no matter the CWD
sys.path.insert(0, str(Path(__file__).parent))
from database.schema import init_schema
import config
from backend.utils.logger import setup_logging
from backend.middleware.security import SecurityHeadersMiddleware, RateLimitMiddleware
from backend.middleware.request_logging import RequestLoggingMiddleware

# Setup logging
logger = setup_logging()

# Initialize database on startup
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    logger.info("Initializing Billinator API...")
    try:
        init_schema()
        logger.info("Database schema initialized successfully")
    except Exception as e:
        logger.error(f"Failed to initialize database schema: {e}", exc_info=True)
        raise
    
    logger.info("Billinator API started successfully")
    yield
    
    # Shutdown
    logger.info("Shutting down Billinator API...")

app = FastAPI(
    title="Billinator API",
    description="GST Billing & Inventory Management API - Free to Use Until 2027. Developed by Medhā Labs (https://medhalabs.in/)",
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/docs" if config.APP_ENV == "development" else None,
    redoc_url="/redoc" if config.APP_ENV == "development" else None,
)

# Security headers middleware (add first)
app.add_middleware(SecurityHeadersMiddleware)

# Rate limiting middleware
if config.RATE_LIMIT_ENABLED:
    app.add_middleware(RateLimitMiddleware, requests_per_minute=config.RATE_LIMIT_PER_MINUTE)
    logger.info(f"Rate limiting enabled: {config.RATE_LIMIT_PER_MINUTE} requests/minute")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=config.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization", "X-Requested-With"],
    expose_headers=["X-RateLimit-Limit", "X-RateLimit-Remaining"],
)

logger.info(f"CORS allowed origins: {config.CORS_ORIGINS}")

# Request logging middleware (add last so it wraps everything)
app.add_middleware(RequestLoggingMiddleware)

# Security
security = HTTPBearer()

# Import routers
from api.routes import auth, products, customers, suppliers, purchases, sales, stocks, dashboard, outstanding, reports, users, settings, roles
from api.routes import opportunities, quotes, activities, notes, contacts

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(products.router, prefix="/api/products", tags=["Products"])
app.include_router(customers.router, prefix="/api/customers", tags=["Customers"])
app.include_router(suppliers.router, prefix="/api/suppliers", tags=["Suppliers"])
app.include_router(purchases.router, prefix="/api/purchases", tags=["Purchases"])
app.include_router(sales.router, prefix="/api/sales", tags=["Sales"])
app.include_router(stocks.router, prefix="/api/stocks", tags=["Stocks"])
app.include_router(dashboard.router, prefix="/api/dashboard", tags=["Dashboard"])
app.include_router(outstanding.router, prefix="/api/outstanding", tags=["Outstanding"])
app.include_router(reports.router, prefix="/api/reports", tags=["Reports"])
app.include_router(users.router, prefix="/api/users", tags=["Users"])
app.include_router(roles.router, prefix="/api/roles", tags=["Roles"])
app.include_router(settings.router, prefix="/api/settings", tags=["Settings"])

# CRM routers
app.include_router(opportunities.router, prefix="/api/opportunities", tags=["Opportunities"])
app.include_router(quotes.router, prefix="/api/quotes", tags=["Quotes"])
app.include_router(activities.router, prefix="/api/activities", tags=["Activities"])
app.include_router(notes.router, prefix="/api/notes", tags=["Notes"])
app.include_router(contacts.router, prefix="/api/contacts", tags=["Contacts"])

@app.get("/")
async def root():
    return {"message": "Billinator API", "version": "1.0.0"}

@app.get("/health")
async def health():
    """Health check endpoint."""
    try:
        from database.connection import db_manager
        # Test database connection
        db_manager.fetch_one("SELECT 1")
        return {
            "status": "healthy",
            "database": "connected",
            "version": "1.0.0"
        }
    except Exception as e:
        logger.error(f"Health check failed: {e}")
        return {
            "status": "unhealthy",
            "database": "disconnected",
            "error": str(e)
        }

@app.get("/health/ready")
async def readiness():
    """Readiness probe for Kubernetes/Docker."""
    try:
        from database.connection import db_manager
        db_manager.fetch_one("SELECT 1")
        return {"status": "ready"}
    except Exception as e:
        logger.error(f"Readiness check failed: {e}")
        raise HTTPException(status_code=503, detail="Service not ready")

@app.get("/health/live")
async def liveness():
    """Liveness probe for Kubernetes/Docker."""
    return {"status": "alive"}

