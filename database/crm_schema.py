"""CRM-specific database schema additions."""
from database.connection import db_manager


def init_crm_schema():
    """Initialize CRM-related database tables."""
    conn = db_manager.get_connection()
    
    # Opportunities/Deals table
    conn.execute("""
        CREATE TABLE IF NOT EXISTS opportunities (
            id INTEGER PRIMARY KEY,
            tenant_id INTEGER NOT NULL,
            customer_id INTEGER,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            value DECIMAL(15, 2) DEFAULT 0,
            probability INTEGER DEFAULT 0, -- 0-100
            stage VARCHAR(50) NOT NULL DEFAULT 'LEAD', -- LEAD, QUALIFIED, PROPOSAL, NEGOTIATION, WON, LOST
            expected_close_date DATE,
            actual_close_date DATE,
            source VARCHAR(100), -- WEBSITE, REFERRAL, CALL, EMAIL, etc.
            assigned_to INTEGER, -- user_id
            status VARCHAR(20) DEFAULT 'OPEN', -- OPEN, WON, LOST
            notes TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            created_by INTEGER,
            FOREIGN KEY (tenant_id) REFERENCES tenants(id),
            FOREIGN KEY (customer_id) REFERENCES customers(id),
            FOREIGN KEY (assigned_to) REFERENCES users(id),
            FOREIGN KEY (created_by) REFERENCES users(id)
        )
    """)
    
    # Quotes/Estimates table
    conn.execute("""
        CREATE TABLE IF NOT EXISTS quotes (
            id INTEGER PRIMARY KEY,
            tenant_id INTEGER NOT NULL,
            customer_id INTEGER,
            opportunity_id INTEGER,
            quote_number VARCHAR(100) NOT NULL,
            quote_date DATE NOT NULL,
            valid_until DATE,
            status VARCHAR(20) DEFAULT 'DRAFT', -- DRAFT, SENT, ACCEPTED, REJECTED, EXPIRED
            subtotal DECIMAL(15, 2) DEFAULT 0,
            tax_amount DECIMAL(15, 2) DEFAULT 0,
            total_amount DECIMAL(15, 2) DEFAULT 0,
            notes TEXT,
            terms TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            created_by INTEGER,
            FOREIGN KEY (tenant_id) REFERENCES tenants(id),
            FOREIGN KEY (customer_id) REFERENCES customers(id),
            FOREIGN KEY (opportunity_id) REFERENCES opportunities(id),
            FOREIGN KEY (created_by) REFERENCES users(id),
            UNIQUE(tenant_id, quote_number)
        )
    """)
    
    # Quote Items table
    conn.execute("""
        CREATE TABLE IF NOT EXISTS quote_items (
            id INTEGER PRIMARY KEY,
            tenant_id INTEGER NOT NULL,
            quote_id INTEGER NOT NULL,
            product_id INTEGER,
            description TEXT,
            quantity DECIMAL(15, 3) NOT NULL DEFAULT 1,
            unit_price DECIMAL(15, 2) NOT NULL DEFAULT 0,
            tax_rate DECIMAL(5, 2) DEFAULT 0,
            line_total DECIMAL(15, 2) NOT NULL DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (tenant_id) REFERENCES tenants(id),
            FOREIGN KEY (quote_id) REFERENCES quotes(id) ON DELETE CASCADE,
            FOREIGN KEY (product_id) REFERENCES products(id)
        )
    """)
    
    # Activities/Tasks table
    conn.execute("""
        CREATE TABLE IF NOT EXISTS activities (
            id INTEGER PRIMARY KEY,
            tenant_id INTEGER NOT NULL,
            customer_id INTEGER,
            opportunity_id INTEGER,
            quote_id INTEGER,
            type VARCHAR(50) NOT NULL, -- CALL, EMAIL, MEETING, TASK, NOTE
            subject VARCHAR(255) NOT NULL,
            description TEXT,
            due_date TIMESTAMP,
            completed_date TIMESTAMP,
            status VARCHAR(20) DEFAULT 'PENDING', -- PENDING, COMPLETED, CANCELLED
            priority VARCHAR(20) DEFAULT 'MEDIUM', -- LOW, MEDIUM, HIGH, URGENT
            assigned_to INTEGER,
            created_by INTEGER,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (tenant_id) REFERENCES tenants(id),
            FOREIGN KEY (customer_id) REFERENCES customers(id),
            FOREIGN KEY (opportunity_id) REFERENCES opportunities(id),
            FOREIGN KEY (quote_id) REFERENCES quotes(id),
            FOREIGN KEY (assigned_to) REFERENCES users(id),
            FOREIGN KEY (created_by) REFERENCES users(id)
        )
    """)
    
    # Notes/Communication log table
    conn.execute("""
        CREATE TABLE IF NOT EXISTS customer_notes (
            id INTEGER PRIMARY KEY,
            tenant_id INTEGER NOT NULL,
            customer_id INTEGER NOT NULL,
            opportunity_id INTEGER,
            quote_id INTEGER,
            note_type VARCHAR(50) DEFAULT 'NOTE', -- NOTE, CALL, EMAIL, MEETING
            subject VARCHAR(255),
            content TEXT NOT NULL,
            created_by INTEGER,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (tenant_id) REFERENCES tenants(id),
            FOREIGN KEY (customer_id) REFERENCES customers(id),
            FOREIGN KEY (opportunity_id) REFERENCES opportunities(id),
            FOREIGN KEY (quote_id) REFERENCES quotes(id),
            FOREIGN KEY (created_by) REFERENCES users(id)
        )
    """)
    
    # Customer Contacts (multiple contacts per customer)
    conn.execute("""
        CREATE TABLE IF NOT EXISTS customer_contacts (
            id INTEGER PRIMARY KEY,
            tenant_id INTEGER NOT NULL,
            customer_id INTEGER NOT NULL,
            first_name VARCHAR(100) NOT NULL,
            last_name VARCHAR(100),
            email VARCHAR(255),
            phone VARCHAR(20),
            mobile VARCHAR(20),
            designation VARCHAR(100),
            department VARCHAR(100),
            is_primary BOOLEAN DEFAULT FALSE,
            notes TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (tenant_id) REFERENCES tenants(id),
            FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
        )
    """)
    
    # Customer Tags/Segmentation
    conn.execute("""
        CREATE TABLE IF NOT EXISTS customer_tags (
            id INTEGER PRIMARY KEY,
            tenant_id INTEGER NOT NULL,
            name VARCHAR(100) NOT NULL,
            color VARCHAR(20) DEFAULT '#3B82F6',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (tenant_id) REFERENCES tenants(id),
            UNIQUE(tenant_id, name)
        )
    """)
    
    # Customer-Tag mapping
    conn.execute("""
        CREATE TABLE IF NOT EXISTS customer_tag_mapping (
            tenant_id INTEGER NOT NULL,
            customer_id INTEGER NOT NULL,
            tag_id INTEGER NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (tenant_id, customer_id, tag_id),
            FOREIGN KEY (tenant_id) REFERENCES tenants(id),
            FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
            FOREIGN KEY (tag_id) REFERENCES customer_tags(id) ON DELETE CASCADE
        )
    """)
    
    # Create indexes
    conn.execute("CREATE INDEX IF NOT EXISTS idx_opportunities_tenant ON opportunities(tenant_id)")
    conn.execute("CREATE INDEX IF NOT EXISTS idx_opportunities_customer ON opportunities(customer_id)")
    conn.execute("CREATE INDEX IF NOT EXISTS idx_opportunities_stage ON opportunities(stage)")
    conn.execute("CREATE INDEX IF NOT EXISTS idx_quotes_tenant ON quotes(tenant_id)")
    conn.execute("CREATE INDEX IF NOT EXISTS idx_quotes_customer ON quotes(customer_id)")
    conn.execute("CREATE INDEX IF NOT EXISTS idx_activities_tenant ON activities(tenant_id)")
    conn.execute("CREATE INDEX IF NOT EXISTS idx_activities_customer ON activities(customer_id)")
    conn.execute("CREATE INDEX IF NOT EXISTS idx_activities_due_date ON activities(due_date)")
    conn.execute("CREATE INDEX IF NOT EXISTS idx_customer_notes_tenant ON customer_notes(tenant_id)")
    conn.execute("CREATE INDEX IF NOT EXISTS idx_customer_notes_customer ON customer_notes(customer_id)")
    conn.execute("CREATE INDEX IF NOT EXISTS idx_customer_contacts_tenant ON customer_contacts(tenant_id)")
    conn.execute("CREATE INDEX IF NOT EXISTS idx_customer_contacts_customer ON customer_contacts(customer_id)")
    
    db_manager.commit()
    print("CRM schema initialized successfully!")

