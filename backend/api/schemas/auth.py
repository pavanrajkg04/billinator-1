"""Authentication schemas."""
from pydantic import BaseModel, EmailStr, Field, validator
from typing import Optional

class LoginRequest(BaseModel):
    username: str = Field(..., min_length=1, max_length=100, description="Username")
    password: str = Field(..., min_length=6, max_length=100, description="Password")
    tenant_id: Optional[int] = Field(None, description="Optional tenant ID for multi-tenant login")
    
    @validator('username')
    def validate_username(cls, v):
        if not v.strip():
            raise ValueError('Username cannot be empty')
        return v.strip()
    
    @validator('password')
    def validate_password(cls, v):
        if len(v) < 6:
            raise ValueError('Password must be at least 6 characters')
        return v


class RegisterRequest(BaseModel):
    tenant_name: str = Field(..., min_length=1, max_length=200, description="Business/Tenant name")
    tenant_gstin: Optional[str] = Field(None, max_length=15, description="GSTIN (optional)")
    tenant_address: str = Field(..., min_length=1, max_length=500, description="Business address")
    tenant_city: str = Field(..., min_length=1, max_length=100, description="City")
    tenant_state: str = Field(..., min_length=1, max_length=100, description="State")
    tenant_pincode: str = Field(..., min_length=5, max_length=10, description="Pincode")
    tenant_phone: str = Field(..., min_length=10, max_length=15, description="Phone number")
    tenant_email: EmailStr = Field(..., description="Business email")
    username: str = Field(..., min_length=3, max_length=50, description="Username")
    password: str = Field(..., min_length=6, max_length=100, description="Password")
    full_name: str = Field(..., min_length=1, max_length=200, description="Full name")
    
    @validator('tenant_gstin')
    def validate_gstin(cls, v):
        # Treat blank/whitespace-only GSTIN as not provided (NULL in DB).
        # This matters because the DB has a UNIQUE constraint on gstin and multiple
        # empty strings ("") would otherwise violate it.
        if v is None:
            return None

        v = v.strip().upper()
        if not v:
            return None

        # Basic GSTIN validation (15 characters, alphanumeric)
        if len(v) != 15:
            raise ValueError('GSTIN must be 15 characters')
        if not v.isalnum():
            raise ValueError('GSTIN must be alphanumeric')
        return v
    
    @validator('tenant_pincode')
    def validate_pincode(cls, v):
        if not v.isdigit():
            raise ValueError('Pincode must be numeric')
        return v
    
    @validator('tenant_phone')
    def validate_phone(cls, v):
        # Remove spaces and dashes
        v = v.replace(' ', '').replace('-', '')
        if not v.isdigit():
            raise ValueError('Phone number must be numeric')
        return v

