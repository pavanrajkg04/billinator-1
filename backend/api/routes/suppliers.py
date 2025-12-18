"""Suppliers API routes."""
from fastapi import APIRouter, HTTPException, status, Depends
from pydantic import BaseModel
from typing import Optional
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent.parent))
from services.supplier_service import SupplierService
from api.dependencies import get_tenant_id, get_user_id

router = APIRouter()
supplier_service = SupplierService()

class SupplierCreate(BaseModel):
    name: str
    gstin: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    pincode: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None

class SupplierUpdate(BaseModel):
    name: Optional[str] = None
    gstin: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    pincode: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None

@router.get("/")
async def list_suppliers(tenant_id: int = Depends(get_tenant_id)):
    """List all suppliers."""
    try:
        suppliers = supplier_service.list_suppliers(tenant_id)
        return {"suppliers": suppliers}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{supplier_id}")
async def get_supplier(supplier_id: int, tenant_id: int = Depends(get_tenant_id)):
    """Get a supplier by ID."""
    try:
        supplier = supplier_service.get_supplier(tenant_id, supplier_id)
        if not supplier:
            raise HTTPException(status_code=404, detail="Supplier not found")
        return {"supplier": supplier}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/")
async def create_supplier(
    supplier: SupplierCreate,
    tenant_id: int = Depends(get_tenant_id),
    user_id: int = Depends(get_user_id)
):
    """Create a new supplier."""
    try:
        supplier_data = supplier.dict(exclude_unset=True)
        supplier_id = supplier_service.create_supplier(tenant_id, user_id, supplier_data)
        return {"supplier_id": supplier_id, "message": "Supplier created successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{supplier_id}")
async def update_supplier(
    supplier_id: int,
    supplier: SupplierUpdate,
    tenant_id: int = Depends(get_tenant_id),
    user_id: int = Depends(get_user_id)
):
    """Update a supplier."""
    try:
        supplier_data = {k: v for k, v in supplier.dict(exclude_unset=True).items() if v is not None}
        result = supplier_service.update_supplier(tenant_id, user_id, supplier_id, supplier_data)
        if not result:
            raise HTTPException(status_code=404, detail="Supplier not found")
        return {"message": "Supplier updated successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{supplier_id}")
async def delete_supplier(
    supplier_id: int,
    tenant_id: int = Depends(get_tenant_id),
    user_id: int = Depends(get_user_id)
):
    """Delete a supplier."""
    try:
        result = supplier_service.delete_supplier(tenant_id, user_id, supplier_id)
        if not result:
            raise HTTPException(status_code=404, detail="Supplier not found")
        return {"message": "Supplier deleted successfully"}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

