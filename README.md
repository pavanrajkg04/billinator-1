# Billinator - Multi-Tenant GST Billing & Inventory Management

**Developed by [Medhā Labs](https://medhalabs.in/)**

> **Free to Use Until 2027** - This product is currently under active development and is free to use until 2027.

A complete multi-tenant GST billing and inventory management system built with **Next.js** (frontend) and **FastAPI** (backend), using DuckDB for data storage.

## 🚀 Quick Start

### Prerequisites

- Python 3.10+
- Node.js 18+ and npm
- Docker (optional, for containerized deployment)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd billinator
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env and set JWT_SECRET_KEY (generate with: openssl rand -hex 32)
   ```

3. **Backend Setup:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   python -m database.schema  # Initialize database
   ```

4. **Frontend Setup:**
   ```bash
   cd frontend
   npm install
   ```

### Running the Application

**Development Mode:**

```bash
# Terminal 1 - Backend
cd backend
uvicorn main:app --reload --port 8000

# Terminal 2 - Frontend
cd frontend
npm run dev
```

**Production Mode (Docker):**

```bash
docker-compose up -d
```

Access the application at `http://localhost:3000`

## 📚 Documentation

All documentation is available in the `docs/` folder:

- **[Getting Started](docs/GETTING_STARTED.md)** - Detailed setup and installation guide
- **[API Documentation](docs/API.md)** - Complete API reference
- **[Security Guide](docs/SECURITY.md)** - Security best practices
- **[Deployment Guide](docs/DEPLOYMENT.md)** - Production deployment instructions
- **[Testing Guide](docs/TESTING.md)** - Running and writing tests
- **[Architecture](docs/ARCHITECTURE.md)** - System architecture overview

## 🏗️ Project Structure

```
billinator/
├── backend/           # FastAPI backend
│   ├── api/          # API routes and schemas
│   ├── middleware/   # Security and rate limiting
│   └── utils/        # Utilities (logging, etc.)
├── frontend/         # Next.js frontend
│   ├── app/          # Next.js app directory
│   ├── components/   # React components
│   └── lib/          # Utilities and API client
├── database/         # Database schema and connection
├── services/         # Business logic services
├── models/           # Data access objects (DAOs)
├── tests/            # Test suite
└── docs/             # Documentation
```

## ✨ Features

- **Multi-Tenant Architecture** - Complete tenant isolation
- **GST-Compliant Invoicing** - B2B, B2C, Bill of Supply
- **Inventory Management** - Real-time stock tracking
- **CRM Features** - Opportunities, Quotes, Activities
- **Comprehensive Reporting** - Sales, Purchase, GST reports
- **Role-Based Access Control** - Admin, Billing, Inventory Manager roles

## 🔒 Security

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting
- Security headers
- Input validation
- SQL injection protection

## 🧪 Testing

Run tests with:
```bash
pytest
```

With coverage:
```bash
pytest --cov
```

## 📄 License & Usage

**Billinator** is proprietary software developed by **Medhā Labs**.

**Free to Use Until 2027** - This product is currently under active development and is free to use until 2027. After this period, usage terms may change.

© 2024 Medhā Labs. All Rights Reserved.

## 🏢 About Medhā Labs

**Billinator** is proudly developed by **Medhā Labs**, a technology solutions company specializing in enterprise software development.

Visit [https://medhalabs.in/](https://medhalabs.in/) to learn more about Medhā Labs.

