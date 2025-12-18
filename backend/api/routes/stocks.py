"""Stocks API routes."""
from fastapi import APIRouter, HTTPException, status, Depends
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent.parent))
from services.product_service import ProductService
from api.dependencies import get_tenant_id

router = APIRouter()
product_service = ProductService()

@router.get("/")
async def list_stocks(tenant_id: int = Depends(get_tenant_id)):
    """List all products with stock information."""
    try:
        products = product_service.list_products(tenant_id)
        stocks = [{
            'id': p['id'],
            'sku': p['sku'],
            'name': p['name'],
            'current_stock': p.get('current_stock', 0),
            'reorder_level': p.get('reorder_level', 0),
            'unit': p.get('unit', 'PCS')
        } for p in products]
        return {"stocks": stocks}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

