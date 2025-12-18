#!/bin/bash
set -e

# Initialize database schema
echo "Initializing database schema..."
python -c "from database.schema import init_schema; init_schema()" || {
    echo "Warning: Database initialization had issues, continuing anyway..."
}

# Start FastAPI application
echo "Starting Billinator FastAPI backend..."
exec uvicorn backend.main:app --host 0.0.0.0 --port 8000

