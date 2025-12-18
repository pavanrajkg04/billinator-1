"""Helper utility functions."""
from typing import Optional
import re


def validate_gstin(gstin: str) -> bool:
    """Basic GSTIN validation (15 characters, alphanumeric)."""
    if not gstin:
        return True  # GSTIN is optional
    pattern = r'^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$'
    return bool(re.match(pattern, gstin.upper()))


def format_currency(amount: float) -> str:
    """Format amount as Indian currency."""
    return f"₹ {amount:,.2f}"


def format_invoice_number(prefix: str, number: int, padding: int = 6) -> str:
    """Format invoice number with prefix and zero-padding."""
    return f"{prefix}-{number:0{padding}d}"

