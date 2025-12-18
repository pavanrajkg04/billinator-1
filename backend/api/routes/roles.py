"""Roles API routes."""

from fastapi import APIRouter, HTTPException, status, Depends
from pydantic import BaseModel, Field
from typing import Optional
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent.parent))
from database.connection import db_manager
from api.dependencies import get_tenant_id, get_user_id
from services.audit_service import AuditService

router = APIRouter()


class RoleCreate(BaseModel):
    code: str = Field(..., min_length=2, max_length=50, description="Role code, e.g. SALES_MANAGER")
    name: str = Field(..., min_length=2, max_length=100, description="Display name")
    description: Optional[str] = Field(None, max_length=500)
    is_active: bool = True


class RoleUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=2, max_length=100)
    description: Optional[str] = Field(None, max_length=500)
    is_active: Optional[bool] = None


@router.get("/")
async def list_roles(tenant_id: int = Depends(get_tenant_id)):
    """List roles for the tenant."""
    try:
        query = """
            SELECT id, code, name, description, is_active, created_at
            FROM roles
            WHERE tenant_id = ?
            ORDER BY code ASC
        """
        conn = db_manager.get_connection()
        cursor = conn.execute(query, (tenant_id,))
        rows = cursor.fetchall()
        roles = []
        if rows:
            cols = [d[0] for d in cursor.description]
            roles = [dict(zip(cols, r)) for r in rows]
        return {"roles": roles}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/")
async def create_role(
    role: RoleCreate,
    tenant_id: int = Depends(get_tenant_id),
    user_id: int = Depends(get_user_id),
):
    """Create a role for the tenant."""
    try:
        code = role.code.strip().upper().replace(" ", "_")
        if not code.replace("_", "").isalnum():
            raise HTTPException(status_code=400, detail="Role code must be alphanumeric (underscores allowed)")

        max_id = db_manager.fetch_one("SELECT COALESCE(MAX(id), 0) FROM roles")
        next_id = (max_id[0] if max_id else 0) + 1

        db_manager.execute(
            """
            INSERT INTO roles (id, tenant_id, code, name, description, is_active)
            VALUES (?, ?, ?, ?, ?, ?)
            """,
            (next_id, tenant_id, code, role.name.strip(), role.description, role.is_active),
        )
        db_manager.commit()

        AuditService.log_action(
            tenant_id,
            user_id,
            "CREATE_ROLE",
            entity_type="roles",
            entity_id=next_id,
            details=f"Created role: {code}",
        )

        return {"role_id": next_id, "message": "Role created successfully"}
    except HTTPException:
        raise
    except Exception as e:
        msg = str(e)
        if "unique" in msg.lower() or "duplicate" in msg.lower() or "constraint" in msg.lower():
            raise HTTPException(status_code=400, detail="Role code already exists")
        raise HTTPException(status_code=500, detail=str(e))


@router.put("/{role_id}")
async def update_role(
    role_id: int,
    role: RoleUpdate,
    tenant_id: int = Depends(get_tenant_id),
    user_id: int = Depends(get_user_id),
):
    """Update a role."""
    try:
        existing = db_manager.fetch_one(
            "SELECT code FROM roles WHERE id = ? AND tenant_id = ?",
            (role_id, tenant_id),
        )
        if not existing:
            raise HTTPException(status_code=404, detail="Role not found")

        updates = role.model_dump(exclude_none=True)
        if not updates:
            return {"message": "No changes"}

        set_clause = ", ".join([f"{k} = ?" for k in updates.keys()])
        values = list(updates.values()) + [role_id, tenant_id]
        db_manager.execute(f"UPDATE roles SET {set_clause} WHERE id = ? AND tenant_id = ?", tuple(values))
        db_manager.commit()

        AuditService.log_action(
            tenant_id,
            user_id,
            "UPDATE_ROLE",
            entity_type="roles",
            entity_id=role_id,
            details="Updated role",
        )

        return {"message": "Role updated successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/{role_id}")
async def delete_role(
    role_id: int,
    tenant_id: int = Depends(get_tenant_id),
    user_id: int = Depends(get_user_id),
):
    """Delete a role (blocked if assigned to users)."""
    try:
        role_row = db_manager.fetch_one(
            "SELECT code FROM roles WHERE id = ? AND tenant_id = ?",
            (role_id, tenant_id),
        )
        if not role_row:
            raise HTTPException(status_code=404, detail="Role not found")

        role_code = role_row[0]
        usage = db_manager.fetch_one(
            "SELECT COUNT(*) FROM users WHERE tenant_id = ? AND role = ?",
            (tenant_id, role_code),
        )
        if usage and usage[0] > 0:
            raise HTTPException(status_code=400, detail="Role is assigned to users; reassign users before deleting")

        db_manager.execute("DELETE FROM roles WHERE id = ? AND tenant_id = ?", (role_id, tenant_id))
        db_manager.commit()

        AuditService.log_action(
            tenant_id,
            user_id,
            "DELETE_ROLE",
            entity_type="roles",
            entity_id=role_id,
            details=f"Deleted role: {role_code}",
        )

        return {"message": "Role deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


