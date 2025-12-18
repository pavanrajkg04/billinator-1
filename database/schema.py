"""Database schema initialization for Billinator."""
from database.connection import db_manager
import config


def init_schema():
    """Initialize all database tables with tenant_id support."""
    conn = db_manager.get_connection()
    # NOTE:
    # Do NOT early-return if the schema already exists.
    # We want `CREATE TABLE IF NOT EXISTS ...` to run on every startup so that
    # newly added tables (e.g. roles) are created for existing databases too.
    
    # Tenants table
    conn.execute("""
        CREATE TABLE IF NOT EXISTS tenants (
            id INTEGER PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            gstin VARCHAR(15) UNIQUE,
            address TEXT,
            city VARCHAR(100),
            state VARCHAR(100),
            pincode VARCHAR(10),
            phone VARCHAR(20),
            email VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    
    # Users table
    conn.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            tenant_id INTEGER NOT NULL,
            username VARCHAR(100) NOT NULL,
            email VARCHAR(255) NOT NULL,
            password_hash VARCHAR(255) NOT NULL,
            full_name VARCHAR(255),
            role VARCHAR(50) NOT NULL DEFAULT 'BILLING',
            is_active BOOLEAN DEFAULT TRUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (tenant_id) REFERENCES tenants(id),
            UNIQUE(tenant_id, username),
            UNIQUE(tenant_id, email)
        )
    """)

    # Roles table (tenant-scoped)
    conn.execute("""
        CREATE TABLE IF NOT EXISTS roles (
            id INTEGER PRIMARY KEY,
            tenant_id INTEGER NOT NULL,
            code VARCHAR(50) NOT NULL,   -- e.g. ADMIN, BILLING, SALES_MANAGER
            name VARCHAR(100) NOT NULL,  -- display name
            description TEXT,
            is_active BOOLEAN DEFAULT TRUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (tenant_id) REFERENCES tenants(id),
            UNIQUE(tenant_id, code)
        )
    """)
    
    # Product Categories
    conn.execute("""
        CREATE TABLE IF NOT EXISTS product_categories (
            id INTEGER PRIMARY KEY,
            tenant_id INTEGER NOT NULL,
            name VARCHAR(255) NOT NULL,
            description TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (tenant_id) REFERENCES tenants(id),
            UNIQUE(tenant_id, name)
        )
    """)
    
    # Products table
    conn.execute("""
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY,
            tenant_id INTEGER NOT NULL,
            sku VARCHAR(100) NOT NULL,
            name VARCHAR(255) NOT NULL,
            description TEXT,
            hsn_code VARCHAR(10),
            category_id INTEGER,
            unit VARCHAR(50) NOT NULL DEFAULT 'PCS',
            purchase_price DECIMAL(15, 2) DEFAULT 0,
            sale_price DECIMAL(15, 2) NOT NULL DEFAULT 0,
            tax_rate DECIMAL(5, 2) DEFAULT 0,
            current_stock DECIMAL(15, 3) DEFAULT 0,
            reorder_level DECIMAL(15, 3) DEFAULT 0,
            is_active BOOLEAN DEFAULT TRUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (tenant_id) REFERENCES tenants(id),
            FOREIGN KEY (category_id) REFERENCES product_categories(id),
            UNIQUE(tenant_id, sku)
        )
    """)
    
    # Stock Transactions
    conn.execute("""
        CREATE TABLE IF NOT EXISTS stock_transactions (
            id INTEGER PRIMARY KEY,
            tenant_id INTEGER NOT NULL,
            product_id INTEGER NOT NULL,
            transaction_type VARCHAR(20) NOT NULL, -- 'PURCHASE', 'SALE', 'RETURN', 'ADJUSTMENT'
            quantity DECIMAL(15, 3) NOT NULL,
            unit_price DECIMAL(15, 2) NOT NULL,
            reference_id INTEGER, -- invoice_id or adjustment_id
            reference_type VARCHAR(50), -- 'PURCHASE_INVOICE', 'SALES_INVOICE', etc.
            notes TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (tenant_id) REFERENCES tenants(id),
            FOREIGN KEY (product_id) REFERENCES products(id)
        )
    """)
    
    # Customers table
    conn.execute("""
        CREATE TABLE IF NOT EXISTS customers (
            id INTEGER PRIMARY KEY,
            tenant_id INTEGER NOT NULL,
            name VARCHAR(255) NOT NULL,
            gstin VARCHAR(15),
            address TEXT,
            city VARCHAR(100),
            state VARCHAR(100),
            pincode VARCHAR(10),
            phone VARCHAR(20),
            email VARCHAR(255),
            outstanding_balance DECIMAL(15, 2) DEFAULT 0,
            is_active BOOLEAN DEFAULT TRUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (tenant_id) REFERENCES tenants(id)
        )
    """)
    
    # Suppliers table
    conn.execute("""
        CREATE TABLE IF NOT EXISTS suppliers (
            id INTEGER PRIMARY KEY,
            tenant_id INTEGER NOT NULL,
            name VARCHAR(255) NOT NULL,
            gstin VARCHAR(15),
            address TEXT,
            city VARCHAR(100),
            state VARCHAR(100),
            pincode VARCHAR(10),
            phone VARCHAR(20),
            email VARCHAR(255),
            outstanding_balance DECIMAL(15, 2) DEFAULT 0,
            is_active BOOLEAN DEFAULT TRUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (tenant_id) REFERENCES tenants(id)
        )
    """)
    
    # Purchase Invoices
    conn.execute("""
        CREATE TABLE IF NOT EXISTS purchase_invoices (
            id INTEGER PRIMARY KEY,
            tenant_id INTEGER NOT NULL,
            invoice_number VARCHAR(100) NOT NULL,
            supplier_id INTEGER NOT NULL,
            invoice_date DATE NOT NULL,
            due_date DATE,
            subtotal DECIMAL(15, 2) NOT NULL DEFAULT 0,
            cgst_amount DECIMAL(15, 2) DEFAULT 0,
            sgst_amount DECIMAL(15, 2) DEFAULT 0,
            igst_amount DECIMAL(15, 2) DEFAULT 0,
            total_amount DECIMAL(15, 2) NOT NULL DEFAULT 0,
            paid_amount DECIMAL(15, 2) DEFAULT 0,
            status VARCHAR(20) DEFAULT 'PENDING', -- 'PENDING', 'PAID', 'PARTIAL'
            notes TEXT,
            created_by INTEGER,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (tenant_id) REFERENCES tenants(id),
            FOREIGN KEY (supplier_id) REFERENCES suppliers(id),
            FOREIGN KEY (created_by) REFERENCES users(id),
            UNIQUE(tenant_id, invoice_number)
        )
    """)
    
    # Purchase Items
    conn.execute("""
        CREATE TABLE IF NOT EXISTS purchase_items (
            id INTEGER PRIMARY KEY,
            tenant_id INTEGER NOT NULL,
            purchase_invoice_id INTEGER NOT NULL,
            product_id INTEGER NOT NULL,
            quantity DECIMAL(15, 3) NOT NULL,
            unit_price DECIMAL(15, 2) NOT NULL,
            tax_rate DECIMAL(5, 2) DEFAULT 0,
            cgst_amount DECIMAL(15, 2) DEFAULT 0,
            sgst_amount DECIMAL(15, 2) DEFAULT 0,
            igst_amount DECIMAL(15, 2) DEFAULT 0,
            total_amount DECIMAL(15, 2) NOT NULL,
            FOREIGN KEY (tenant_id) REFERENCES tenants(id),
            FOREIGN KEY (purchase_invoice_id) REFERENCES purchase_invoices(id),
            FOREIGN KEY (product_id) REFERENCES products(id)
        )
    """)
    
    # Sales Invoices
    conn.execute("""
        CREATE TABLE IF NOT EXISTS sales_invoices (
            id INTEGER PRIMARY KEY,
            tenant_id INTEGER NOT NULL,
            invoice_number VARCHAR(100) NOT NULL,
            customer_id INTEGER,
            invoice_type VARCHAR(20) NOT NULL DEFAULT 'B2B', -- 'B2B', 'B2C', 'BILL_OF_SUPPLY'
            invoice_date DATE NOT NULL,
            due_date DATE,
            place_of_supply VARCHAR(100),
            subtotal DECIMAL(15, 2) NOT NULL DEFAULT 0,
            cgst_amount DECIMAL(15, 2) DEFAULT 0,
            sgst_amount DECIMAL(15, 2) DEFAULT 0,
            igst_amount DECIMAL(15, 2) DEFAULT 0,
            total_amount DECIMAL(15, 2) NOT NULL DEFAULT 0,
            paid_amount DECIMAL(15, 2) DEFAULT 0,
            status VARCHAR(20) DEFAULT 'PENDING', -- 'PENDING', 'PAID', 'PARTIAL'
            notes TEXT,
            created_by INTEGER,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (tenant_id) REFERENCES tenants(id),
            FOREIGN KEY (customer_id) REFERENCES customers(id),
            FOREIGN KEY (created_by) REFERENCES users(id),
            UNIQUE(tenant_id, invoice_number)
        )
    """)
    
    # Sales Items
    conn.execute("""
        CREATE TABLE IF NOT EXISTS sales_items (
            id INTEGER PRIMARY KEY,
            tenant_id INTEGER NOT NULL,
            sales_invoice_id INTEGER NOT NULL,
            product_id INTEGER NOT NULL,
            quantity DECIMAL(15, 3) NOT NULL,
            unit_price DECIMAL(15, 2) NOT NULL,
            tax_rate DECIMAL(5, 2) DEFAULT 0,
            cgst_amount DECIMAL(15, 2) DEFAULT 0,
            sgst_amount DECIMAL(15, 2) DEFAULT 0,
            igst_amount DECIMAL(15, 2) DEFAULT 0,
            total_amount DECIMAL(15, 2) NOT NULL,
            FOREIGN KEY (tenant_id) REFERENCES tenants(id),
            FOREIGN KEY (sales_invoice_id) REFERENCES sales_invoices(id),
            FOREIGN KEY (product_id) REFERENCES products(id)
        )
    """)
    
    # Payments Received (from customers)
    conn.execute("""
        CREATE TABLE IF NOT EXISTS payments_received (
            id INTEGER PRIMARY KEY,
            tenant_id INTEGER NOT NULL,
            customer_id INTEGER NOT NULL,
            sales_invoice_id INTEGER,
            payment_date DATE NOT NULL,
            amount DECIMAL(15, 2) NOT NULL,
            payment_mode VARCHAR(50) NOT NULL, -- 'CASH', 'UPI', 'CARD', 'BANK_TRANSFER', 'CHEQUE'
            reference_number VARCHAR(100),
            notes TEXT,
            created_by INTEGER,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (tenant_id) REFERENCES tenants(id),
            FOREIGN KEY (customer_id) REFERENCES customers(id),
            FOREIGN KEY (sales_invoice_id) REFERENCES sales_invoices(id),
            FOREIGN KEY (created_by) REFERENCES users(id)
        )
    """)
    
    # Payments Made (to suppliers)
    conn.execute("""
        CREATE TABLE IF NOT EXISTS payments_made (
            id INTEGER PRIMARY KEY,
            tenant_id INTEGER NOT NULL,
            supplier_id INTEGER NOT NULL,
            purchase_invoice_id INTEGER,
            payment_date DATE NOT NULL,
            amount DECIMAL(15, 2) NOT NULL,
            payment_mode VARCHAR(50) NOT NULL,
            reference_number VARCHAR(100),
            notes TEXT,
            created_by INTEGER,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (tenant_id) REFERENCES tenants(id),
            FOREIGN KEY (supplier_id) REFERENCES suppliers(id),
            FOREIGN KEY (purchase_invoice_id) REFERENCES purchase_invoices(id),
            FOREIGN KEY (created_by) REFERENCES users(id)
        )
    """)
    
    # GST Rates
    conn.execute("""
        CREATE TABLE IF NOT EXISTS gst_rates (
            id INTEGER PRIMARY KEY,
            tenant_id INTEGER NOT NULL,
            rate DECIMAL(5, 2) NOT NULL,
            description VARCHAR(255),
            is_active BOOLEAN DEFAULT TRUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (tenant_id) REFERENCES tenants(id),
            UNIQUE(tenant_id, rate)
        )
    """)
    
    # Invoice Settings
    conn.execute("""
        CREATE TABLE IF NOT EXISTS invoice_settings (
            id INTEGER PRIMARY KEY,
            tenant_id INTEGER NOT NULL,
            sales_invoice_prefix VARCHAR(20) DEFAULT 'INV',
            sales_invoice_start_number INTEGER DEFAULT 1,
            purchase_invoice_prefix VARCHAR(20) DEFAULT 'PINV',
            purchase_invoice_start_number INTEGER DEFAULT 1,
            company_logo_path VARCHAR(255),
            terms_conditions TEXT,
            footer_text TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (tenant_id) REFERENCES tenants(id),
            UNIQUE(tenant_id)
        )
    """)
    
    # Audit Logs
    conn.execute("""
        CREATE TABLE IF NOT EXISTS audit_logs (
            id INTEGER PRIMARY KEY,
            tenant_id INTEGER NOT NULL,
            user_id INTEGER,
            action VARCHAR(100) NOT NULL,
            entity_type VARCHAR(50),
            entity_id INTEGER,
            details TEXT,
            ip_address VARCHAR(50),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (tenant_id) REFERENCES tenants(id),
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    """)
    
    # Create indexes for better performance
    conn.execute("CREATE INDEX IF NOT EXISTS idx_users_tenant ON users(tenant_id)")
    conn.execute("CREATE INDEX IF NOT EXISTS idx_products_tenant ON products(tenant_id)")
    conn.execute("CREATE INDEX IF NOT EXISTS idx_customers_tenant ON customers(tenant_id)")
    conn.execute("CREATE INDEX IF NOT EXISTS idx_suppliers_tenant ON suppliers(tenant_id)")
    conn.execute("CREATE INDEX IF NOT EXISTS idx_sales_invoices_tenant ON sales_invoices(tenant_id)")
    conn.execute("CREATE INDEX IF NOT EXISTS idx_purchase_invoices_tenant ON purchase_invoices(tenant_id)")
    conn.execute("CREATE INDEX IF NOT EXISTS idx_stock_transactions_tenant ON stock_transactions(tenant_id)")
    
    db_manager.commit()
    
    # Initialize CRM schema
    try:
        from database.crm_schema import init_crm_schema
        init_crm_schema()
    except Exception as e:
        print(f"Warning: CRM schema initialization issue: {e}")
    
    # Only print if we actually created tables (not if they already existed)
    print("Database schema initialized successfully!")


if __name__ == "__main__":
    init_schema()

