# Billinator - Multi-Tenant GST Billing & Inventory Web App

**Developed by [Medhā Labs](https://medhalabs.in/)**

> **Free to Use Until 2027** - This product is currently under active development and is free to use until 2027.

A complete multi-tenant GST billing and inventory management system built with **Next.js** (frontend) and **FastAPI** (backend), using DuckDB for data storage.

Billinator provides a comprehensive solution for businesses to manage their invoicing, inventory, customers, suppliers, and financial transactions while ensuring full compliance with GST regulations.

## 🚀 Features

- **Multi-Tenant Architecture**: Complete tenant isolation with automatic data filtering
- **GST Invoicing**: B2B, B2C, Bill of Supply, Credit/Debit Notes
- **Inventory Management**: Stock tracking, reorder alerts, weighted average costing
- **Purchase & Sales**: Complete purchase and sales invoice management
- **Customer & Supplier Management**: Ledger tracking and outstanding balances
- **Reports**: Sales, Purchase, GST, and Stock reports
- **User Management**: Role-based access control (Admin, Billing, Inventory Manager)

## 📋 Prerequisites

- Python 3.10+
- Node.js 18+ and npm
- pip

## 🛠️ Installation

### Backend Setup

1. **Navigate to the project directory:**
   ```bash
   cd billinator
   ```

2. **Create a virtual environment (recommended):**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. **Initialize the database:**
   ```bash
   python -m database.schema
   ```

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install Node.js dependencies:**
   ```bash
   npm install
   ```

## 🏃 Running the Application

### Development Mode

1. **Start the FastAPI backend:**
   ```bash
   # From project root
   cd backend
   uvicorn main:app --reload --port 8000
   ```

2. **Start the Next.js frontend:**
   ```bash
   # From frontend directory
   cd frontend
   npm run dev
   ```

3. **Access the application:**
   - Open your browser to `http://localhost:3000`
   - Register a new business/tenant
   - Login with your credentials

### Production Mode (Docker)

```bash
docker-compose up -d
```

This will start both backend (port 8000) and frontend (port 3000) services.

## 📁 Project Structure

```
billinator/
├── backend/
│   ├── main.py            # FastAPI application entry point
│   ├── api/
│   │   ├── routes/        # API route handlers
│   │   └── dependencies.py # API dependencies (auth, etc.)
│   └── requirements.txt   # Backend Python dependencies
├── frontend/
│   ├── app/               # Next.js app directory
│   │   ├── page.tsx       # Landing page
│   │   ├── login/         # Login page
│   │   ├── dashboard/     # Dashboard page
│   │   └── ...            # Other pages
│   ├── components/        # React components
│   └── lib/               # Utilities and API client
├── database/
│   ├── connection.py      # DuckDB connection manager
│   └── schema.py          # Database schema initialization
├── models/
│   └── base.py            # Base DAO classes
├── services/
│   ├── auth_service.py    # Authentication service
│   └── audit_service.py   # Audit logging service
├── config.py              # Configuration settings
└── requirements.txt       # Python dependencies
```

## 🔐 Multi-Tenancy

- Every table includes a `tenant_id` column
- All queries automatically filter by `tenant_id`
- Users belong to a tenant (business)
- Tenant context is loaded from the logged-in user session

## 📊 Database

- **Database**: DuckDB (persistent file-based)
- **Location**: `./data/billinator.db` (configurable via `.env`)
- **Schema**: Auto-initialized on first run

## 🎯 Next Steps

After completing Step 1, implement the following modules:

1. Products Module (CRUD)
2. Customers & Suppliers Module
3. Purchase Module
4. Sales Module
5. Stock Management
6. Reports Module
7. Settings Module

## 📝 Notes

- All monetary values are stored as DECIMAL(15, 2)
- All timestamps are stored in UTC
- JWT tokens are used for session management
- Passwords are hashed using bcrypt

## 🔒 Security

- Change `JWT_SECRET_KEY` in production
- Use strong passwords
- Keep `.env` file secure and never commit it

## 📄 License & Usage

**Billinator** is proprietary software developed by **Medhā Labs**.

**Free to Use Until 2027** - This product is currently under active development and is free to use until 2027. After this period, usage terms may change.

© 2024 Medhā Labs. All Rights Reserved.

## 📚 Documentation

For comprehensive documentation, see [DOCUMENTATION.md](./DOCUMENTATION.md)

## 🏢 About Medhā Labs

**Billinator** is proudly developed by **Medhā Labs**, a technology solutions company specializing in enterprise software development.

Visit [https://medhalabs.in/](https://medhalabs.in/) to learn more about Medhā Labs.

