# Security Guide

## Overview

This document outlines security best practices for deploying and operating Billinator in production.

## 🔐 Authentication & Authorization

### JWT Configuration

**Critical:** Always set a strong JWT secret key in production:

```bash
# Generate a secure secret key
openssl rand -hex 32
```

Set it in your `.env` file:
```env
JWT_SECRET_KEY=your-generated-secret-key-here
```

**Never:**
- Use the default secret key
- Commit secrets to version control
- Share secrets between environments

### Password Security

- Passwords are hashed using bcrypt with 12 rounds
- Minimum password length: 6 characters (enforced)
- Passwords are never stored in plain text
- Password hashes are never returned in API responses

### Token Management

- JWT tokens expire after 24 hours (configurable)
- Tokens are stored in HTTP-only cookies (frontend)
- Tokens include user ID, tenant ID, and role
- Invalid tokens result in 401 Unauthorized

## 🛡️ Security Headers

The application automatically adds security headers:

- `X-Content-Type-Options: nosniff` - Prevents MIME type sniffing
- `X-Frame-Options: DENY` - Prevents clickjacking
- `X-XSS-Protection: 1; mode=block` - XSS protection
- `Strict-Transport-Security` - Forces HTTPS
- `Content-Security-Policy` - Restricts resource loading
- `Referrer-Policy` - Controls referrer information

## 🚦 Rate Limiting

Rate limiting is enabled by default:
- **Default:** 60 requests per minute per IP
- Configurable via `RATE_LIMIT_PER_MINUTE` in `.env`
- Health check endpoints are excluded
- Rate limit headers included in responses

## 🔒 Input Validation

All API endpoints use Pydantic schemas for validation:

- Type checking
- Length constraints
- Format validation (email, GSTIN, etc.)
- Required field enforcement
- SQL injection prevention (parameterized queries)

## 🏢 Multi-Tenancy Security

- **Tenant Isolation:** All queries automatically filter by `tenant_id`
- **No Cross-Tenant Access:** Users can only access their tenant's data
- **Tenant Validation:** Tenant ID verified on every request
- **Data Separation:** Complete logical separation between tenants

## 🔍 Audit Logging

All critical actions are logged:
- User authentication
- Data creation/modification/deletion
- Failed login attempts
- Security events

Logs include:
- User ID and tenant ID
- Timestamp
- Action type
- Entity details

## 🌐 CORS Configuration

Configure allowed origins in `.env`:

```env
CORS_ORIGINS=https://yourdomain.com,https://app.yourdomain.com
```

**Production:**
- Only allow your actual frontend domains
- Never use `*` in production
- Use HTTPS only

## 🗄️ Database Security

- **File Permissions:** Database file should be readable/writable only by application user
- **Backup Encryption:** Encrypt database backups
- **Connection Security:** Use file-based DuckDB (no network exposure)
- **SQL Injection:** All queries use parameterized statements

## 📝 Environment Variables

**Required for Production:**

```env
# Security
JWT_SECRET_KEY=<strong-random-key>
APP_ENV=production

# CORS
CORS_ORIGINS=https://yourdomain.com

# Logging
LOG_LEVEL=INFO
```

**Never commit `.env` files to version control!**

## 🚨 Security Checklist

Before deploying to production:

- [ ] Change JWT_SECRET_KEY to a strong random value
- [ ] Set APP_ENV=production
- [ ] Configure CORS_ORIGINS with actual domains
- [ ] Enable rate limiting
- [ ] Set up SSL/TLS certificates
- [ ] Configure firewall rules
- [ ] Set up database backups
- [ ] Enable audit logging
- [ ] Review and restrict file permissions
- [ ] Set up monitoring and alerting
- [ ] Test security headers
- [ ] Review error messages (no sensitive data leakage)

## 🔄 Security Updates

- Keep dependencies updated
- Monitor security advisories
- Review logs regularly
- Update JWT secret periodically (requires re-authentication)
- Rotate secrets in case of compromise

## 📞 Security Issues

If you discover a security vulnerability:

1. **Do not** create a public issue
2. Contact the development team privately
3. Provide detailed information about the vulnerability
4. Allow time for fix before public disclosure

## 🔐 Best Practices

1. **Principle of Least Privilege:** Users should have minimum required permissions
2. **Defense in Depth:** Multiple security layers
3. **Fail Securely:** Errors don't expose sensitive information
4. **Secure by Default:** Secure configuration is the default
5. **Regular Audits:** Review security settings periodically

