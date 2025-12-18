"""Opportunities API routes."""
from fastapi import APIRouter, HTTPException, status, Depends
from pydantic import BaseModel
from typing import Optional, Dict, Any
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent.parent))
from services.opportunity_service import OpportunityService
from api.dependencies import get_tenant_id, get_user_id

router = APIRouter()
opportunity_service = OpportunityService()

class OpportunityCreate(BaseModel):
    customer_id: Optional[int] = None
    title: str
    description: Optional[str] = None
    value: float = 0.0
    probability: int = 0
    stage: str = "LEAD"
    expected_close_date: Optional[str] = None
    source: Optional[str] = None
    assigned_to: Optional[int] = None
    notes: Optional[str] = None

class OpportunityUpdate(BaseModel):
    customer_id: Optional[int] = None
    title: Optional[str] = None
    description: Optional[str] = None
    value: Optional[float] = None
    probability: Optional[int] = None
    stage: Optional[str] = None
    expected_close_date: Optional[str] = None
    actual_close_date: Optional[str] = None
    source: Optional[str] = None
    assigned_to: Optional[int] = None
    status: Optional[str] = None
    notes: Optional[str] = None

@router.get("/")
async def list_opportunities(
    stage: Optional[str] = None,
    status: Optional[str] = None,
    customer_id: Optional[int] = None,
    tenant_id: int = Depends(get_tenant_id)
):
    """List all opportunities."""
    try:
        filters = {}
        if stage:
            filters['stage'] = stage
        if status:
            filters['status'] = status
        if customer_id:
            filters['customer_id'] = customer_id
        
        opportunities = opportunity_service.list_opportunities(tenant_id, filters)
        return {"opportunities": opportunities}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/pipeline")
async def get_pipeline_stats(tenant_id: int = Depends(get_tenant_id)):
    """Get pipeline statistics."""
    try:
        stats = opportunity_service.get_pipeline_stats(tenant_id)
        return stats
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{opportunity_id}")
async def get_opportunity(
    opportunity_id: int,
    tenant_id: int = Depends(get_tenant_id)
):
    """Get an opportunity by ID."""
    try:
        opportunity = opportunity_service.get_opportunity(tenant_id, opportunity_id)
        if not opportunity:
            raise HTTPException(status_code=404, detail="Opportunity not found")
        return {"opportunity": opportunity}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/")
async def create_opportunity(
    opportunity: OpportunityCreate,
    tenant_id: int = Depends(get_tenant_id),
    user_id: int = Depends(get_user_id)
):
    """Create a new opportunity."""
    try:
        opportunity_data = opportunity.dict(exclude_unset=True)
        opportunity_id = opportunity_service.create_opportunity(tenant_id, user_id, opportunity_data)
        return {"opportunity_id": opportunity_id, "message": "Opportunity created successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{opportunity_id}")
async def update_opportunity(
    opportunity_id: int,
    opportunity: OpportunityUpdate,
    tenant_id: int = Depends(get_tenant_id),
    user_id: int = Depends(get_user_id)
):
    """Update an opportunity."""
    try:
        opportunity_data = {k: v for k, v in opportunity.dict(exclude_unset=True).items() if v is not None}
        result = opportunity_service.update_opportunity(tenant_id, user_id, opportunity_id, opportunity_data)
        if not result:
            raise HTTPException(status_code=404, detail="Opportunity not found")
        return {"message": "Opportunity updated successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{opportunity_id}")
async def delete_opportunity(
    opportunity_id: int,
    tenant_id: int = Depends(get_tenant_id),
    user_id: int = Depends(get_user_id)
):
    """Delete an opportunity."""
    try:
        result = opportunity_service.delete_opportunity(tenant_id, user_id, opportunity_id)
        if not result:
            raise HTTPException(status_code=404, detail="Opportunity not found")
        return {"message": "Opportunity deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

