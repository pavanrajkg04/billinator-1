# Billinator Setup Guide

## Quick Start

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Configure Environment

Create a `.env` file in the project root with the following:

```env
# Database Configuration
DATABASE_PATH=./data/billinator.db

# JWT Secret (CHANGE IN PRODUCTION!)
JWT_SECRET_KEY=your-secret-key-change-in-production
JWT_ALGORITHM=HS256
JWT_EXPIRATION_HOURS=24

# App Configuration
APP_NAME=Billinator
APP_ENV=development
```

**Important**: Change `JWT_SECRET_KEY` to a strong random string in production!

### 3. Initialize Database

The database schema will be automatically initialized when you first run the app. Alternatively, you can manually initialize it:

```bash
python init_db.py
```

### 4. Run the Application

```bash
reflex run
```

The app will be available at `http://localhost:3000`

### 5. Register Your First Business

1. Navigate to the registration page
2. Fill in your business details
3. Create your admin account
4. Login and start using Billinator!

## Project Structure

```
billinator/
├── app.py                 # Main Reflex application entry point
├── config.py              # Configuration settings
├── state.py               # Global state management
├── requirements.txt       # Python dependencies
├── init_db.py            # Database initialization script
├── database/
│   ├── connection.py      # DuckDB connection manager
│   └── schema.py          # Database schema definitions
├── models/
│   └── base.py            # Base DAO with tenant isolation
├── services/
│   ├── auth_service.py    # Authentication & authorization
│   └── audit_service.py   # Audit logging
├── components/
│   └── layout.py          # Reusable UI components
├── pages/
│   ├── auth.py            # Login/Register pages
│   └── dashboard.py        # Dashboard page
└── utils/
    └── helpers.py         # Utility functions
```

## Multi-Tenancy

- Every table includes a `tenant_id` column
- All database queries automatically filter by `tenant_id`
- Users belong to a tenant (business)
- Tenant context is loaded from the logged-in user session
- Data is completely isolated between tenants

## Database

- **Type**: DuckDB (file-based, persistent)
- **Location**: `./data/billinator.db` (configurable)
- **Schema**: Auto-initialized on first run
- **Backup**: Simply copy the `.db` file

## Security Notes

1. **JWT Secret**: Always use a strong, random secret key in production
2. **Passwords**: Stored as bcrypt hashes
3. **Tenant Isolation**: Enforced at database and application level
4. **Environment Variables**: Never commit `.env` file to version control

## Next Steps

After setup, you can start implementing the remaining modules:

1. Products Module
2. Customers & Suppliers
3. Purchase Management
4. Sales Management
5. Stock Management
6. Reports
7. Settings

## Troubleshooting

### Database Connection Issues

- Ensure the `data/` directory exists and is writable
- Check `DATABASE_PATH` in `.env` is correct
- Try deleting the database file and reinitializing

### Import Errors

- Ensure all dependencies are installed: `pip install -r requirements.txt`
- Check Python version (3.10+ required)

### Authentication Issues

- Verify JWT_SECRET_KEY is set in `.env`
- Check that users are created with proper tenant_id

