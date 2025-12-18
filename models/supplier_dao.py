"""Supplier DAO for database operations."""
from models.base import BaseDAO


class SupplierDAO(BaseDAO):
    """Data Access Object for suppliers."""
    
    def __init__(self):
        super().__init__("suppliers")

