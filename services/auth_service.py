"""Authentication service for multi-tenant user management."""
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
from typing import Optional, Dict, Any
from database.connection import db_manager
import config

# Configure bcrypt with explicit rounds
pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto",
    bcrypt__rounds=12,
    bcrypt__ident="2b"  # Use bcrypt 2b format
)


class AuthService:
    """Service for authentication and authorization."""
    
    @staticmethod
    def hash_password(password: str) -> str:
        """Hash a password."""
        # Ensure password is a string
        if not isinstance(password, str):
            password = str(password)
        
        # Strip any whitespace
        password = password.strip()
        
        # Convert to bytes for bcrypt (bcrypt works with bytes, not strings)
        # Bcrypt has a 72-byte limit
        password_bytes = password.encode('utf-8')
        if len(password_bytes) > 72:
            # Truncate to 72 bytes
            password_bytes = password_bytes[:72]
        
        # Pass bytes directly to bcrypt via passlib
        # Passlib will handle the bytes correctly
        return pwd_context.hash(password_bytes.decode('utf-8', errors='ignore'))
    
    @staticmethod
    def verify_password(plain_password: str, hashed_password: str) -> bool:
        """Verify a password against its hash."""
        # Ensure password is a string
        if not isinstance(plain_password, str):
            plain_password = str(plain_password)
        
        # Strip any whitespace
        plain_password = plain_password.strip()
        
        # Passlib handles the 72-byte limit automatically
        return pwd_context.verify(plain_password, hashed_password)
    
    @staticmethod
    def create_access_token(data: Dict[str, Any]) -> str:
        """Create JWT access token."""
        to_encode = data.copy()
        expire = datetime.utcnow() + timedelta(hours=config.JWT_EXPIRATION_HOURS)
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, config.JWT_SECRET_KEY, algorithm=config.JWT_ALGORITHM)
        return encoded_jwt
    
    @staticmethod
    def verify_token(token: str) -> Optional[Dict[str, Any]]:
        """Verify and decode JWT token."""
        try:
            payload = jwt.decode(token, config.JWT_SECRET_KEY, algorithms=[config.JWT_ALGORITHM])
            return payload
        except JWTError:
            return None
    
    @staticmethod
    def register_tenant(tenant_data: Dict[str, Any]) -> int:
        """Register a new tenant (business)."""
        # Get next ID manually (DuckDB auto-increment may not work as expected)
        max_id_result = db_manager.fetch_one("SELECT COALESCE(MAX(id), 0) FROM tenants")
        next_id = (max_id_result[0] if max_id_result else 0) + 1
        
        query = """
            INSERT INTO tenants (id, name, gstin, address, city, state, pincode, phone, email)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """
        params = (
            next_id,
            tenant_data.get('name'),
            tenant_data.get('gstin'),
            tenant_data.get('address'),
            tenant_data.get('city'),
            tenant_data.get('state'),
            tenant_data.get('pincode'),
            tenant_data.get('phone'),
            tenant_data.get('email')
        )
        db_manager.execute(query, params)
        db_manager.commit()
        
        tenant_id = next_id
        
        # Create default invoice settings for tenant
        if tenant_id:
            # Get next ID manually
            max_id_result = db_manager.fetch_one("SELECT COALESCE(MAX(id), 0) FROM invoice_settings")
            next_id = (max_id_result[0] if max_id_result else 0) + 1
            
            db_manager.execute("""
                INSERT INTO invoice_settings (id, tenant_id)
                VALUES (?, ?)
            """, (next_id, tenant_id))
            db_manager.commit()

            # Create default roles for tenant (if roles table exists)
            try:
                # If no roles exist, seed defaults.
                existing_roles = db_manager.fetch_one(
                    "SELECT COUNT(*) FROM roles WHERE tenant_id = ?",
                    (tenant_id,),
                )
                if not existing_roles or existing_roles[0] == 0:
                    max_id_result = db_manager.fetch_one("SELECT COALESCE(MAX(id), 0) FROM roles")
                    next_role_id = (max_id_result[0] if max_id_result else 0) + 1
                    defaults = [
                        ("ADMIN", "Admin", "Full access to all modules"),
                        ("BILLING", "Billing", "Create invoices, manage customers, view reports"),
                        ("INVENTORY_MANAGER", "Inventory Manager", "Manage products, stock, and purchases"),
                    ]
                    for i, (code, name, desc) in enumerate(defaults):
                        db_manager.execute(
                            """
                            INSERT INTO roles (id, tenant_id, code, name, description, is_active)
                            VALUES (?, ?, ?, ?, ?, TRUE)
                            """,
                            (next_role_id + i, tenant_id, code, name, desc),
                        )
                    db_manager.commit()
            except Exception:
                # Don't block registration if roles seeding fails
                pass
        
        return tenant_id
    
    @staticmethod
    def create_user(tenant_id: int, user_data: Dict[str, Any]) -> int:
        """Create a new user for a tenant."""
        # Ensure password is a string and not empty
        password = user_data.get('password', '')
        if not password:
            raise ValueError("Password is required")
        
        # Convert to string if needed and strip whitespace
        if not isinstance(password, str):
            password = str(password)
        password = password.strip()
        
        # Debug: Check password length (remove in production)
        password_bytes = password.encode('utf-8')
        if len(password_bytes) > 72:
            raise ValueError(f"Password is too long: {len(password_bytes)} bytes (max 72)")
        
        password_hash = AuthService.hash_password(password)
        
        # Get next ID manually
        max_id_result = db_manager.fetch_one("SELECT COALESCE(MAX(id), 0) FROM users")
        next_id = (max_id_result[0] if max_id_result else 0) + 1
        
        query = """
            INSERT INTO users (id, tenant_id, username, email, password_hash, full_name, role)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """
        params = (
            next_id,
            tenant_id,
            user_data.get('username'),
            user_data.get('email'),
            password_hash,
            user_data.get('full_name'),
            user_data.get('role', 'BILLING')
        )
        db_manager.execute(query, params)
        db_manager.commit()
        
        return next_id
    
    @staticmethod
    def authenticate_user(username: str, password: str, tenant_id: int = None) -> Optional[Dict[str, Any]]:
        """Authenticate a user and return user data."""
        # Treat `username` as an identifier (username OR email) for convenience.
        identifier = username

        if tenant_id:
            query = """
                SELECT u.*, t.name as tenant_name, t.gstin as tenant_gstin
                FROM users u
                JOIN tenants t ON u.tenant_id = t.id
                WHERE u.username = ? AND u.tenant_id = ? AND u.is_active = TRUE
            """
            params = (username, tenant_id)
        else:
            # Try to find user across all tenants (for login).
            # IMPORTANT: The same username can exist in multiple tenants (e.g. 'admin').
            # We must try *all* candidate rows and verify the password against each.
            query = """
                SELECT u.*, t.name as tenant_name, t.gstin as tenant_gstin
                FROM users u
                JOIN tenants t ON u.tenant_id = t.id
                WHERE (u.username = ? OR u.email = ?) AND u.is_active = TRUE
            """
            params = (identifier, identifier)
        
        # Execute query
        conn = db_manager.get_connection()
        cursor = conn.execute(query, params)
        columns = [desc[0] for desc in cursor.description]

        if tenant_id:
            row = cursor.fetchone()
            if not row:
                return None
            user_dict = dict(zip(columns, row))
            if not AuthService.verify_password(password, user_dict["password_hash"]):
                return None
            user_dict.pop("password_hash", None)
            return user_dict

        # No tenant_id: try all candidates until password matches.
        rows = cursor.fetchall()
        if not rows:
            return None

        for row in rows:
            user_dict = dict(zip(columns, row))
            if AuthService.verify_password(password, user_dict["password_hash"]):
                user_dict.pop("password_hash", None)
                return user_dict

        return None
    
    @staticmethod
    def get_user_by_id(tenant_id: int, user_id: int) -> Optional[Dict[str, Any]]:
        """Get user by ID with tenant check."""
        query = """
            SELECT u.*, t.name as tenant_name
            FROM users u
            JOIN tenants t ON u.tenant_id = t.id
            WHERE u.id = ? AND u.tenant_id = ? AND u.is_active = TRUE
        """
        # Execute query and get result with column names
        conn = db_manager.get_connection()
        cursor = conn.execute(query, (user_id, tenant_id))
        result = cursor.fetchone()
        if result:
            columns = [desc[0] for desc in cursor.description]
            user_dict = dict(zip(columns, result))
            user_dict.pop('password_hash', None)
            return user_dict
        return None

