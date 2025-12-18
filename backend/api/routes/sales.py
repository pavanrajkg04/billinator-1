"""Sales API routes."""
from fastapi import APIRouter, HTTPException, status, Depends
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent.parent))
from services.sales_service import SalesService
from api.dependencies import get_tenant_id, get_user_id

router = APIRouter()
sales_service = SalesService()

class SalesItem(BaseModel):
    # DB schema requires product_id NOT NULL
    product_id: int
    description: str
    quantity: float = 1.0
    unit_price: float = 0.0
    tax_rate: float = 0.0

class SalesInvoiceCreate(BaseModel):
    customer_id: Optional[int] = None
    invoice_type: str = "B2B"  # B2B, B2C, BILL_OF_SUPPLY
    invoice_date: str
    due_date: Optional[str] = None
    place_of_supply: Optional[str] = None
    paid_amount: float = 0.0
    notes: Optional[str] = None
    items: List[SalesItem]


class PaymentCreate(BaseModel):
    amount: float
    payment_date: Optional[str] = None  # YYYY-MM-DD
    payment_mode: str = "CASH"
    reference_number: Optional[str] = None
    notes: Optional[str] = None

@router.get("/")
async def list_sales(tenant_id: int = Depends(get_tenant_id)):
    """List all sales invoices."""
    try:
        invoices = sales_service.invoice_dao.get_all(tenant_id, order_by="invoice_date DESC, id DESC")
        # Join with customers to get customer names
        for invoice in invoices:
            if invoice.get('customer_id'):
                from database.connection import db_manager
                customer = db_manager.fetch_one(
                    "SELECT name FROM customers WHERE id = ? AND tenant_id = ?",
                    (invoice['customer_id'], tenant_id)
                )
                invoice['customer_name'] = customer[0] if customer else None
        return {"invoices": invoices}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{invoice_id}")
async def get_sale(invoice_id: int, tenant_id: int = Depends(get_tenant_id)):
    """Get a sales invoice by ID."""
    try:
        invoice = sales_service.invoice_dao.get_by_id(tenant_id, invoice_id)
        if not invoice:
            raise HTTPException(status_code=404, detail="Sales invoice not found")
        # Get items
        items = sales_service.item_dao.get_by_invoice_id(tenant_id, invoice_id)
        invoice['items'] = items
        # Get customer name
        if invoice.get('customer_id'):
            from database.connection import db_manager
            customer = db_manager.fetch_one(
                "SELECT name FROM customers WHERE id = ? AND tenant_id = ?",
                (invoice['customer_id'], tenant_id)
            )
            invoice['customer_name'] = customer[0] if customer else None
        return {"invoice": invoice}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/")
async def create_sale(
    invoice: SalesInvoiceCreate,
    tenant_id: int = Depends(get_tenant_id),
    user_id: int = Depends(get_user_id)
):
    """Create a new sales invoice."""
    try:
        # Pydantic v2
        invoice_data = invoice.model_dump()

        # Normalize optional date/string fields (DuckDB DATE columns cannot accept "")
        if invoice_data.get("due_date") in ("", None):
            invoice_data["due_date"] = None
        if invoice_data.get("place_of_supply") == "":
            invoice_data["place_of_supply"] = None
        if invoice_data.get("notes") == "":
            invoice_data["notes"] = None

        # Convert items to proper format
        items = invoice_data.pop('items', [])
        invoice_data['items'] = []
        for item in items:
            item_data = item.copy()
            # Calculate line total
            line_total = float(item_data.get('quantity', 0)) * float(item_data.get('unit_price', 0))
            item_data['line_total'] = line_total
            invoice_data['items'].append(item_data)
        
        invoice_id = sales_service.create_sales_invoice(tenant_id, user_id, invoice_data)
        if not invoice_id:
            raise HTTPException(status_code=500, detail="Failed to create sales invoice")
        return {"invoice_id": invoice_id, "message": "Sales invoice created successfully"}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{invoice_id}")
async def delete_sale(
    invoice_id: int,
    tenant_id: int = Depends(get_tenant_id),
    user_id: int = Depends(get_user_id)
):
    """Delete a sales invoice."""
    try:
        result = sales_service.delete_sales_invoice(tenant_id, user_id, invoice_id)
        if not result:
            raise HTTPException(status_code=404, detail="Sales invoice not found")
        return {"message": "Sales invoice deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/{invoice_id}/payments")
async def record_sales_payment(
    invoice_id: int,
    payment: PaymentCreate,
    tenant_id: int = Depends(get_tenant_id),
    user_id: int = Depends(get_user_id),
):
    """Record a payment received for a sales invoice (updates customer outstanding)."""
    try:
        ok = sales_service.record_payment(
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
            raise HTTPException(status_code=404, detail="Sales invoice not found")
        invoice = sales_service.invoice_dao.get_by_id(tenant_id, invoice_id)
        return {"message": "Payment recorded", "invoice": invoice}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
