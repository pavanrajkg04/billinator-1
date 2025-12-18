"""Customer schemas."""
from pydantic import BaseModel, Field, EmailStr, validator
from typing import Optional

class CustomerCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=200, description="Customer name")
    gstin: Optional[str] = Field(None, max_length=15, description="GSTIN")
    address: Optional[str] = Field(None, max_length=500, description="Address")
    city: Optional[str] = Field(None, max_length=100, description="City")
    state: Optional[str] = Field(None, max_length=100, description="State")
    pincode: Optional[str] = Field(None, max_length=10, description="Pincode")
    phone: Optional[str] = Field(None, max_length=15, description="Phone")
    email: Optional[EmailStr] = Field(None, description="Email")
    
    @validator('gstin')
    def validate_gstin(cls, v):
        if v:
            v = v.strip().upper()
            if len(v) != 15:
                raise ValueError('GSTIN must be 15 characters')
            if not v.isalnum():
                raise ValueError('GSTIN must be alphanumeric')
        return v


class CustomerUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=200)
    gstin: Optional[str] = Field(None, max_length=15)
    address: Optional[str] = Field(None, max_length=500)
    city: Optional[str] = Field(None, max_length=100)
    state: Optional[str] = Field(None, max_length=100)
    pincode: Optional[str] = Field(None, max_length=10)
    phone: Optional[str] = Field(None, max_length=15)
    email: Optional[EmailStr] = None
    
    @validator('gstin')
    def validate_gstin(cls, v):
        if v:
            v = v.strip().upper()
            if len(v) != 15:
                raise ValueError('GSTIN must be 15 characters')
            if not v.isalnum():
                raise ValueError('GSTIN must be alphanumeric')
        return v

