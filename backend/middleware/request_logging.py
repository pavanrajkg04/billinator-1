"""Request/response logging middleware."""

import logging
import time
import uuid
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
from backend.utils.logger import set_log_context, clear_log_context

logger = logging.getLogger(__name__)


class RequestLoggingMiddleware(BaseHTTPMiddleware):
    """Log each request with request_id, latency, and status code.

    Adds/propagates `X-Request-ID` header.
    """

    async def dispatch(self, request: Request, call_next):
        start = time.perf_counter()

        request_id = request.headers.get("X-Request-ID") or str(uuid.uuid4())
        request.state.request_id = request_id

        client_ip = request.client.host if request.client else "unknown"
        user_agent = request.headers.get("user-agent", "")

        try:
            # Bind context for *all* logs generated during this request
            set_log_context(
                request_id=request_id,
                method=request.method,
                path=request.url.path,
                client_ip=client_ip,
                user_agent=user_agent,
            )

            response = await call_next(request)
            duration_ms = round((time.perf_counter() - start) * 1000, 2)
            response.headers["X-Request-ID"] = request_id

            # Reduce noise: skip access logs for common probe/docs endpoints
            if request.url.path not in ["/health", "/health/ready", "/health/live", "/docs", "/openapi.json", "/redoc"]:
                logger.info(
                    "request",
                    extra={
                        "status_code": response.status_code,
                        "duration_ms": duration_ms,
                    },
                )
            return response
        except Exception:
            duration_ms = round((time.perf_counter() - start) * 1000, 2)
            logger.exception(
                "request_failed",
                extra={
                    "status_code": 500,
                    "duration_ms": duration_ms,
                },
            )
            raise
        finally:
            clear_log_context()


