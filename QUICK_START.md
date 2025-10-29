# Quick Start Guide

Get your Medical Analytics Dashboard running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- Docker Desktop running
- Terminal/Command Prompt open

## Automated Setup (Recommended)

### On macOS/Linux:
```bash
chmod +x setup.sh
./setup.sh
```

### On Windows:
```cmd
setup.bat
```

The script will:
1. Install all dependencies
2. Create environment files
3. Start PostgreSQL database
4. Seed with sample data
5. Display next steps

## Manual Setup (If automated setup fails)

### 1. Install Dependencies
```bash
npm install
cd apps/backend && npm install && cd ../..
cd apps/frontend && npm install && cd ../..
```

### 2. Create Environment Files
```bash
cp apps/backend/.env.example apps/backend/.env
cp apps/frontend/.env.example apps/frontend/.env
```

### 3. Start Database
```bash
docker-compose up -d postgres
```

Wait 30 seconds for PostgreSQL to initialize.

### 4. Seed Database
```bash
cd apps/backend
npm run seed
cd ../..
```

### 5. Start Application
```bash
npm run dev
```

## Access Your Dashboard

Open these URLs in your browser:

- **Dashboard UI**: http://localhost:3000
- **API Endpoints**: http://localhost:4000/api
- **API Documentation**: http://localhost:4000/api/docs

## What You'll See

### Dashboard Features
- Total patients count
- Appointment statistics
- Revenue metrics
- Department performance
- Interactive charts
- Patient demographics

### Sample Data
- 50 patients
- 200+ appointments
- 300+ revenue records
- 5 departments

## Common Commands

```bash
# Start everything
npm run dev

# Start backend only
npm run backend:dev

# Start frontend only
npm run frontend:dev

# Stop database
docker-compose down

# Restart database
docker-compose restart postgres

# View logs
docker-compose logs -f

# Re-seed database
cd apps/backend && npm run seed
```

## Troubleshooting

### Port 3000 or 4000 already in use?
```bash
# Find and kill the process
# macOS/Linux:
lsof -ti:3000 | xargs kill -9

# Windows PowerShell:
Stop-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess
```

### Database connection failed?
```bash
# Restart PostgreSQL
docker-compose restart postgres

# Wait 30 seconds then try again
```

### Module not found errors?
```bash
# Clean install
rm -rf node_modules apps/*/node_modules
npm install
cd apps/backend && npm install
cd ../frontend && npm install
```

### Docker not running?
- Start Docker Desktop
- Wait for it to fully start (green icon in system tray)
- Run commands again

## Testing API Endpoints

### Using curl:
```bash
# Health check
curl http://localhost:4000/api/health

# Get overview metrics
curl http://localhost:4000/api/analytics/overview

# Get revenue data
curl http://localhost:4000/api/analytics/revenue

# Get patient statistics
curl http://localhost:4000/api/analytics/patients

# Get department performance
curl http://localhost:4000/api/analytics/departments
```

### Using Browser:
Visit http://localhost:4000/api/docs for interactive API documentation.

## Project Structure Quick Reference

```
med-analytics-dashboard/
├── apps/
│   ├── backend/          # Nest.js API
│   │   ├── src/
│   │   │   ├── entities/     # Database models
│   │   │   ├── modules/      # Feature modules
│   │   │   ├── dto/          # Data transfer objects
│   │   │   └── main.ts       # Application entry
│   │   └── package.json
│   └── frontend/         # Next.js UI
│       ├── src/
│       │   ├── app/          # Pages
│       │   ├── components/   # UI components
│       │   ├── lib/          # Utilities
│       │   └── types/        # TypeScript types
│       └── package.json
├── docker-compose.yml    # Docker configuration
├── README.md            # Main documentation
├── SETUP.md            # Detailed setup guide
├── ARCHITECTURE.md     # Technical architecture
└── package.json        # Root workspace config
```

## What's Next?

1. **Explore the Dashboard**
   - View different metrics
   - Interact with charts
   - Check department performance

2. **Test the API**
   - Visit Swagger docs
   - Try different endpoints
   - Check response formats

3. **Read the Code**
   - Backend: `apps/backend/src/`
   - Frontend: `apps/frontend/src/`
   - Check code comments

4. **Customize**
   - Modify UI components
   - Add new endpoints
   - Change styling

## Getting Help

If you encounter issues:

1. Check [SETUP.md](./SETUP.md) for detailed instructions
2. Review [ARCHITECTURE.md](./ARCHITECTURE.md) for technical details
3. Check [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) for overview
4. Open an issue on GitHub
5. Contact: ayothedoc3@gmail.com

## Key Features to Check Out

1. **Overview Dashboard**
   - KPI cards with real-time metrics
   - Color-coded status indicators

2. **Revenue Chart**
   - Multi-line chart showing trends
   - Filter by department

3. **Patient Demographics**
   - Age distribution bar chart
   - Gender distribution pie chart

4. **Department Performance**
   - Sortable table
   - Success rate calculations
   - Revenue per department

5. **API Documentation**
   - Interactive Swagger UI
   - Test endpoints directly
   - See request/response formats

## Tips for Development

1. **Hot Reload**: Both backend and frontend support hot reload
2. **TypeScript**: Leverage type checking for fewer bugs
3. **Console**: Check browser console and terminal for errors
4. **Database**: Use pgAdmin or any PostgreSQL client to view data
5. **Docker**: Keep Docker Desktop running while developing

## Stopping the Application

```bash
# Stop dev servers
Ctrl + C (in terminal)

# Stop database
docker-compose down

# Stop and remove volumes (clean slate)
docker-compose down -v
```

## Congratulations!

You now have a fully functional healthcare analytics dashboard running locally.

Explore the code, modify it, and use it as a reference for your projects!

---

**Happy Coding!** 🚀

For more information, see the other documentation files:
- [README.md](./README.md) - Project overview
- [SETUP.md](./SETUP.md) - Detailed setup
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Technical details
- [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) - Skills showcase
