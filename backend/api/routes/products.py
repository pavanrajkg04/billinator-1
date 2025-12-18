"""Products API routes."""
from fastapi import APIRouter, HTTPException, status, Depends
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
import sys
from pathlib import Path

# Add parent directory to path to import services
sys.path.insert(0, str(Path(__file__).parent.parent.parent))
from services.product_service import ProductService
from api.dependencies import get_tenant_id, get_user_id

router = APIRouter()
product_service = ProductService()

class ProductCreate(BaseModel):
    sku: str
    name: str
    description: Optional[str] = None
    hsn_code: Optional[str] = None
    unit: str
    sale_price: float
    purchase_price: Optional[float] = None
    tax_rate: float = 0.0
    category_id: Optional[int] = None
    # Column name in DB is `current_stock` (not `stock_quantity`)
    current_stock: float = 0.0
    reorder_level: Optional[float] = None

class ProductUpdate(BaseModel):
    sku: Optional[str] = None
    name: Optional[str] = None
    description: Optional[str] = None
    hsn_code: Optional[str] = None
    unit: Optional[str] = None
    sale_price: Optional[float] = None
    purchase_price: Optional[float] = None
    tax_rate: Optional[float] = None
    category_id: Optional[int] = None
    current_stock: Optional[float] = None
    reorder_level: Optional[float] = None

@router.get("/")
async def list_products(
    tenant_id: int = Depends(get_tenant_id),
    filters: Optional[Dict[str, Any]] = None
):
    """List all products."""
    try:
        products = product_service.list_products(tenant_id, filters)
        return {"products": products}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@router.get("/{product_id}")
async def get_product(
    product_id: int,
    tenant_id: int = Depends(get_tenant_id)
):
    """Get a product by ID."""
    try:
        product = product_service.get_product(tenant_id, product_id)
        if not product:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Product not found"
            )
        return {"product": product}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@router.post("/")
async def create_product(
    product: ProductCreate,
    tenant_id: int = Depends(get_tenant_id),
    user_id: int = Depends(get_user_id)
):
    """Create a new product."""
    try:
        # Pydantic v2
        product_data = product.model_dump()
        product_id = product_service.create_product(tenant_id, user_id, product_data)
        return {"product_id": product_id, "message": "Product created successfully"}
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@router.put("/{product_id}")
async def update_product(
    product_id: int,
    product: ProductUpdate,
    tenant_id: int = Depends(get_tenant_id),
    user_id: int = Depends(get_user_id)
):
    """Update a product."""
    try:
        product_data = product.model_dump(exclude_none=True)
        result = product_service.update_product(tenant_id, user_id, product_id, product_data)
        if not result:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Product not found"
            )
        return {"message": "Product updated successfully"}
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@router.delete("/{product_id}")
async def delete_product(
    product_id: int,
    tenant_id: int = Depends(get_tenant_id),
    user_id: int = Depends(get_user_id)
):
    """Delete a product."""
    try:
        result = product_service.delete_product(tenant_id, user_id, product_id)
        if not result:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Product not found"
            )
        return {"message": "Product deleted successfully"}
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

