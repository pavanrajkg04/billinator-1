# Docker Deployment Guide for Billinator

This guide explains how to run Billinator using Docker and Docker Compose.

## Prerequisites

- Docker Engine 20.10+ 
- Docker Compose 2.0+ (optional, for docker-compose setup)

## Quick Start with Docker Compose

1. **Create a `.env` file** (if you don't have one):
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env` file** with your configuration:
   ```env
   DATABASE_PATH=./data/billinator.db
   JWT_SECRET_KEY=your-strong-secret-key-change-this
   JWT_ALGORITHM=HS256
   JWT_EXPIRATION_HOURS=24
   APP_NAME=Billinator
   APP_ENV=production
   ```

3. **Build and run with Docker Compose:**
   ```bash
   docker-compose up -d
   ```

4. **Access the application:**
   - Open your browser to `http://localhost:3000`
   - Register your first business
   - Start using Billinator!

## Manual Docker Build

1. **Build the Docker image:**
   ```bash
   docker build -t billinator:latest .
   ```

2. **Run the container:**
   ```bash
   docker run -d \
     --name billinator \
     -p 3000:3000 \
     -v $(pwd)/data:/app/data \
     -v $(pwd)/.env:/app/.env:ro \
     -e JWT_SECRET_KEY=your-strong-secret-key \
     billinator:latest
   ```

## Docker Compose Configuration

The `docker-compose.yml` file includes:
- **Port mapping**: Maps container port 3000 to host port 3000
- **Volume mounts**: 
  - `./data:/app/data` - Persists database data
  - `./.env:/app/.env:ro` - Mounts environment file (read-only)
- **Environment variables**: Configurable via `.env` file
- **Health check**: Monitors container health
- **Auto-restart**: Container restarts automatically unless stopped

## Environment Variables

You can configure the following environment variables:

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_PATH` | Path to DuckDB database file | `/app/data/billinator.db` |
| `JWT_SECRET_KEY` | Secret key for JWT tokens | `change-me-in-production-secret-key` |
| `JWT_ALGORITHM` | JWT algorithm | `HS256` |
| `JWT_EXPIRATION_HOURS` | JWT token expiration time | `24` |
| `APP_NAME` | Application name | `Billinator` |
| `APP_ENV` | Application environment | `production` |

## Data Persistence

The database is stored in the `./data` directory on your host machine. This ensures:
- Data persists across container restarts
- Easy backup by copying the `data/` directory
- Database survives container deletion

## Managing the Container

### View logs:
```bash
docker-compose logs -f
# or
docker logs -f billinator
```

### Stop the container:
```bash
docker-compose down
# or
docker stop billinator
```

### Restart the container:
```bash
docker-compose restart
# or
docker restart billinator
```

### Update the application:
```bash
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

## Troubleshooting

### Container won't start
- Check logs: `docker-compose logs`
- Verify `.env` file exists and has correct values
- Ensure port 3000 is not already in use

### Database issues
- Check that `data/` directory is writable
- Verify `DATABASE_PATH` in `.env` is correct
- Try removing the database file and letting it recreate

### Connection refused
- Verify container is running: `docker ps`
- Check port mapping: `docker port billinator`
- Ensure firewall allows port 3000

### Permission issues
- Ensure `data/` directory has correct permissions
- On Linux, you may need: `chmod 755 data/`

## Production Considerations

1. **Change JWT_SECRET_KEY**: Use a strong, random secret key
2. **Use HTTPS**: Set up a reverse proxy (nginx/traefik) with SSL
3. **Backup database**: Regularly backup the `data/` directory
4. **Resource limits**: Set appropriate CPU/memory limits in docker-compose.yml
5. **Monitoring**: Set up logging and monitoring for production

## Example Production docker-compose.yml

```yaml
version: '3.8'

services:
  billinator:
    build: .
    ports:
      - "127.0.0.1:3000:3000"  # Only bind to localhost
    volumes:
      - ./data:/app/data
      - ./.env:/app/.env:ro
    environment:
      - APP_ENV=production
    restart: always
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 1G
        reservations:
          cpus: '0.5'
          memory: 512M
```

## Support

For issues or questions, please refer to the main [README.md](README.md) or [DOCUMENTATION.md](DOCUMENTATION.md).

