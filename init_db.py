"""Initialize the database schema."""
from database.schema import init_schema

if __name__ == "__main__":
    print("Initializing Billinator database...")
    try:
        init_schema()
        print("✓ Database initialized successfully!")
    except Exception as e:
        print(f"✗ Error initializing database: {e}")
        raise

