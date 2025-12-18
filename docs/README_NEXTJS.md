# Billinator - Next.js + FastAPI Architecture

This is the new architecture with Next.js frontend and FastAPI backend.

## Quick Start

### Development

1. **Start Backend**:
   ```bash
   cd backend
   pip install -r requirements.txt
   uvicorn main:app --reload --port 8000
   ```

2. **Start Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Access**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Docs: http://localhost:8000/docs

### Production (Docker)

```bash
docker-compose up -d
```

## Project Structure

- `backend/` - FastAPI REST API
- `frontend/` - Next.js 14 application
- `services/` - Business logic (shared)
- `models/` - Data access layer (shared)
- `database/` - Database schema and connection (shared)

## API Documentation

Visit http://localhost:8000/docs for interactive API documentation.

## Environment Variables

See `.env.example` for required environment variables.

## Migration

See [MIGRATION.md](MIGRATION.md) for details on the migration from Reflex.

