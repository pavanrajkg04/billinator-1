"""Purchases API routes."""
from fastapi import APIRouter, HTTPException, status, Depends
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent.parent))
from services.purchase_service import PurchaseService
from api.dependencies import get_tenant_id, get_user_id

router = APIRouter()
purchase_service = PurchaseService()

class PurchaseItem(BaseModel):
    product_id: Optional[int] = None
    description: str
    quantity: float = 1.0
    unit_price: float = 0.0
    tax_rate: float = 0.0

class PurchaseInvoiceCreate(BaseModel):
    supplier_id: int
    invoice_date: str
    due_date: Optional[str] = None
    notes: Optional[str] = None
    items: List[PurchaseItem]


class PaymentCreate(BaseModel):
    amount: float
    payment_date: Optional[str] = None  # YYYY-MM-DD
    payment_mode: str = "CASH"
    reference_number: Optional[str] = None
    notes: Optional[str] = None

@router.get("/")
async def list_purchases(tenant_id: int = Depends(get_tenant_id)):
    """List all purchase invoices."""
    try:
        invoices = purchase_service.invoice_dao.get_all(tenant_id, order_by="invoice_date DESC, id DESC")
        # Join with suppliers to get supplier names
        for invoice in invoices:
            if invoice.get('supplier_id'):
                from database.connection import db_manager
                supplier = db_manager.fetch_one(
                    "SELECT name FROM suppliers WHERE id = ? AND tenant_id = ?",
                    (invoice['supplier_id'], tenant_id)
                )
                invoice['supplier_name'] = supplier[0] if supplier else None
        return {"invoices": invoices}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{invoice_id}")
async def get_purchase(invoice_id: int, tenant_id: int = Depends(get_tenant_id)):
    """Get a purchase invoice by ID."""
    try:
        invoice = purchase_service.invoice_dao.get_by_id(tenant_id, invoice_id)
        if not invoice:
            raise HTTPException(status_code=404, detail="Purchase invoice not found")
        # Get items
        items = purchase_service.item_dao.get_by_invoice_id(tenant_id, invoice_id)
        invoice['items'] = items
        # Get supplier name
        if invoice.get('supplier_id'):
            from database.connection import db_manager
            supplier = db_manager.fetch_one(
                "SELECT name FROM suppliers WHERE id = ? AND tenant_id = ?",
                (invoice['supplier_id'], tenant_id)
            )
            invoice['supplier_name'] = supplier[0] if supplier else None
        return {"invoice": invoice}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/")
async def create_purchase(
    invoice: PurchaseInvoiceCreate,
    tenant_id: int = Depends(get_tenant_id),
    user_id: int = Depends(get_user_id)
):
    """Create a new purchase invoice."""
    try:
        invoice_data = invoice.dict()
        # Convert items to proper format
        items = invoice_data.pop('items', [])
        invoice_data['items'] = []
        for item in items:
            item_data = item.copy()
            # Calculate line total
            line_total = float(item_data.get('quantity', 0)) * float(item_data.get('unit_price', 0))
            item_data['line_total'] = line_total
            invoice_data['items'].append(item_data)
        
        invoice_id = purchase_service.create_purchase_invoice(tenant_id, user_id, invoice_data)
        return {"invoice_id": invoice_id, "message": "Purchase invoice created successfully"}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{invoice_id}")
async def delete_purchase(
    invoice_id: int,
    tenant_id: int = Depends(get_tenant_id),
    user_id: int = Depends(get_user_id)
):
    """Delete a purchase invoice."""
    try:
        result = purchase_service.delete_purchase_invoice(tenant_id, user_id, invoice_id)
        if not result:
            raise HTTPException(status_code=404, detail="Purchase invoice not found")
        return {"message": "Purchase invoice deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/{invoice_id}/payments")
async def record_purchase_payment(
    invoice_id: int,
    payment: PaymentCreate,
    tenant_id: int = Depends(get_tenant_id),
    user_id: int = Depends(get_user_id),
):
    """Record a payment made for a purchase invoice (updates supplier outstanding)."""
    try:
        ok = purchase_service.record_payment(
            tenant_id,
            user_id,
            invoice_id,
            payment.amount,
            payment_date=payment.payment_date,
            payment_mode=payment.payment_mode,
            reference_number=payment.reference_number,
            notes=payment.notes,
        )
        if not ok:
            raise HTTPException(status_code=404, detail="Purchase invoice not found")
        invoice = purchase_service.invoice_dao.get_by_id(tenant_id, invoice_id)
        return {"message": "Payment recorded", "invoice": invoice}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
