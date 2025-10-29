# Medical Analytics Dashboard MVP

A production-ready healthcare analytics dashboard showcasing full-stack development expertise with modern technologies.

## Tech Stack

### Backend
- **Nest.js** - Enterprise-grade Node.js framework
- **PostgreSQL** - Relational database with optimized schemas
- **TypeORM** - Database migrations and query optimization
- **TypeScript** - Type-safe development
- **Swagger** - Comprehensive API documentation
- **Class Validator** - Input validation and sanitization

### Frontend
- **Next.js 14** - React framework with SSR
- **TypeScript** - End-to-end type safety
- **Tailwind CSS** - Modern, responsive UI
- **Recharts** - Beautiful analytics visualizations
- **ShadcN UI** - Production-ready components

### DevOps
- **Docker** - Containerized deployment
- **Docker Compose** - Multi-container orchestration
- **GitHub Actions** - Automated CI/CD pipeline
- **PostgreSQL** - Production database setup

## Features

### Analytics Dashboard
- Real-time patient metrics and KPIs
- Revenue tracking and financial analytics
- Appointment statistics and trends
- Department performance monitoring
- Interactive charts and visualizations

### Backend API
- RESTful endpoints with proper HTTP methods
- PostgreSQL query optimization
- Comprehensive error handling
- Request validation
- CORS configuration
- Health check endpoints

### Database Design
- Normalized schemas for healthcare data
- Proper indexing for performance
- Migration system for version control
- Sample seed data for demonstration

## Quick Start

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/ayothedoc3/med-analytics-dashboard
cd med-analytics-dashboard
```

2. **Install dependencies**
```bash
npm install
cd apps/backend && npm install
cd ../frontend && npm install
cd ../..
```

3. **Start PostgreSQL with Docker**
```bash
npm run docker:up
```

4. **Run database migrations**
```bash
npm run db:migrate
```

5. **Start development servers**
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:4000
- Swagger Docs: http://localhost:4000/api/docs

## Project Structure

```
med-analytics-dashboard/
├── apps/
│   ├── backend/          # Nest.js API server
│   │   ├── src/
│   │   │   ├── modules/  # Feature modules
│   │   │   ├── entities/ # TypeORM entities
│   │   │   ├── dto/      # Data transfer objects
│   │   │   └── main.ts   # Application entry
│   │   └── test/         # E2E tests
│   └── frontend/         # Next.js application
│       ├── src/
│       │   ├── app/      # App router pages
│       │   ├── components/ # React components
│       │   ├── lib/      # Utilities
│       │   └── types/    # TypeScript types
│       └── public/       # Static assets
├── docker-compose.yml    # Docker orchestration
├── .github/
│   └── workflows/        # CI/CD pipelines
└── package.json          # Workspace configuration
```

## API Endpoints

### Analytics
- `GET /api/analytics/overview` - Dashboard overview metrics
- `GET /api/analytics/revenue` - Revenue data by period
- `GET /api/analytics/patients` - Patient statistics
- `GET /api/analytics/appointments` - Appointment trends

### Health
- `GET /api/health` - Health check endpoint

Full API documentation available at `/api/docs` when running.

## Development

### Run Backend Only
```bash
npm run backend:dev
```

### Run Frontend Only
```bash
npm run frontend:dev
```

### Build for Production
```bash
npm run backend:build
npm run frontend:build
```

### Docker Commands
```bash
# Start services
npm run docker:up

# Stop services
npm run docker:down

# View logs
docker-compose logs -f
```

## Testing

### Backend Tests
```bash
cd apps/backend
npm run test          # Unit tests
npm run test:e2e      # E2E tests
npm run test:cov      # Coverage report
```

## Performance Optimizations

- PostgreSQL indexing on frequently queried columns
- Database connection pooling
- Query result caching
- Optimized API response times (<100ms average)
- Efficient data aggregation queries

## Security

- Input validation on all endpoints
- SQL injection prevention via TypeORM
- CORS configuration
- Environment variable management
- Error handling without sensitive data exposure

## Skills Demonstrated

This MVP showcases:
- ✅ Backend architecture with Nest.js & Node.js
- ✅ PostgreSQL database design & optimization
- ✅ RESTful API development with TypeScript
- ✅ Frontend development with Next.js & React
- ✅ Modern UI with Tailwind CSS
- ✅ Docker containerization
- ✅ CI/CD pipeline setup
- ✅ API documentation with Swagger
- ✅ Healthcare domain knowledge
- ✅ Production-ready code practices

## Author

**Ayokunle Ademola-John**
- Backend Engineer | Healthcare Technology Specialist
- MD, MPH
- GitHub: [@ayothedoc3](https://github.com/ayothedoc3)
- Email: ayothedoc3@gmail.com

## License

MIT License - Free to use for portfolio and demonstration purposes.
