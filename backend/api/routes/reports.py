"""Reports API routes."""
from fastapi import APIRouter, HTTPException, status, Depends
from pydantic import BaseModel
from typing import Optional
from datetime import datetime
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent.parent))
from database.connection import db_manager
from api.dependencies import get_tenant_id

router = APIRouter()

class ReportRequest(BaseModel):
    report_type: str
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    customer_id: Optional[int] = None
    supplier_id: Optional[int] = None

@router.get("/")
async def list_reports(tenant_id: int = Depends(get_tenant_id)):
    """List available reports."""
    return {
        "reports": [
            {"id": "sales", "name": "Sales Report", "description": "View sales by date range, customer, product"},
            {"id": "purchase", "name": "Purchase Report", "description": "View purchases by date range, supplier"},
            {"id": "gst", "name": "GST Report", "description": "View GST collected and paid"},
            {"id": "stock", "name": "Stock Report", "description": "View stock levels and movements"},
            {"id": "profit_loss", "name": "Profit & Loss", "description": "View profit and loss statement"},
            {"id": "customer", "name": "Customer Report", "description": "View customer-wise sales and outstanding"}
        ]
    }

@router.post("/generate")
async def generate_report(
    request: ReportRequest,
    tenant_id: int = Depends(get_tenant_id)
):
    """Generate a report."""
    try:
        if request.report_type == "sales":
            query = """
                SELECT si.*, c.name as customer_name
                FROM sales_invoices si
                LEFT JOIN customers c ON si.customer_id = c.id
                WHERE si.tenant_id = ?
            """
            params = [tenant_id]
            
            if request.start_date:
                query += " AND si.invoice_date >= ?"
                params.append(request.start_date)
            if request.end_date:
                query += " AND si.invoice_date <= ?"
                params.append(request.end_date)
            if request.customer_id:
                query += " AND si.customer_id = ?"
                params.append(request.customer_id)
            
            query += " ORDER BY si.invoice_date DESC"
            
            conn = db_manager.get_connection()
            cursor = conn.execute(query, tuple(params))
            results = cursor.fetchall()
            invoices = []
            if results:
                columns = [desc[0] for desc in cursor.description]
                invoices = [dict(zip(columns, row)) for row in results]
            
            total_sales = sum(float(inv.get('total_amount', 0)) for inv in invoices)
            total_tax = sum(
                float(inv.get('cgst_amount', 0)) + 
                float(inv.get('sgst_amount', 0)) + 
                float(inv.get('igst_amount', 0))
                for inv in invoices
            )
            
            return {
                "report_type": "sales",
                "data": invoices,
                "summary": {
                    "total_invoices": len(invoices),
                    "total_sales": total_sales,
                    "total_tax": total_tax,
                }
            }
        
        elif request.report_type == "purchase":
            query = """
                SELECT pi.*, s.name as supplier_name
                FROM purchase_invoices pi
                LEFT JOIN suppliers s ON pi.supplier_id = s.id
                WHERE pi.tenant_id = ?
            """
            params = [tenant_id]
            
            if request.start_date:
                query += " AND pi.invoice_date >= ?"
                params.append(request.start_date)
            if request.end_date:
                query += " AND pi.invoice_date <= ?"
                params.append(request.end_date)
            if request.supplier_id:
                query += " AND pi.supplier_id = ?"
                params.append(request.supplier_id)
            
            query += " ORDER BY pi.invoice_date DESC"
            
            conn = db_manager.get_connection()
            cursor = conn.execute(query, tuple(params))
            results = cursor.fetchall()
            invoices = []
            if results:
                columns = [desc[0] for desc in cursor.description]
                invoices = [dict(zip(columns, row)) for row in results]
            
            total_purchases = sum(float(inv.get('total_amount', 0)) for inv in invoices)
            
            return {
                "report_type": "purchase",
                "data": invoices,
                "summary": {
                    "total_invoices": len(invoices),
                    "total_purchases": total_purchases,
                }
            }
        
        elif request.report_type == "gst":
            # GST Report - combine sales and purchases
            sales_query = """
                SELECT 
                    'SALES' as type,
                    invoice_date,
                    invoice_number,
                    cgst_amount + sgst_amount + igst_amount as tax_amount,
                    total_amount
                FROM sales_invoices
                WHERE tenant_id = ?
            """
            params = [tenant_id]
            
            if request.start_date:
                sales_query += " AND invoice_date >= ?"
                params.append(request.start_date)
            if request.end_date:
                sales_query += " AND invoice_date <= ?"
                params.append(request.end_date)
            
            purchase_query = """
                SELECT 
                    'PURCHASE' as type,
                    invoice_date,
                    invoice_number,
                    cgst_amount + sgst_amount + igst_amount as tax_amount,
                    total_amount
                FROM purchase_invoices
                WHERE tenant_id = ?
            """
            purchase_params = [tenant_id]
            
            if request.start_date:
                purchase_query += " AND invoice_date >= ?"
                purchase_params.append(request.start_date)
            if request.end_date:
                purchase_query += " AND invoice_date <= ?"
                purchase_params.append(request.end_date)
            
            conn = db_manager.get_connection()
            sales_cursor = conn.execute(sales_query, tuple(params))
            purchase_cursor = conn.execute(purchase_query, tuple(purchase_params))
            
            sales_results = sales_cursor.fetchall()
            purchase_results = purchase_cursor.fetchall()
            
            gst_data = []
            if sales_results:
                columns = [desc[0] for desc in sales_cursor.description]
                gst_data.extend([dict(zip(columns, row)) for row in sales_results])
            if purchase_results:
                columns = [desc[0] for desc in purchase_cursor.description]
                gst_data.extend([dict(zip(columns, row)) for row in purchase_results])
            
            total_collected = sum(float(item.get('tax_amount', 0)) for item in gst_data if item.get('type') == 'SALES')
            total_paid = sum(float(item.get('tax_amount', 0)) for item in gst_data if item.get('type') == 'PURCHASE')
            
            return {
                "report_type": "gst",
                "data": gst_data,
                "summary": {
                    "total_gst_collected": total_collected,
                    "total_gst_paid": total_paid,
                    "net_gst": total_collected - total_paid,
                }
            }
        
        elif request.report_type == "stock":
            query = """
                SELECT id, sku, name, current_stock, reorder_level, unit, sale_price
                FROM products
                WHERE tenant_id = ? AND is_active = TRUE
                ORDER BY name ASC
            """
            conn = db_manager.get_connection()
            cursor = conn.execute(query, (tenant_id,))
            results = cursor.fetchall()
            products = []
            if results:
                columns = [desc[0] for desc in cursor.description]
                products = [dict(zip(columns, row)) for row in results]
            
            low_stock = [p for p in products if p.get('current_stock', 0) <= p.get('reorder_level', 0) and p.get('reorder_level', 0) > 0]
            total_value = sum(float(p.get('current_stock', 0)) * float(p.get('sale_price', 0)) for p in products)
            
            return {
                "report_type": "stock",
                "data": products,
                "summary": {
                    "total_products": len(products),
                    "low_stock_count": len(low_stock),
                    "total_stock_value": total_value,
                }
            }
        
        elif request.report_type == "customer":
            query = """
                SELECT 
                    c.id,
                    c.name,
                    c.gstin,
                    COUNT(DISTINCT si.id) as total_invoices,
                    COALESCE(SUM(si.total_amount), 0) as total_sales,
                    c.outstanding_balance
                FROM customers c
                LEFT JOIN sales_invoices si ON c.id = si.customer_id AND si.tenant_id = ?
                WHERE c.tenant_id = ? AND c.is_active = TRUE
                GROUP BY c.id, c.name, c.gstin, c.outstanding_balance
                ORDER BY total_sales DESC
            """
            conn = db_manager.get_connection()
            cursor = conn.execute(query, (tenant_id, tenant_id))
            results = cursor.fetchall()
            customers = []
            if results:
                columns = [desc[0] for desc in cursor.description]
                customers = [dict(zip(columns, row)) for row in results]
            
            return {
                "report_type": "customer",
                "data": customers,
                "summary": {
                    "total_customers": len(customers),
                    "total_sales": sum(float(c.get('total_sales', 0)) for c in customers),
                    "total_outstanding": sum(float(c.get('outstanding_balance', 0)) for c in customers),
                }
            }
        
        elif request.report_type == "profit_loss":
            # Simple P&L - Sales - Purchases
            sales_query = """
                SELECT COALESCE(SUM(total_amount), 0) as total
                FROM sales_invoices
                WHERE tenant_id = ?
            """
            if request.start_date:
                sales_query += " AND invoice_date >= ?"
            if request.end_date:
                sales_query += " AND invoice_date <= ?"
            
            purchase_query = """
                SELECT COALESCE(SUM(total_amount), 0) as total
                FROM purchase_invoices
                WHERE tenant_id = ?
            """
            if request.start_date:
                purchase_query += " AND invoice_date >= ?"
            if request.end_date:
                purchase_query += " AND invoice_date <= ?"
            
            sales_params = [tenant_id]
            purchase_params = [tenant_id]
            if request.start_date:
                sales_params.append(request.start_date)
                purchase_params.append(request.start_date)
            if request.end_date:
                sales_params.append(request.end_date)
                purchase_params.append(request.end_date)
            
            sales_result = db_manager.fetch_one(sales_query, tuple(sales_params))
            purchase_result = db_manager.fetch_one(purchase_query, tuple(purchase_params))
            
            total_sales = float(sales_result[0]) if sales_result else 0.0
            total_purchases = float(purchase_result[0]) if purchase_result else 0.0
            profit = total_sales - total_purchases
            
            return {
                "report_type": "profit_loss",
                "data": {
                    "total_sales": total_sales,
                    "total_purchases": total_purchases,
                    "gross_profit": profit,
                    "profit_margin": (profit / total_sales * 100) if total_sales > 0 else 0,
                }
            }
        
        else:
            raise HTTPException(status_code=400, detail="Invalid report type")
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
