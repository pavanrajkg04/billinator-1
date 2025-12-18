"""Dashboard service for aggregating statistics and data."""
from typing import Dict, Any, List
from database.connection import db_manager
from datetime import datetime, timedelta
from decimal import Decimal


class DashboardService:
    """Service for dashboard statistics and data."""
    
    @staticmethod
    def get_dashboard_stats(tenant_id: int) -> Dict[str, Any]:
        """Get all dashboard statistics for a tenant - optimized with fewer queries."""
        # Use a single query to get all basic counts
        counts_query = """
            SELECT 
                (SELECT COUNT(*) FROM customers WHERE tenant_id = ? AND is_active = TRUE) as total_customers,
                (SELECT COUNT(*) FROM suppliers WHERE tenant_id = ? AND is_active = TRUE) as total_suppliers,
                (SELECT COUNT(*) FROM products WHERE tenant_id = ? AND is_active = TRUE) as total_products,
                (SELECT COUNT(*) FROM products WHERE tenant_id = ? AND is_active = TRUE 
                 AND current_stock <= reorder_level AND reorder_level > 0) as low_stock_count
        """
        counts_result = db_manager.fetch_one(counts_query, (tenant_id, tenant_id, tenant_id, tenant_id))
        
        # Get sales and purchases stats in one query
        sales_purchases_query = """
            SELECT 
                (SELECT COALESCE(SUM(total_amount), 0) FROM sales_invoices WHERE tenant_id = ?) as total_sales,
                (SELECT COALESCE(SUM(total_amount), 0) FROM purchase_invoices WHERE tenant_id = ?) as total_purchases,
                (SELECT COALESCE(SUM(total_amount - paid_amount), 0) FROM sales_invoices 
                 WHERE tenant_id = ? AND status != 'PAID') as outstanding_receivables,
                (SELECT COALESCE(SUM(total_amount - paid_amount), 0) FROM purchase_invoices 
                 WHERE tenant_id = ? AND status != 'PAID') as outstanding_payables
        """
        sales_purchases_result = db_manager.fetch_one(sales_purchases_query, (tenant_id, tenant_id, tenant_id, tenant_id))
        
        # Get recent sales, purchases, and low stock items (these need separate queries due to JOINs)
        recent_sales = DashboardService._get_recent_sales(tenant_id, limit=5)
        recent_purchases = DashboardService._get_recent_purchases(tenant_id, limit=5)
        low_stock_items = DashboardService._get_low_stock_items(tenant_id, limit=5)
        
        stats = {
            "total_sales": float(sales_purchases_result[0]) if sales_purchases_result and sales_purchases_result[0] else 0.0,
            "total_purchases": float(sales_purchases_result[1]) if sales_purchases_result and sales_purchases_result[1] else 0.0,
            "outstanding_receivables": float(sales_purchases_result[2]) if sales_purchases_result and sales_purchases_result[2] else 0.0,
            "outstanding_payables": float(sales_purchases_result[3]) if sales_purchases_result and sales_purchases_result[3] else 0.0,
            "low_stock_count": counts_result[3] if counts_result and counts_result[3] else 0,
            "total_customers": counts_result[0] if counts_result and counts_result[0] else 0,
            "total_suppliers": counts_result[1] if counts_result and counts_result[1] else 0,
            "total_products": counts_result[2] if counts_result and counts_result[2] else 0,
            "recent_sales": recent_sales,
            "recent_purchases": recent_purchases,
            "low_stock_items": low_stock_items,
        }
        return stats
    
    @staticmethod
    def _get_total_sales(tenant_id: int) -> float:
        """Get total sales amount."""
        result = db_manager.fetch_one(
            "SELECT COALESCE(SUM(total_amount), 0) FROM sales_invoices WHERE tenant_id = ?",
            (tenant_id,)
        )
        return float(result[0]) if result and result[0] else 0.0
    
    @staticmethod
    def _get_total_purchases(tenant_id: int) -> float:
        """Get total purchases amount."""
        result = db_manager.fetch_one(
            "SELECT COALESCE(SUM(total_amount), 0) FROM purchase_invoices WHERE tenant_id = ?",
            (tenant_id,)
        )
        return float(result[0]) if result and result[0] else 0.0
    
    @staticmethod
    def _get_outstanding_receivables(tenant_id: int) -> float:
        """Get total outstanding receivables from customers."""
        result = db_manager.fetch_one(
            """
            SELECT COALESCE(SUM(total_amount - paid_amount), 0) 
            FROM sales_invoices 
            WHERE tenant_id = ? AND status != 'PAID'
            """,
            (tenant_id,)
        )
        return float(result[0]) if result and result[0] else 0.0
    
    @staticmethod
    def _get_outstanding_payables(tenant_id: int) -> float:
        """Get total outstanding payables to suppliers."""
        result = db_manager.fetch_one(
            """
            SELECT COALESCE(SUM(total_amount - paid_amount), 0) 
            FROM purchase_invoices 
            WHERE tenant_id = ? AND status != 'PAID'
            """,
            (tenant_id,)
        )
        return float(result[0]) if result and result[0] else 0.0
    
    @staticmethod
    def _get_low_stock_count(tenant_id: int) -> int:
        """Get count of products with low stock."""
        result = db_manager.fetch_one(
            """
            SELECT COUNT(*) 
            FROM products 
            WHERE tenant_id = ? AND is_active = TRUE 
            AND current_stock <= reorder_level AND reorder_level > 0
            """,
            (tenant_id,)
        )
        return result[0] if result else 0
    
    @staticmethod
    def _get_total_customers(tenant_id: int) -> int:
        """Get total active customers."""
        result = db_manager.fetch_one(
            "SELECT COUNT(*) FROM customers WHERE tenant_id = ? AND is_active = TRUE",
            (tenant_id,)
        )
        return result[0] if result else 0
    
    @staticmethod
    def _get_total_suppliers(tenant_id: int) -> int:
        """Get total active suppliers."""
        result = db_manager.fetch_one(
            "SELECT COUNT(*) FROM suppliers WHERE tenant_id = ? AND is_active = TRUE",
            (tenant_id,)
        )
        return result[0] if result else 0
    
    @staticmethod
    def _get_total_products(tenant_id: int) -> int:
        """Get total active products."""
        result = db_manager.fetch_one(
            "SELECT COUNT(*) FROM products WHERE tenant_id = ? AND is_active = TRUE",
            (tenant_id,)
        )
        return result[0] if result else 0
    
    @staticmethod
    def _get_recent_sales(tenant_id: int, limit: int = 5) -> List[Dict[str, Any]]:
        """Get recent sales invoices."""
        query = """
            SELECT si.id, si.invoice_number, si.invoice_date, si.total_amount, 
                   si.status, c.name as customer_name
            FROM sales_invoices si
            LEFT JOIN customers c ON si.customer_id = c.id
            WHERE si.tenant_id = ?
            ORDER BY si.invoice_date DESC, si.id DESC
            LIMIT ?
        """
        conn = db_manager.get_connection()
        cursor = conn.execute(query, (tenant_id, limit))
        results = cursor.fetchall()
        if results:
            columns = [desc[0] for desc in cursor.description]
            return [dict(zip(columns, row)) for row in results]
        return []
    
    @staticmethod
    def _get_recent_purchases(tenant_id: int, limit: int = 5) -> List[Dict[str, Any]]:
        """Get recent purchase invoices."""
        query = """
            SELECT pi.id, pi.invoice_number, pi.invoice_date, pi.total_amount, 
                   pi.status, s.name as supplier_name
            FROM purchase_invoices pi
            LEFT JOIN suppliers s ON pi.supplier_id = s.id
            WHERE pi.tenant_id = ?
            ORDER BY pi.invoice_date DESC, pi.id DESC
            LIMIT ?
        """
        conn = db_manager.get_connection()
        cursor = conn.execute(query, (tenant_id, limit))
        results = cursor.fetchall()
        if results:
            columns = [desc[0] for desc in cursor.description]
            return [dict(zip(columns, row)) for row in results]
        return []
    
    @staticmethod
    def _get_low_stock_items(tenant_id: int, limit: int = 5) -> List[Dict[str, Any]]:
        """Get products with low stock."""
        query = """
            SELECT id, sku, name, current_stock, reorder_level, unit
            FROM products
            WHERE tenant_id = ? AND is_active = TRUE 
            AND current_stock <= reorder_level AND reorder_level > 0
            ORDER BY (current_stock / NULLIF(reorder_level, 0)) ASC
            LIMIT ?
        """
        conn = db_manager.get_connection()
        cursor = conn.execute(query, (tenant_id, limit))
        results = cursor.fetchall()
        if results:
            columns = [desc[0] for desc in cursor.description]
            return [dict(zip(columns, row)) for row in results]
        return []

