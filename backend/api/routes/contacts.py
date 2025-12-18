"""Customer contacts API routes."""
from fastapi import APIRouter, HTTPException, status, Depends
from pydantic import BaseModel
from typing import Optional
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent.parent))
from services.contact_service import ContactService
from api.dependencies import get_tenant_id

router = APIRouter()
contact_service = ContactService()

class ContactCreate(BaseModel):
    customer_id: int
    first_name: str
    last_name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    mobile: Optional[str] = None
    designation: Optional[str] = None
    department: Optional[str] = None
    is_primary: bool = False
    notes: Optional[str] = None

class ContactUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    mobile: Optional[str] = None
    designation: Optional[str] = None
    department: Optional[str] = None
    is_primary: Optional[bool] = None
    notes: Optional[str] = None

@router.get("/customer/{customer_id}")
async def list_contacts(
    customer_id: int,
    tenant_id: int = Depends(get_tenant_id)
):
    """List all contacts for a customer."""
    try:
        contacts = contact_service.list_contacts(tenant_id, customer_id)
        return {"contacts": contacts}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{contact_id}")
async def get_contact(
    contact_id: int,
    tenant_id: int = Depends(get_tenant_id)
):
    """Get a contact by ID."""
    try:
        contact = contact_service.get_contact(tenant_id, contact_id)
        if not contact:
            raise HTTPException(status_code=404, detail="Contact not found")
        return {"contact": contact}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/")
async def create_contact(
    contact: ContactCreate,
    tenant_id: int = Depends(get_tenant_id)
):
    """Create a new contact."""
    try:
        contact_data = contact.dict(exclude_unset=True)
        contact_id = contact_service.create_contact(tenant_id, contact_data)
        return {"contact_id": contact_id, "message": "Contact created successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{contact_id}")
async def update_contact(
    contact_id: int,
    contact: ContactUpdate,
    tenant_id: int = Depends(get_tenant_id)
):
    """Update a contact."""
    try:
        contact_data = {k: v for k, v in contact.dict(exclude_unset=True).items() if v is not None}
        result = contact_service.update_contact(tenant_id, contact_id, contact_data)
        if not result:
            raise HTTPException(status_code=404, detail="Contact not found")
        return {"message": "Contact updated successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{contact_id}")
async def delete_contact(
    contact_id: int,
    tenant_id: int = Depends(get_tenant_id)
):
    """Delete a contact."""
    try:
        result = contact_service.delete_contact(tenant_id, contact_id)
        if not result:
            raise HTTPException(status_code=404, detail="Contact not found")
        return {"message": "Contact deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

