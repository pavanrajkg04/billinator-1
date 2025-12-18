"""Dependencies for FastAPI routes."""
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import sys
from pathlib import Path

# Add parent directory to path to import services
sys.path.insert(0, str(Path(__file__).parent.parent.parent))
from services.auth_service import AuthService
from typing import Dict, Any, Optional
from backend.utils.logger import set_log_context

security = HTTPBearer()

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
) -> Dict[str, Any]:
    """Get current authenticated user from JWT token."""
    token = credentials.credentials
    payload = AuthService.verify_token(token)
    
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    tenant_id = payload.get("tenant_id")
    user_id = payload.get("user_id")
    
    if not tenant_id or not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token payload",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    user = AuthService.get_user_by_id(tenant_id, user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Bind auth context for downstream logs within this request
    set_log_context(tenant_id=tenant_id, user_id=user_id)
    
    return user

def get_tenant_id(user: Dict[str, Any] = Depends(get_current_user)) -> int:
    """Get tenant ID from current user."""
    return user.get("tenant_id")

def get_user_id(user: Dict[str, Any] = Depends(get_current_user)) -> int:
    """Get user ID from current user."""
    return user.get("id")

