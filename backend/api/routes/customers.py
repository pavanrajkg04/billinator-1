"""Customers API routes."""
from fastapi import APIRouter, HTTPException, status, Depends
from pydantic import BaseModel
from typing import Optional
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent.parent))
from services.customer_service import CustomerService
from api.dependencies import get_tenant_id, get_user_id

router = APIRouter()
customer_service = CustomerService()

class CustomerCreate(BaseModel):
    name: str
    gstin: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    pincode: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None

class CustomerUpdate(BaseModel):
    name: Optional[str] = None
    gstin: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    pincode: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None

@router.get("/")
async def list_customers(tenant_id: int = Depends(get_tenant_id)):
    """List all customers."""
    try:
        customers = customer_service.list_customers(tenant_id)
        return {"customers": customers}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{customer_id}")
async def get_customer(customer_id: int, tenant_id: int = Depends(get_tenant_id)):
    """Get a customer by ID."""
    try:
        customer = customer_service.get_customer(tenant_id, customer_id)
        if not customer:
            raise HTTPException(status_code=404, detail="Customer not found")
        return {"customer": customer}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/")
async def create_customer(
    customer: CustomerCreate,
    tenant_id: int = Depends(get_tenant_id),
    user_id: int = Depends(get_user_id)
):
    """Create a new customer."""
    try:
        customer_data = customer.dict(exclude_unset=True)
        customer_id = customer_service.create_customer(tenant_id, user_id, customer_data)
        return {"customer_id": customer_id, "message": "Customer created successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{customer_id}")
async def update_customer(
    customer_id: int,
    customer: CustomerUpdate,
    tenant_id: int = Depends(get_tenant_id),
    user_id: int = Depends(get_user_id)
):
    """Update a customer."""
    try:
        customer_data = {k: v for k, v in customer.dict(exclude_unset=True).items() if v is not None}
        result = customer_service.update_customer(tenant_id, user_id, customer_id, customer_data)
        if not result:
            raise HTTPException(status_code=404, detail="Customer not found")
        return {"message": "Customer updated successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{customer_id}")
async def delete_customer(
    customer_id: int,
    tenant_id: int = Depends(get_tenant_id),
    user_id: int = Depends(get_user_id)
):
    """Delete a customer."""
    try:
        result = customer_service.delete_customer(tenant_id, user_id, customer_id)
        if not result:
            raise HTTPException(status_code=404, detail="Customer not found")
        return {"message": "Customer deleted successfully"}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

