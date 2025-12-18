"""Activities API routes."""
from fastapi import APIRouter, HTTPException, status, Depends
from pydantic import BaseModel
from typing import Optional, Dict, Any
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent.parent))
from services.activity_service import ActivityService
from api.dependencies import get_tenant_id, get_user_id

router = APIRouter()
activity_service = ActivityService()

class ActivityCreate(BaseModel):
    customer_id: Optional[int] = None
    opportunity_id: Optional[int] = None
    quote_id: Optional[int] = None
    type: str  # CALL, EMAIL, MEETING, TASK, NOTE
    subject: str
    description: Optional[str] = None
    due_date: Optional[str] = None
    priority: str = "MEDIUM"
    assigned_to: Optional[int] = None

class ActivityUpdate(BaseModel):
    customer_id: Optional[int] = None
    opportunity_id: Optional[int] = None
    quote_id: Optional[int] = None
    type: Optional[str] = None
    subject: Optional[str] = None
    description: Optional[str] = None
    due_date: Optional[str] = None
    completed_date: Optional[str] = None
    status: Optional[str] = None
    priority: Optional[str] = None
    assigned_to: Optional[int] = None

@router.get("/")
async def list_activities(
    customer_id: Optional[int] = None,
    type: Optional[str] = None,
    status: Optional[str] = None,
    assigned_to: Optional[int] = None,
    tenant_id: int = Depends(get_tenant_id)
):
    """List all activities."""
    try:
        filters = {}
        if customer_id:
            filters['customer_id'] = customer_id
        if type:
            filters['type'] = type
        if status:
            filters['status'] = status
        if assigned_to:
            filters['assigned_to'] = assigned_to
        
        activities = activity_service.list_activities(tenant_id, filters)
        return {"activities": activities}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/pending")
async def get_pending_tasks(
    tenant_id: int = Depends(get_tenant_id),
    user_id: int = Depends(get_user_id)
):
    """Get pending tasks."""
    try:
        tasks = activity_service.dao.get_pending_tasks(tenant_id, user_id)
        return {"tasks": tasks}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/upcoming")
async def get_upcoming_tasks(
    days: int = 7,
    tenant_id: int = Depends(get_tenant_id)
):
    """Get upcoming tasks."""
    try:
        tasks = activity_service.get_upcoming_tasks(tenant_id, days)
        return {"tasks": tasks}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{activity_id}")
async def get_activity(
    activity_id: int,
    tenant_id: int = Depends(get_tenant_id)
):
    """Get an activity by ID."""
    try:
        activity = activity_service.get_activity(tenant_id, activity_id)
        if not activity:
            raise HTTPException(status_code=404, detail="Activity not found")
        return {"activity": activity}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/")
async def create_activity(
    activity: ActivityCreate,
    tenant_id: int = Depends(get_tenant_id),
    user_id: int = Depends(get_user_id)
):
    """Create a new activity."""
    try:
        activity_data = activity.dict(exclude_unset=True)
        activity_id = activity_service.create_activity(tenant_id, user_id, activity_data)
        return {"activity_id": activity_id, "message": "Activity created successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{activity_id}")
async def update_activity(
    activity_id: int,
    activity: ActivityUpdate,
    tenant_id: int = Depends(get_tenant_id),
    user_id: int = Depends(get_user_id)
):
    """Update an activity."""
    try:
        activity_data = {k: v for k, v in activity.dict(exclude_unset=True).items() if v is not None}
        result = activity_service.update_activity(tenant_id, user_id, activity_id, activity_data)
        if not result:
            raise HTTPException(status_code=404, detail="Activity not found")
        return {"message": "Activity updated successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{activity_id}")
async def delete_activity(
    activity_id: int,
    tenant_id: int = Depends(get_tenant_id),
    user_id: int = Depends(get_user_id)
):
    """Delete an activity."""
    try:
        result = activity_service.delete_activity(tenant_id, user_id, activity_id)
        if not result:
            raise HTTPException(status_code=404, detail="Activity not found")
        return {"message": "Activity deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

