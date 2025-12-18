"""Outstanding API routes."""
from fastapi import APIRouter, HTTPException, status, Depends
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent.parent))
from database.connection import db_manager
from api.dependencies import get_tenant_id

router = APIRouter()

@router.get("/")
async def get_outstanding(tenant_id: int = Depends(get_tenant_id)):
    """Get outstanding receivables and payables."""
    try:
        # Get receivables (customers)
        receivables_query = """
            SELECT id, name, outstanding_balance
            FROM customers
            WHERE tenant_id = ? AND is_active = TRUE AND outstanding_balance > 0
            ORDER BY outstanding_balance DESC
        """
        conn = db_manager.get_connection()
        cursor = conn.execute(receivables_query, (tenant_id,))
        receivables_results = cursor.fetchall()
        receivables = []
        if receivables_results:
            columns = [desc[0] for desc in cursor.description]
            receivables = [dict(zip(columns, row)) for row in receivables_results]
        
        # Get payables (suppliers)
        payables_query = """
            SELECT id, name, outstanding_balance
            FROM suppliers
            WHERE tenant_id = ? AND is_active = TRUE AND outstanding_balance > 0
            ORDER BY outstanding_balance DESC
        """
        cursor = conn.execute(payables_query, (tenant_id,))
        payables_results = cursor.fetchall()
        payables = []
        if payables_results:
            columns = [desc[0] for desc in cursor.description]
            payables = [dict(zip(columns, row)) for row in payables_results]
        
        # Calculate totals
        total_receivables = sum(float(r.get('outstanding_balance', 0)) for r in receivables)
        total_payables = sum(float(p.get('outstanding_balance', 0)) for p in payables)
        
        return {
            "receivables": receivables,
            "payables": payables,
            "total_receivables": total_receivables,
            "total_payables": total_payables
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

