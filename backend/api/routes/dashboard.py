"""Dashboard API routes."""
from fastapi import APIRouter, Depends, HTTPException, status
import sys
from pathlib import Path

# Add parent directory to path to import services
sys.path.insert(0, str(Path(__file__).parent.parent.parent))
from services.dashboard_service import DashboardService
from api.dependencies import get_tenant_id

router = APIRouter()
dashboard_service = DashboardService()

@router.get("/stats")
async def get_dashboard_stats(tenant_id: int = Depends(get_tenant_id)):
    """Get dashboard statistics."""
    try:
        stats = dashboard_service.get_dashboard_stats(tenant_id)
        return stats
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

