"""Quotes API routes."""
from fastapi import APIRouter, HTTPException, status, Depends
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent.parent))
from services.quote_service import QuoteService
from api.dependencies import get_tenant_id, get_user_id

router = APIRouter()
quote_service = QuoteService()

class QuoteItem(BaseModel):
    product_id: Optional[int] = None
    description: str
    quantity: float = 1.0
    unit_price: float = 0.0
    tax_rate: float = 0.0
    line_total: float = 0.0

class QuoteCreate(BaseModel):
    customer_id: Optional[int] = None
    opportunity_id: Optional[int] = None
    quote_number: Optional[str] = None
    quote_date: str
    valid_until: Optional[str] = None
    notes: Optional[str] = None
    terms: Optional[str] = None
    items: List[QuoteItem]

class QuoteUpdate(BaseModel):
    customer_id: Optional[int] = None
    opportunity_id: Optional[int] = None
    quote_date: Optional[str] = None
    valid_until: Optional[str] = None
    status: Optional[str] = None
    notes: Optional[str] = None
    terms: Optional[str] = None
    items: Optional[List[QuoteItem]] = None

@router.get("/")
async def list_quotes(
    customer_id: Optional[int] = None,
    status: Optional[str] = None,
    tenant_id: int = Depends(get_tenant_id)
):
    """List all quotes."""
    try:
        filters = {}
        if customer_id:
            filters['customer_id'] = customer_id
        if status:
            filters['status'] = status
        
        quotes = quote_service.list_quotes(tenant_id, filters)
        return {"quotes": quotes}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{quote_id}")
async def get_quote(
    quote_id: int,
    tenant_id: int = Depends(get_tenant_id)
):
    """Get a quote by ID."""
    try:
        quote = quote_service.get_quote(tenant_id, quote_id)
        if not quote:
            raise HTTPException(status_code=404, detail="Quote not found")
        return {"quote": quote}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/")
async def create_quote(
    quote: QuoteCreate,
    tenant_id: int = Depends(get_tenant_id),
    user_id: int = Depends(get_user_id)
):
    """Create a new quote."""
    try:
        quote_data = quote.dict()
        quote_id = quote_service.create_quote(tenant_id, user_id, quote_data)
        return {"quote_id": quote_id, "message": "Quote created successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{quote_id}")
async def update_quote(
    quote_id: int,
    quote: QuoteUpdate,
    tenant_id: int = Depends(get_tenant_id),
    user_id: int = Depends(get_user_id)
):
    """Update a quote."""
    try:
        quote_data = {k: v for k, v in quote.dict(exclude_unset=True).items() if v is not None}
        result = quote_service.update_quote(tenant_id, user_id, quote_id, quote_data)
        if not result:
            raise HTTPException(status_code=404, detail="Quote not found")
        return {"message": "Quote updated successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{quote_id}")
async def delete_quote(
    quote_id: int,
    tenant_id: int = Depends(get_tenant_id),
    user_id: int = Depends(get_user_id)
):
    """Delete a quote."""
    try:
        result = quote_service.delete_quote(tenant_id, user_id, quote_id)
        if not result:
            raise HTTPException(status_code=404, detail="Quote not found")
        return {"message": "Quote deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/{quote_id}/convert")
async def convert_quote_to_invoice(
    quote_id: int,
    tenant_id: int = Depends(get_tenant_id),
    user_id: int = Depends(get_user_id)
):
    """Convert a quote to an invoice."""
    try:
        invoice_id = quote_service.convert_to_invoice(tenant_id, user_id, quote_id)
        if not invoice_id:
            raise HTTPException(status_code=400, detail="Cannot convert quote to invoice")
        return {"invoice_id": invoice_id, "message": "Quote converted to invoice successfully"}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

