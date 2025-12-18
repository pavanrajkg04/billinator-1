"""Structured logging configuration."""
import logging
import sys
from pathlib import Path
import json
from datetime import datetime
from typing import Any, Dict
from logging.handlers import RotatingFileHandler
from contextvars import ContextVar
import config

_ctx_request_id: ContextVar[str | None] = ContextVar("request_id", default=None)
_ctx_tenant_id: ContextVar[int | None] = ContextVar("tenant_id", default=None)
_ctx_user_id: ContextVar[int | None] = ContextVar("user_id", default=None)
_ctx_method: ContextVar[str | None] = ContextVar("method", default=None)
_ctx_path: ContextVar[str | None] = ContextVar("path", default=None)
_ctx_client_ip: ContextVar[str | None] = ContextVar("client_ip", default=None)
_ctx_user_agent: ContextVar[str | None] = ContextVar("user_agent", default=None)


def set_log_context(
    *,
    request_id: str | None = None,
    tenant_id: int | None = None,
    user_id: int | None = None,
    method: str | None = None,
    path: str | None = None,
    client_ip: str | None = None,
    user_agent: str | None = None,
) -> None:
    """Bind request context so every log line can include these fields."""
    if request_id is not None:
        _ctx_request_id.set(request_id)
    if tenant_id is not None:
        _ctx_tenant_id.set(tenant_id)
    if user_id is not None:
        _ctx_user_id.set(user_id)
    if method is not None:
        _ctx_method.set(method)
    if path is not None:
        _ctx_path.set(path)
    if client_ip is not None:
        _ctx_client_ip.set(client_ip)
    if user_agent is not None:
        _ctx_user_agent.set(user_agent)


def clear_log_context() -> None:
    """Clear per-request context to avoid leaking values across requests/threads."""
    _ctx_request_id.set(None)
    _ctx_tenant_id.set(None)
    _ctx_user_id.set(None)
    _ctx_method.set(None)
    _ctx_path.set(None)
    _ctx_client_ip.set(None)
    _ctx_user_agent.set(None)


class ContextFilter(logging.Filter):
    """Inject contextvars into every LogRecord."""

    def filter(self, record: logging.LogRecord) -> bool:
        if not hasattr(record, "request_id") or getattr(record, "request_id", None) is None:
            record.request_id = _ctx_request_id.get()
        if not hasattr(record, "tenant_id") or getattr(record, "tenant_id", None) is None:
            record.tenant_id = _ctx_tenant_id.get()
        if not hasattr(record, "user_id") or getattr(record, "user_id", None) is None:
            record.user_id = _ctx_user_id.get()

        if not hasattr(record, "method") or getattr(record, "method", None) is None:
            record.method = _ctx_method.get()
        if not hasattr(record, "path") or getattr(record, "path", None) is None:
            record.path = _ctx_path.get()
        if not hasattr(record, "client_ip") or getattr(record, "client_ip", None) is None:
            record.client_ip = _ctx_client_ip.get()
        if not hasattr(record, "user_agent") or getattr(record, "user_agent", None) is None:
            record.user_agent = _ctx_user_agent.get()
        return True


class HumanFormatter(logging.Formatter):
    """Readable console formatter (clean + detailed)."""

    def format(self, record: logging.LogRecord) -> str:
        ts = datetime.utcnow().isoformat(timespec="seconds") + "Z"
        rid = getattr(record, "request_id", None) or "-"
        tid = getattr(record, "tenant_id", None)
        uid = getattr(record, "user_id", None)
        method = getattr(record, "method", None)
        path = getattr(record, "path", None)
        status = getattr(record, "status_code", None)
        duration = getattr(record, "duration_ms", None)
        client_ip = getattr(record, "client_ip", None)

        parts = [
            ts,
            record.levelname,
            record.name,
            f"rid={rid}",
        ]
        if tid is not None:
            parts.append(f"tenant={tid}")
        if uid is not None:
            parts.append(f"user={uid}")
        if method and path:
            parts.append(f"{method} {path}")
        if status is not None:
            parts.append(f"status={status}")
        if duration is not None:
            parts.append(f"dur_ms={duration}")
        if client_ip:
            parts.append(f"ip={client_ip}")

        msg = record.getMessage()
        line = " ".join(parts) + " - " + msg

        if record.exc_info:
            line += "\n" + self.formatException(record.exc_info)
        return line


class JSONFormatter(logging.Formatter):
    """JSON formatter for structured logging."""
    
    def format(self, record: logging.LogRecord) -> str:
        log_data: Dict[str, Any] = {
            "timestamp": datetime.utcnow().isoformat(),
            "service": config.APP_NAME,
            "env": config.APP_ENV,
            "level": record.levelname,
            "logger": record.name,
            "message": record.getMessage(),
            "module": record.module,
            "function": record.funcName,
            "line": record.lineno,
        }
        
        # Add exception info if present
        if record.exc_info:
            log_data["exception"] = self.formatException(record.exc_info)
        
        # Add known extra fields
        if hasattr(record, "user_id"):
            log_data["user_id"] = record.user_id
        if hasattr(record, "tenant_id"):
            log_data["tenant_id"] = record.tenant_id
        if hasattr(record, "request_id"):
            log_data["request_id"] = record.request_id

        # Add common request fields if present
        for key in ("method", "path", "status_code", "duration_ms", "client_ip", "user_agent"):
            if hasattr(record, key):
                log_data[key] = getattr(record, key)
        
        return json.dumps(log_data)


def setup_logging():
    """Configure application logging."""
    log_level = getattr(logging, config.LOG_LEVEL.upper(), logging.INFO)
    
    # Create logs directory
    log_file_path = Path(config.LOG_FILE)
    log_file_path.parent.mkdir(parents=True, exist_ok=True)
    
    # Root logger configuration
    root_logger = logging.getLogger()
    root_logger.setLevel(log_level)
    
    # Remove existing handlers
    root_logger.handlers.clear()
    
    # Console handler (for development)
    console_handler = logging.StreamHandler(sys.stdout)
    console_handler.setLevel(log_level)
    if config.LOG_JSON:
        console_formatter = JSONFormatter()
    else:
        console_formatter = HumanFormatter()
    console_handler.setFormatter(console_formatter)
    console_handler.addFilter(ContextFilter())
    root_logger.addHandler(console_handler)
    
    # File handler (optional; default enabled in production)
    if config.LOG_TO_FILE:
        file_handler = RotatingFileHandler(
            log_file_path,
            maxBytes=config.LOG_MAX_BYTES,
            backupCount=config.LOG_BACKUP_COUNT,
        )
        file_handler.setLevel(log_level)
        file_handler.setFormatter(JSONFormatter())
        file_handler.addFilter(ContextFilter())
        root_logger.addHandler(file_handler)
    
    # Set levels for third-party loggers
    # Keep uvicorn errors visible; silence access logs because we do our own request logging.
    logging.getLogger("uvicorn").setLevel(log_level)
    logging.getLogger("uvicorn.error").setLevel(log_level)
    logging.getLogger("uvicorn.access").setLevel(logging.WARNING)
    
    return root_logger


def get_logger(name: str) -> logging.Logger:
    """Get a logger instance."""
    return logging.getLogger(name)

