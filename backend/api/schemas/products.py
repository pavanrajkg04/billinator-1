"""Product schemas."""
from pydantic import BaseModel, Field, validator
from typing import Optional
from decimal import Decimal

class ProductCreate(BaseModel):
    sku: str = Field(..., min_length=1, max_length=100, description="Product SKU")
    name: str = Field(..., min_length=1, max_length=200, description="Product name")
    description: Optional[str] = Field(None, max_length=1000, description="Product description")
    hsn_code: Optional[str] = Field(None, max_length=20, description="HSN code")
    category_id: Optional[int] = Field(None, description="Category ID")
    unit: str = Field(..., max_length=20, description="Unit of measurement")
    purchase_price: Decimal = Field(0, ge=0, description="Purchase price")
    sale_price: Decimal = Field(..., gt=0, description="Sale price")
    tax_rate: Decimal = Field(0, ge=0, le=100, description="Tax rate percentage")
    current_stock: Decimal = Field(0, ge=0, description="Current stock quantity")
    reorder_level: Decimal = Field(0, ge=0, description="Reorder level")
    
    @validator('sku')
    def validate_sku(cls, v):
        return v.strip().upper()
    
    @validator('unit')
    def validate_unit(cls, v):
        valid_units = ['PCS', 'KG', 'LTR', 'MTR', 'BOX', 'PKT']
        if v.upper() not in valid_units:
            raise ValueError(f'Unit must be one of: {", ".join(valid_units)}')
        return v.upper()


class ProductUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=200)
    description: Optional[str] = Field(None, max_length=1000)
    hsn_code: Optional[str] = Field(None, max_length=20)
    category_id: Optional[int] = None
    unit: Optional[str] = Field(None, max_length=20)
    purchase_price: Optional[Decimal] = Field(None, ge=0)
    sale_price: Optional[Decimal] = Field(None, gt=0)
    tax_rate: Optional[Decimal] = Field(None, ge=0, le=100)
    current_stock: Optional[Decimal] = Field(None, ge=0)
    reorder_level: Optional[Decimal] = Field(None, ge=0)
    
    @validator('unit')
    def validate_unit(cls, v):
        if v:
            valid_units = ['PCS', 'KG', 'LTR', 'MTR', 'BOX', 'PKT']
            if v.upper() not in valid_units:
                raise ValueError(f'Unit must be one of: {", ".join(valid_units)}')
            return v.upper()
        return v

