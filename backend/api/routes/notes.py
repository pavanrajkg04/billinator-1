"""Customer notes API routes."""
from fastapi import APIRouter, HTTPException, status, Depends
from pydantic import BaseModel
from typing import Optional
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent.parent))
from services.note_service import NoteService
from api.dependencies import get_tenant_id, get_user_id

router = APIRouter()
note_service = NoteService()

class NoteCreate(BaseModel):
    customer_id: int
    opportunity_id: Optional[int] = None
    quote_id: Optional[int] = None
    note_type: str = "NOTE"  # NOTE, CALL, EMAIL, MEETING
    subject: Optional[str] = None
    content: str

class NoteUpdate(BaseModel):
    note_type: Optional[str] = None
    subject: Optional[str] = None
    content: Optional[str] = None

@router.get("/customer/{customer_id}")
async def list_notes(
    customer_id: int,
    tenant_id: int = Depends(get_tenant_id)
):
    """List all notes for a customer."""
    try:
        notes = note_service.list_notes(tenant_id, customer_id)
        return {"notes": notes}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{note_id}")
async def get_note(
    note_id: int,
    tenant_id: int = Depends(get_tenant_id)
):
    """Get a note by ID."""
    try:
        note = note_service.get_note(tenant_id, note_id)
        if not note:
            raise HTTPException(status_code=404, detail="Note not found")
        return {"note": note}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/")
async def create_note(
    note: NoteCreate,
    tenant_id: int = Depends(get_tenant_id),
    user_id: int = Depends(get_user_id)
):
    """Create a new note."""
    try:
        note_data = note.dict(exclude_unset=True)
        note_id = note_service.create_note(tenant_id, user_id, note_data)
        return {"note_id": note_id, "message": "Note created successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{note_id}")
async def update_note(
    note_id: int,
    note: NoteUpdate,
    tenant_id: int = Depends(get_tenant_id),
    user_id: int = Depends(get_user_id)
):
    """Update a note."""
    try:
        note_data = {k: v for k, v in note.dict(exclude_unset=True).items() if v is not None}
        result = note_service.update_note(tenant_id, user_id, note_id, note_data)
        if not result:
            raise HTTPException(status_code=404, detail="Note not found")
        return {"message": "Note updated successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{note_id}")
async def delete_note(
    note_id: int,
    tenant_id: int = Depends(get_tenant_id),
    user_id: int = Depends(get_user_id)
):
    """Delete a note."""
    try:
        result = note_service.delete_note(tenant_id, user_id, note_id)
        if not result:
            raise HTTPException(status_code=404, detail="Note not found")
        return {"message": "Note deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

