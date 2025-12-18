"""Users API routes."""
from fastapi import APIRouter, HTTPException, status, Depends
from pydantic import BaseModel, Field, EmailStr
from typing import Optional
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent.parent))
from database.connection import db_manager
from api.dependencies import get_tenant_id, get_user_id
from services.auth_service import AuthService
from services.audit_service import AuditService

router = APIRouter()

class UserCreate(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    email: EmailStr
    password: str = Field(..., min_length=6, max_length=100)
    full_name: Optional[str] = Field(None, max_length=200)
    role: str = Field("BILLING", min_length=2, max_length=50)

class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    full_name: Optional[str] = Field(None, max_length=200)
    role: Optional[str] = Field(None, min_length=2, max_length=50)
    is_active: Optional[bool] = None

@router.get("/")
async def list_users(tenant_id: int = Depends(get_tenant_id)):
    """List all users for the tenant."""
    try:
        query = """
            SELECT id, username, email, full_name, role, is_active, created_at
            FROM users
            WHERE tenant_id = ?
            ORDER BY created_at DESC
        """
        conn = db_manager.get_connection()
        cursor = conn.execute(query, (tenant_id,))
        results = cursor.fetchall()
        users = []
        if results:
            columns = [desc[0] for desc in cursor.description]
            users = [dict(zip(columns, row)) for row in results]
        return {"users": users}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/")
async def create_user(
    user: UserCreate,
    tenant_id: int = Depends(get_tenant_id),
    current_user_id: int = Depends(get_user_id),
):
    """Create a new user for the tenant."""
    try:
        # If roles table exists and has roles, validate role exists for tenant
        try:
            role_code = user.role.strip().upper()
            role_count = db_manager.fetch_one(
                "SELECT COUNT(*) FROM roles WHERE tenant_id = ? AND code = ? AND is_active = TRUE",
                (tenant_id, role_code),
            )
            if role_count and role_count[0] == 0:
                raise HTTPException(status_code=400, detail="Invalid role. Create the role first or choose an existing one.")
        except Exception:
            role_code = user.role.strip().upper()

        user_data = {
            "username": user.username.strip(),
            "email": str(user.email).strip(),
            "password": user.password,
            "full_name": (user.full_name or "").strip(),
            "role": role_code,
        }
        new_user_id = AuthService.create_user(tenant_id, user_data)

        AuditService.log_action(
            tenant_id,
            current_user_id,
            "CREATE_USER",
            entity_type="users",
            entity_id=new_user_id,
            details=f"Created user: {user_data['username']} ({role_code})",
        )

        return {"user_id": new_user_id, "message": "User created successfully"}
    except HTTPException:
        raise
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        msg = str(e)
        if "unique" in msg.lower() or "duplicate" in msg.lower() or "constraint" in msg.lower():
            raise HTTPException(status_code=400, detail="Username or email already exists")
        raise HTTPException(status_code=500, detail=str(e))


@router.put("/{user_id}")
async def update_user(
    user_id: int,
    user: UserUpdate,
    tenant_id: int = Depends(get_tenant_id),
    current_user_id: int = Depends(get_user_id),
):
    """Update a user (role, name, email, status)."""
    try:
        existing = db_manager.fetch_one(
            "SELECT id FROM users WHERE id = ? AND tenant_id = ?",
            (user_id, tenant_id),
        )
        if not existing:
            raise HTTPException(status_code=404, detail="User not found")

        updates = user.model_dump(exclude_none=True)
        if "role" in updates and updates["role"] is not None:
            updates["role"] = updates["role"].strip().upper()

        if not updates:
            return {"message": "No changes"}

        set_clause = ", ".join([f"{k} = ?" for k in updates.keys()])
        values = list(updates.values()) + [user_id, tenant_id]
        db_manager.execute(f"UPDATE users SET {set_clause} WHERE id = ? AND tenant_id = ?", tuple(values))
        db_manager.commit()

        AuditService.log_action(
            tenant_id,
            current_user_id,
            "UPDATE_USER",
            entity_type="users",
            entity_id=user_id,
            details="Updated user",
        )

        return {"message": "User updated successfully"}
    except HTTPException:
        raise
    except Exception as e:
        msg = str(e)
        if "unique" in msg.lower() or "duplicate" in msg.lower() or "constraint" in msg.lower():
            raise HTTPException(status_code=400, detail="Username or email already exists")
        raise HTTPException(status_code=500, detail=str(e))

