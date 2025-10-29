# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Security Features

### 1. Authentication & Authorization
- **Input Validation**: All API inputs are validated using `class-validator`
- **SQL Injection Protection**: TypeORM with parameterized queries
- **XSS Protection**: Helmet.js security headers enabled

### 2. Rate Limiting
- **API Rate Limiting**: 100 requests per minute per IP
- **Configurable**: Adjust in `app.module.ts` ThrottlerModule

### 3. Security Headers (Helmet.js)
- Content Security Policy (CSP)
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Strict-Transport-Security (HSTS)
- X-XSS-Protection

### 4. CORS Policy
- **Strict Origin Control**: Only allowed origins can access API
- **Configurable**: Set `CORS_ORIGIN` environment variable
- **Default**: localhost:3000 (development only)

### 5. Environment Variables
- **No Hardcoded Secrets**: All sensitive data in environment variables
- **Required Variables**:
  - `DATABASE_USER` - PostgreSQL username (REQUIRED)
  - `DATABASE_PASSWORD` - PostgreSQL password (REQUIRED)
  - `DATABASE_NAME` - Database name
  - `CORS_ORIGIN` - Allowed frontend origins

### 6. Database Security
- **Synchronize Disabled in Production**: `synchronize: false` prevents schema auto-changes
- **Connection Pooling**: Prevents connection exhaustion
- **Password Requirements**: Use strong passwords (min 16 chars, alphanumeric + special)

## Reporting a Vulnerability

If you discover a security vulnerability, please:

1. **DO NOT** open a public GitHub issue
2. Email: ayothedoc3@gmail.com
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

**Response Time**: Within 48 hours

## Security Best Practices for Deployment

### 1. Environment Variables (CRITICAL)
```bash
# NEVER commit these to Git
DATABASE_USER=<strong-username>
DATABASE_PASSWORD=<min-16-char-password>
DATABASE_NAME=med_analytics_prod
NODE_ENV=production
CORS_ORIGIN=https://yourdomain.com
```

### 2. PostgreSQL Hardening
```sql
-- Create dedicated user with limited privileges
CREATE USER med_app_user WITH PASSWORD 'strong-password-here';
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO med_app_user;
REVOKE CREATE ON SCHEMA public FROM PUBLIC;
```

### 3. Docker Security
- Run containers as non-root user
- Use official base images only
- Scan images for vulnerabilities: `docker scan`
- Keep base images updated

### 4. Network Security
- Use HTTPS in production (TLS 1.2+)
- Enable firewall rules
- Restrict database port (5432) to backend only
- Use VPC/private networking

### 5. Monitoring & Logging
- Enable application logging
- Monitor for suspicious activity
- Set up alerts for failed authentication attempts
- Regular security audits

## Dependency Security

### Check for Vulnerabilities
```bash
# Backend
cd apps/backend
npm audit
npm audit fix

# Frontend
cd apps/frontend
npm audit
npm audit fix
```

### Update Dependencies Regularly
```bash
npm update
npm outdated
```

## Production Checklist

- [ ] All environment variables set (no defaults used)
- [ ] `NODE_ENV=production`
- [ ] Database `synchronize: false`
- [ ] Strong database passwords (16+ characters)
- [ ] CORS origins explicitly set (no wildcards)
- [ ] HTTPS/TLS enabled
- [ ] Swagger docs disabled (`NODE_ENV=production` auto-disables)
- [ ] Rate limiting configured
- [ ] Error messages sanitized (no stack traces to clients)
- [ ] Database backups configured
- [ ] Security headers verified (use securityheaders.com)

## Known Issues & Mitigations

### Development Defaults
- **Issue**: `.env.example` contains example passwords
- **Mitigation**: These are examples only. NEVER use in production.

### Docker Compose
- **Issue**: docker-compose.yml uses default passwords if env vars not set
- **Mitigation**: Always set environment variables or use `.env` file

## Security Updates

Subscribe to security advisories:
- [NestJS Security](https://github.com/nestjs/nest/security)
- [Next.js Security](https://github.com/vercel/next.js/security)
- [npm advisories](https://www.npmjs.com/advisories)

## License

This security policy is part of the Healthcare Analytics Dashboard project.
