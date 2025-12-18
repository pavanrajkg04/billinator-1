"""Customer DAO for database operations."""
from models.base import BaseDAO


class CustomerDAO(BaseDAO):
    """Data Access Object for customers."""
    
    def __init__(self):
        super().__init__("customers")

