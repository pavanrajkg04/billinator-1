# Changelog

All notable changes to Billinator will be documented in this file.

## [1.0.0] - 2024-12-17

### Added

#### Security
- JWT secret key validation (enforced in production)
- Security headers middleware (X-Content-Type-Options, X-Frame-Options, etc.)
- Rate limiting middleware (60 requests/minute default)
- Improved CORS configuration
- Input validation with Pydantic schemas
- Structured logging with JSON format
- Error message sanitization

#### Testing
- Pytest testing infrastructure
- Unit tests for authentication service
- Unit tests for product service
- API integration tests
- Test fixtures and configuration
- Coverage reporting

#### Monitoring
- Structured logging system
- Health check endpoints (`/health`, `/health/ready`, `/health/live`)
- Request logging with user/tenant context
- Error tracking setup

#### Documentation
- Complete documentation reorganization into `docs/` folder
- Security guide
- Testing guide
- Deployment guide
- API documentation
- Architecture documentation
- Production checklist

#### Configuration
- `.env.example` file with all required variables
- Environment-based configuration
- Development vs production settings

### Changed

- **BREAKING:** JWT_SECRET_KEY now required in production (raises error if not set)
- Improved error handling in API routes
- Better logging throughout application
- CORS configuration now more restrictive
- API documentation disabled in production

### Fixed

- Security vulnerabilities
- Missing input validation
- Error message information leakage
- Configuration management

### Migration Notes

1. **Environment Variables:** Copy `.env.example` to `.env` and configure
2. **JWT Secret:** Generate with `openssl rand -hex 32` and set in `.env`
3. **CORS:** Update `CORS_ORIGINS` with your production domains
4. **Testing:** Run `pytest` to verify installation

## [0.9.0] - 2024-12-16

### Added
- Complete CRM features (Opportunities, Quotes, Activities, Notes, Contacts)
- All CRUD forms for entities
- Detail pages for invoices, products, customers
- Search and filtering on all list pages
- Report generation backend
- Settings save functionality

## [0.8.0] - 2024-12-15

### Added
- Migration from Reflex to Next.js + FastAPI
- Complete frontend rebuild in Next.js
- FastAPI backend with REST API
- Docker Compose setup
- All core pages implemented

## [0.1.0] - 2024-12-01

### Added
- Initial release
- Multi-tenant architecture
- GST invoicing
- Inventory management
- Customer and supplier management
- Basic reporting

---

**Format:** [Version] - Date
**Categories:** Added, Changed, Deprecated, Removed, Fixed, Security

