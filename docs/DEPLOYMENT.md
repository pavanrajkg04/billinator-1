# Deployment Guide

## Overview

This guide covers deploying Billinator to production environments.

## 🐳 Docker Deployment (Recommended)

### Prerequisites

- Docker and Docker Compose installed
- Domain name configured (for production)
- SSL certificate (Let's Encrypt recommended)

### Steps

1. **Clone repository:**
   ```bash
   git clone <repository-url>
   cd billinator
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env with production values
   ```

3. **Build and start:**
   ```bash
   docker-compose up -d
   ```

4. **Check status:**
   ```bash
   docker-compose ps
   docker-compose logs -f
   ```

### Environment Variables

Set these in `.env` or `docker-compose.yml`:

```env
# Security (REQUIRED)
JWT_SECRET_KEY=<generate-with-openssl-rand-hex-32>
APP_ENV=production

# CORS (REQUIRED)
CORS_ORIGINS=https://yourdomain.com

# Database
DATABASE_PATH=/app/data/billinator.db

# Logging
LOG_LEVEL=INFO
LOG_FILE=/app/logs/billinator.log
```

## ☁️ Cloud Deployment

### AWS (EC2 + RDS)

1. **Launch EC2 instance:**
   - Ubuntu 22.04 LTS
   - t3.medium or larger
   - Security group: Allow ports 22, 80, 443, 8000

2. **Install dependencies:**
   ```bash
   sudo apt update
   sudo apt install -y python3.10 python3-pip nodejs npm docker docker-compose nginx
   ```

3. **Deploy application:**
   ```bash
   git clone <repository-url>
   cd billinator
   docker-compose up -d
   ```

4. **Configure Nginx:**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
       
       location /api {
           proxy_pass http://localhost:8000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
   ```

5. **SSL with Let's Encrypt:**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com
   ```

### DigitalOcean App Platform

1. Create new app
2. Connect GitHub repository
3. Configure build settings:
   - Backend: Python, `backend/` directory
   - Frontend: Node.js, `frontend/` directory
4. Set environment variables
5. Deploy

### Heroku

1. **Install Heroku CLI**

2. **Create apps:**
   ```bash
   heroku create billinator-backend
   heroku create billinator-frontend
   ```

3. **Deploy backend:**
   ```bash
   cd backend
   heroku git:remote -a billinator-backend
   git push heroku main
   ```

4. **Deploy frontend:**
   ```bash
   cd frontend
   heroku git:remote -a billinator-frontend
   git push heroku main
   ```

## 🔄 Updates and Maintenance

### Updating Application

```bash
# Pull latest changes
git pull origin main

# Rebuild containers
docker-compose build

# Restart services
docker-compose up -d

# Check logs
docker-compose logs -f
```

### Database Backups

**Automated backup script:**

```bash
#!/bin/bash
# backup.sh
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups"
mkdir -p $BACKUP_DIR
cp /app/data/billinator.db $BACKUP_DIR/billinator_$DATE.db
# Keep only last 7 days
find $BACKUP_DIR -name "billinator_*.db" -mtime +7 -delete
```

**Schedule with cron:**
```bash
0 2 * * * /path/to/backup.sh
```

### Monitoring

**Health checks:**
- Backend: `http://yourdomain.com/api/health`
- Frontend: `http://yourdomain.com`

**Log monitoring:**
```bash
# View logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Or from host
tail -f logs/billinator.log
```

## 🔒 Security Checklist

Before going live:

- [ ] JWT_SECRET_KEY set to strong random value
- [ ] APP_ENV=production
- [ ] CORS_ORIGINS configured correctly
- [ ] SSL/TLS enabled
- [ ] Firewall configured
- [ ] Database backups enabled
- [ ] Logging configured
- [ ] Rate limiting enabled
- [ ] Security headers verified
- [ ] Error messages don't leak sensitive info

## 📊 Performance Tuning

### Backend

- Use production WSGI server (Gunicorn + Uvicorn workers)
- Enable connection pooling
- Configure worker processes based on CPU cores

### Frontend

- Enable Next.js production mode
- Configure CDN for static assets
- Enable compression

### Database

- Regular VACUUM for DuckDB
- Monitor database size
- Consider migration to PostgreSQL for scale

## 🚨 Troubleshooting

### Backend won't start

1. Check logs: `docker-compose logs backend`
2. Verify environment variables
3. Check database file permissions
4. Verify JWT_SECRET_KEY is set

### Frontend can't connect to backend

1. Check CORS_ORIGINS configuration
2. Verify backend is running: `curl http://localhost:8000/health`
3. Check network connectivity
4. Verify API URL in frontend `.env`

### Database errors

1. Check file permissions
2. Verify database path
3. Check disk space
4. Review database logs

## 📞 Support

For deployment issues:
1. Check logs first
2. Review documentation
3. Contact support team

