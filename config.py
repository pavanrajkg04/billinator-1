"""Configuration settings for Billinator application."""
import os
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Base directory
BASE_DIR = Path(__file__).parent

# Database configuration
DATABASE_PATH = os.getenv("DATABASE_PATH", str(BASE_DIR / "data" / "billinator.db"))
DATABASE_DIR = Path(DATABASE_PATH).parent
DATABASE_DIR.mkdir(parents=True, exist_ok=True)

# App Configuration (needed before JWT check)
APP_NAME = os.getenv("APP_NAME", "Billinator")
APP_ENV = os.getenv("APP_ENV", "development")

# JWT Configuration
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
# Only enforce in production
if APP_ENV == "production":
    if not JWT_SECRET_KEY or JWT_SECRET_KEY == "change-me-in-production-secret-key":
        raise ValueError(
            "JWT_SECRET_KEY must be set in environment variables for production. "
            "Generate a strong secret key using: openssl rand -hex 32"
        )
elif not JWT_SECRET_KEY:
    # Development default (not secure, but convenient)
    JWT_SECRET_KEY = "development-secret-key-change-in-production"
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
JWT_EXPIRATION_HOURS = int(os.getenv("JWT_EXPIRATION_HOURS", "24"))

# CORS Configuration
# Default to common local dev ports; override with CORS_ORIGINS env var in production.
_DEFAULT_CORS_ORIGINS = ",".join(
    [
        "http://localhost:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001",
    ]
)
CORS_ORIGINS = [o.strip() for o in os.getenv("CORS_ORIGINS", _DEFAULT_CORS_ORIGINS).split(",") if o.strip()]

# Logging Configuration
LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")
LOG_FILE = os.getenv("LOG_FILE", str(BASE_DIR / "logs" / "billinator.log"))
LOG_DIR = Path(LOG_FILE).parent
LOG_DIR.mkdir(parents=True, exist_ok=True)
LOG_TO_FILE = os.getenv("LOG_TO_FILE", "true" if APP_ENV == "production" else "false").lower() == "true"
LOG_JSON = os.getenv("LOG_JSON", "true" if APP_ENV == "production" else "false").lower() == "true"
LOG_MAX_BYTES = int(os.getenv("LOG_MAX_BYTES", str(10 * 1024 * 1024)))  # 10MB
LOG_BACKUP_COUNT = int(os.getenv("LOG_BACKUP_COUNT", "5"))

# Rate Limiting
RATE_LIMIT_ENABLED = os.getenv("RATE_LIMIT_ENABLED", "true").lower() == "true"
RATE_LIMIT_PER_MINUTE = int(os.getenv("RATE_LIMIT_PER_MINUTE", "60"))

# User Roles
ROLES = {
    "ADMIN": "Admin",
    "BILLING": "Billing",
    "INVENTORY_MANAGER": "Inventory Manager"
}

# GST Configuration
GST_STATES = {
    "SAME_STATE": "Same State (CGST + SGST)",
    "DIFFERENT_STATE": "Different State (IGST)"
}

