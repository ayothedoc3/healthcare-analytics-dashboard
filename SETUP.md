# Medical Analytics Dashboard - Setup Guide

Complete guide to get your healthcare analytics dashboard running locally.

## Prerequisites

Ensure you have the following installed:

- **Node.js** 18.x or higher ([Download](https://nodejs.org/))
- **npm** 9.x or higher (comes with Node.js)
- **Docker Desktop** ([Download](https://www.docker.com/products/docker-desktop/))
- **Git** ([Download](https://git-scm.com/downloads))

Verify installations:
```bash
node --version    # Should be v18.x or higher
npm --version     # Should be 9.x or higher
docker --version  # Should be 20.x or higher
```

## Quick Start (5 minutes)

### 1. Clone Repository
```bash
git clone https://github.com/ayothedoc3/med-analytics-dashboard
cd med-analytics-dashboard
```

### 2. Install Dependencies
```bash
# Install root workspace dependencies
npm install

# Install backend dependencies
cd apps/backend
npm install
cd ../..

# Install frontend dependencies
cd apps/frontend
npm install
cd ../..
```

### 3. Setup Environment Files
```bash
# Backend environment
cp apps/backend/.env.example apps/backend/.env

# Frontend environment
cp apps/frontend/.env.example apps/frontend/.env
```

### 4. Start PostgreSQL Database
```bash
npm run docker:up
```

Wait ~30 seconds for PostgreSQL to initialize.

### 5. Seed Database with Sample Data
```bash
cd apps/backend
npm run seed
cd ../..
```

### 6. Start Development Servers
```bash
npm run dev
```

This starts both backend and frontend concurrently.

### 7. Access Application

Open your browser:
- **Frontend Dashboard**: http://localhost:3000
- **Backend API**: http://localhost:4000/api
- **API Documentation**: http://localhost:4000/api/docs

## Manual Setup (Step by Step)

If the quick start didn't work, follow these detailed steps:

### Step 1: Install Backend

```bash
cd apps/backend
npm install
```

Create `.env` file:
```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=meduser
DATABASE_PASSWORD=medpass123
DATABASE_NAME=med_analytics
PORT=4000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### Step 2: Start Database

```bash
docker-compose up -d postgres
```

Check database is running:
```bash
docker ps
```

You should see `med-analytics-db` container running.

### Step 3: Seed Database

```bash
cd apps/backend
npm run seed
```

Expected output:
```
Starting database seeding...
Created 50 patients
Created 200+ appointments
Created 300+ revenue records
Database seeding completed!
```

### Step 4: Start Backend Server

```bash
cd apps/backend
npm run start:dev
```

Backend should be running on http://localhost:4000

Test health endpoint:
```bash
curl http://localhost:4000/api/health
```

### Step 5: Install Frontend

```bash
cd apps/frontend
npm install
```

Create `.env` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### Step 6: Start Frontend Server

```bash
cd apps/frontend
npm run dev
```

Frontend should be running on http://localhost:3000

## Troubleshooting

### Database Connection Issues

**Problem**: `ECONNREFUSED` or database connection error

**Solution**:
```bash
# Stop all containers
docker-compose down

# Remove volumes
docker volume prune

# Start fresh
docker-compose up -d postgres

# Wait 30 seconds, then seed
cd apps/backend
npm run seed
```

### Port Already in Use

**Problem**: Port 3000, 4000, or 5432 already in use

**Solution**:
```bash
# Find and kill process on port (macOS/Linux)
lsof -ti:3000 | xargs kill -9
lsof -ti:4000 | xargs kill -9

# Windows PowerShell
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process
Get-Process -Id (Get-NetTCPConnection -LocalPort 4000).OwningProcess | Stop-Process
```

Or change ports in `.env` files.

### Module Not Found

**Problem**: Module import errors

**Solution**:
```bash
# Clear node_modules and reinstall
rm -rf node_modules apps/*/node_modules
npm install
cd apps/backend && npm install
cd ../frontend && npm install
```

### Docker Not Running

**Problem**: Cannot connect to Docker daemon

**Solution**:
- Start Docker Desktop application
- Wait for Docker to fully start (check system tray icon)
- Try command again

### Frontend Shows "Connection Error"

**Problem**: Frontend cannot connect to API

**Solution**:
1. Verify backend is running: `curl http://localhost:4000/api/health`
2. Check `.env` file in `apps/frontend` has correct `NEXT_PUBLIC_API_URL`
3. Restart frontend: `npm run dev`

## Testing the Application

### Backend Tests
```bash
cd apps/backend
npm test              # Unit tests
npm run test:e2e      # E2E tests
npm run test:cov      # Coverage report
```

### API Endpoints Testing

Using curl:
```bash
# Get overview metrics
curl http://localhost:4000/api/analytics/overview

# Get revenue data
curl http://localhost:4000/api/analytics/revenue

# Get patient statistics
curl http://localhost:4000/api/analytics/patients

# Get department performance
curl http://localhost:4000/api/analytics/departments
```

### Frontend Build
```bash
cd apps/frontend
npm run build
npm start
```

## Production Deployment

### Using Docker Compose

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

### Environment Variables for Production

Backend `.env`:
```env
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_USER=your_user
DATABASE_PASSWORD=your_secure_password
DATABASE_NAME=med_analytics
PORT=4000
NODE_ENV=production
CORS_ORIGIN=https://your-domain.com
```

Frontend `.env`:
```env
NEXT_PUBLIC_API_URL=https://api.your-domain.com
```

## Development Workflow

### Running Specific Services

```bash
# Backend only
npm run backend:dev

# Frontend only
npm run frontend:dev

# Both (parallel)
npm run dev
```

### Database Management

```bash
# Reset database
docker-compose down -v
docker-compose up -d postgres
cd apps/backend && npm run seed

# View database logs
docker-compose logs -f postgres

# Access PostgreSQL shell
docker exec -it med-analytics-db psql -U meduser -d med_analytics
```

### Useful Commands

```bash
# View all containers
docker ps -a

# View container logs
docker logs med-analytics-db
docker logs med-analytics-backend
docker logs med-analytics-frontend

# Rebuild containers
docker-compose up -d --build

# Remove all containers and volumes
docker-compose down -v
```

## Performance Optimization

### Database Indexing

All entities have proper indexes on:
- Primary keys (UUID)
- Foreign keys
- Frequently queried fields (status, dates, departments)

### Backend Optimization

- Connection pooling configured
- Query result caching
- Efficient aggregation queries
- Pagination support

### Frontend Optimization

- Server-side rendering (SSR)
- Static asset optimization
- Code splitting
- Lazy loading

## Skills Demonstrated

This MVP showcases:

1. **Backend Engineering (Nest.js)**
   - RESTful API architecture
   - TypeORM with PostgreSQL
   - Swagger API documentation
   - Input validation & error handling
   - Modular architecture

2. **Database Design (PostgreSQL)**
   - Normalized schemas
   - Proper indexing
   - Query optimization
   - Migration management

3. **Frontend Development (Next.js)**
   - Server-side rendering
   - TypeScript type safety
   - Tailwind CSS styling
   - Recharts data visualization

4. **DevOps**
   - Docker containerization
   - Docker Compose orchestration
   - GitHub Actions CI/CD
   - Environment management

5. **Healthcare Domain**
   - Patient management
   - Appointment tracking
   - Revenue analytics
   - Department performance

## Support

For issues or questions:
- **GitHub**: https://github.com/ayothedoc3/med-analytics-dashboard
- **Email**: ayothedoc3@gmail.com

## Next Steps

To extend this MVP:
1. Add authentication (JWT/OAuth)
2. Implement real-time updates (WebSocket)
3. Add more analytics visualizations
4. Create patient/appointment CRUD endpoints
5. Add export functionality (PDF/Excel)
6. Implement role-based access control
7. Add unit and E2E tests
8. Set up monitoring (Prometheus/Grafana)

---

Built with ❤️ by Ayokunle Ademola-John
