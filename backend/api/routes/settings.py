"""Settings API routes."""
from fastapi import APIRouter, HTTPException, status, Depends
from pydantic import BaseModel
from typing import Optional
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent.parent))
from database.connection import db_manager
from api.dependencies import get_tenant_id

router = APIRouter()

class SettingsUpdate(BaseModel):
    sales_invoice_prefix: Optional[str] = None
    sales_invoice_start_number: Optional[int] = None
    purchase_invoice_prefix: Optional[str] = None
    purchase_invoice_start_number: Optional[int] = None
    terms_conditions: Optional[str] = None
    footer_text: Optional[str] = None

@router.get("/")
async def get_settings(tenant_id: int = Depends(get_tenant_id)):
    """Get invoice settings for the tenant."""
    try:
        query = """
            SELECT sales_invoice_prefix, sales_invoice_start_number,
                   purchase_invoice_prefix, purchase_invoice_start_number,
                   terms_conditions, footer_text
            FROM invoice_settings
            WHERE tenant_id = ?
        """
        result = db_manager.fetch_one(query, (tenant_id,))
        if result:
            return {
                "sales_invoice_prefix": result[0] or "INV",
                "sales_invoice_start_number": result[1] or 1,
                "purchase_invoice_prefix": result[2] or "PINV",
                "purchase_invoice_start_number": result[3] or 1,
                "terms_conditions": result[4] or "",
                "footer_text": result[5] or ""
            }
        return {
            "sales_invoice_prefix": "INV",
            "sales_invoice_start_number": 1,
            "purchase_invoice_prefix": "PINV",
            "purchase_invoice_start_number": 1,
            "terms_conditions": "",
            "footer_text": ""
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/")
async def update_settings(
    settings: SettingsUpdate,
    tenant_id: int = Depends(get_tenant_id)
):
    """Update invoice settings for the tenant."""
    try:
        # Check if settings exist
        existing = db_manager.fetch_one(
            "SELECT id FROM invoice_settings WHERE tenant_id = ?",
            (tenant_id,)
        )
        
        settings_data = {k: v for k, v in settings.dict(exclude_unset=True).items() if v is not None}
        
        if existing:
            # Update existing
            set_clause = ', '.join([f"{key} = ?" for key in settings_data.keys()])
            values = list(settings_data.values())
            values.append(tenant_id)
            query = f"UPDATE invoice_settings SET {set_clause} WHERE tenant_id = ?"
            db_manager.execute(query, tuple(values))
        else:
            # Create new
            settings_data['tenant_id'] = tenant_id
            max_id = db_manager.fetch_one("SELECT COALESCE(MAX(id), 0) FROM invoice_settings")
            next_id = (max_id[0] if max_id else 0) + 1
            settings_data['id'] = next_id
            
            columns = ', '.join(settings_data.keys())
            placeholders = ', '.join(['?' for _ in settings_data])
            query = f"INSERT INTO invoice_settings ({columns}) VALUES ({placeholders})"
            db_manager.execute(query, tuple(settings_data.values()))
        
        db_manager.commit()
        return {"message": "Settings updated successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

