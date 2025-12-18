"""Authentication API routes."""
from fastapi import APIRouter, HTTPException, status, Depends
from typing import Dict, Any
import sys
from pathlib import Path
import logging

sys.path.insert(0, str(Path(__file__).parent.parent.parent))
from services.auth_service import AuthService
from services.audit_service import AuditService
from api.dependencies import get_current_user
from api.schemas.auth import LoginRequest, RegisterRequest
from pydantic import BaseModel, EmailStr
from typing import Optional, Dict, Any

logger = logging.getLogger(__name__)
router = APIRouter()

class UserResponse(BaseModel):
    id: int
    tenant_id: int
    username: str
    email: EmailStr
    full_name: str
    role: str
    is_active: bool
    tenant_name: Optional[str] = None
    tenant_gstin: Optional[str] = None

    class Config:
        from_attributes = True

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse
    
    class Config:
        from_attributes = True

@router.post("/login", response_model=TokenResponse)
async def login(request: LoginRequest):
    """Login endpoint."""
    try:
        logger.info(f"Login attempt for identifier='{request.username}' tenant_id={request.tenant_id}")
        user = AuthService.authenticate_user(
            request.username,
            request.password,
            request.tenant_id
        )
        
        if not user:
            logger.warning(f"Login rejected for identifier='{request.username}' tenant_id={request.tenant_id}")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid username/email, password, or tenant ID. If you reused the same username for multiple businesses, enter the Tenant ID."
            )
        
        # Create JWT token
        token_data = {
            "user_id": user['id'],
            "tenant_id": user['tenant_id'],
            "username": user['username'],
            "role": user['role']
        }
        token = AuthService.create_access_token(token_data)
        
        # Log audit
        AuditService.log_action(
            user['tenant_id'],
            user['id'],
            "LOGIN",
            details="User logged in"
        )
        
        # Remove password hash if present
        user.pop('password_hash', None)
        
        # Return token response - Pydantic will validate the nested UserResponse
        return TokenResponse(
            access_token=token,
            user=user  # Pass dict, Pydantic will validate it as UserResponse
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Login error: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Login failed. Please try again later."
        )

@router.post("/register")
async def register(request: RegisterRequest):
    """Register new tenant and admin user."""
    try:
        logger.info(f"Registration attempt for tenant: {request.tenant_name}")
        # Create tenant
        tenant_data = {
            "name": request.tenant_name,
            # Normalize optional/blank values to avoid DB constraint issues (e.g. UNIQUE gstin)
            "gstin": request.tenant_gstin or None,
            "address": request.tenant_address,
            "city": request.tenant_city,
            "state": request.tenant_state,
            "pincode": request.tenant_pincode,
            "phone": request.tenant_phone,
            "email": request.tenant_email,
        }
        
        tenant_id = AuthService.register_tenant(tenant_data)
        
        if not tenant_id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Failed to create tenant"
            )
        
        # Create admin user
        user_data = {
            "username": request.username,
            "email": request.tenant_email,
            "password": request.password,
            "full_name": request.full_name,
            "role": "ADMIN"
        }
        
        user_id = AuthService.create_user(tenant_id, user_data)
        
        if not user_id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Failed to create user"
            )
        
        # Auto-login after registration
        user = AuthService.authenticate_user(request.username, request.password, tenant_id)
        if not user:
            logger.error("Registration successful but auto-login failed")
            return {"message": "Registration successful", "tenant_id": tenant_id, "user_id": user_id}
        
        token_data = {
            "user_id": user['id'],
            "tenant_id": user['tenant_id'],
            "username": user['username'],
            "role": user['role']
        }
        token = AuthService.create_access_token(token_data)
        
        AuditService.log_action(
            user['tenant_id'],
            user['id'],
            "REGISTER",
            details="New tenant and admin user registered"
        )
        
        user.pop('password_hash', None)
        user_response = UserResponse.model_validate(user)
        logger.info(f"Successful registration for tenant: {request.tenant_name} (ID: {tenant_id})")
        return {
            "message": "Registration successful",
            "access_token": token,
            "token_type": "bearer",
            "user": user_response.model_dump()
        }
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Registration failed: {str(e)}"
        )

@router.get("/me", response_model=UserResponse)
async def get_current_user_info(user: Dict[str, Any] = Depends(get_current_user)):
    """Get current user information."""
    # Remove password hash if present
    user.pop('password_hash', None)
    return UserResponse.model_validate(user)

