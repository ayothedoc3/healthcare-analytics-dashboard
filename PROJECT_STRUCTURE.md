# Project Structure

Complete file structure of the Medical Analytics Dashboard.

```
med-analytics-dashboard/
│
├── .github/
│   └── workflows/
│       └── ci.yml                          # GitHub Actions CI/CD pipeline
│
├── apps/
│   ├── backend/                            # Nest.js Backend Application
│   │   ├── src/
│   │   │   ├── config/
│   │   │   │   └── typeorm.config.ts      # TypeORM configuration
│   │   │   │
│   │   │   ├── dto/
│   │   │   │   └── analytics-query.dto.ts # Analytics query validation
│   │   │   │
│   │   │   ├── entities/
│   │   │   │   ├── patient.entity.ts      # Patient database model
│   │   │   │   ├── appointment.entity.ts   # Appointment database model
│   │   │   │   └── revenue.entity.ts       # Revenue database model
│   │   │   │
│   │   │   ├── modules/
│   │   │   │   ├── analytics/
│   │   │   │   │   ├── analytics.controller.ts  # Analytics API endpoints
│   │   │   │   │   ├── analytics.service.ts     # Analytics business logic
│   │   │   │   │   └── analytics.module.ts      # Analytics module definition
│   │   │   │   │
│   │   │   │   ├── health/
│   │   │   │   │   ├── health.controller.ts     # Health check endpoint
│   │   │   │   │   └── health.module.ts         # Health module definition
│   │   │   │   │
│   │   │   │   └── seed/
│   │   │   │       ├── seed.service.ts          # Database seeding logic
│   │   │   │       └── seed.module.ts           # Seed module definition
│   │   │   │
│   │   │   ├── app.module.ts              # Root application module
│   │   │   ├── main.ts                    # Application entry point
│   │   │   └── seed.ts                    # Seed script runner
│   │   │
│   │   ├── test/                          # Test files
│   │   ├── .env.example                   # Environment variables template
│   │   ├── Dockerfile                     # Backend Docker configuration
│   │   ├── nest-cli.json                  # Nest.js CLI configuration
│   │   ├── package.json                   # Backend dependencies
│   │   └── tsconfig.json                  # TypeScript configuration
│   │
│   └── frontend/                          # Next.js Frontend Application
│       ├── src/
│       │   ├── app/
│       │   │   ├── globals.css           # Global styles
│       │   │   ├── layout.tsx            # Root layout component
│       │   │   └── page.tsx              # Dashboard page (main)
│       │   │
│       │   ├── components/
│       │   │   ├── StatCard.tsx          # KPI stat card component
│       │   │   ├── RevenueChart.tsx      # Revenue line chart component
│       │   │   ├── DepartmentTable.tsx   # Department performance table
│       │   │   └── PatientDemographics.tsx # Patient charts component
│       │   │
│       │   ├── lib/
│       │   │   ├── api.ts                # API client for backend calls
│       │   │   └── utils.ts              # Utility functions (formatting)
│       │   │
│       │   └── types/
│       │       └── analytics.ts          # TypeScript type definitions
│       │
│       ├── public/                       # Static assets
│       ├── .env.example                  # Environment variables template
│       ├── Dockerfile                    # Frontend Docker configuration
│       ├── next.config.js                # Next.js configuration
│       ├── package.json                  # Frontend dependencies
│       ├── postcss.config.js             # PostCSS configuration
│       ├── tailwind.config.ts            # Tailwind CSS configuration
│       └── tsconfig.json                 # TypeScript configuration
│
├── .gitignore                            # Git ignore rules
├── docker-compose.yml                    # Multi-container orchestration
├── package.json                          # Root workspace configuration
│
├── ARCHITECTURE.md                       # Technical architecture documentation
├── LICENSE                               # MIT License
├── PROJECT_STRUCTURE.md                  # This file
├── PROJECT_SUMMARY.md                    # Skills showcase document
├── QUICK_START.md                        # Quick start guide
├── README.md                             # Main project documentation
├── SETUP.md                              # Detailed setup instructions
├── setup.sh                              # Automated setup script (Unix)
└── setup.bat                             # Automated setup script (Windows)
```

## File Descriptions

### Root Level

| File | Purpose |
|------|---------|
| `docker-compose.yml` | Orchestrates PostgreSQL, backend, and frontend containers |
| `package.json` | Workspace configuration for monorepo |
| `.gitignore` | Specifies files to exclude from version control |
| `LICENSE` | MIT License for the project |

### Documentation Files

| File | Purpose |
|------|---------|
| `README.md` | Main project overview and features |
| `QUICK_START.md` | 5-minute getting started guide |
| `SETUP.md` | Detailed installation and troubleshooting |
| `ARCHITECTURE.md` | Technical architecture and system design |
| `PROJECT_SUMMARY.md` | Skills demonstration and code highlights |
| `PROJECT_STRUCTURE.md` | This file - complete file structure |

### Setup Scripts

| File | Purpose |
|------|---------|
| `setup.sh` | Automated setup for macOS/Linux |
| `setup.bat` | Automated setup for Windows |

### Backend Files (`apps/backend/`)

#### Configuration
- `nest-cli.json` - Nest.js CLI settings
- `tsconfig.json` - TypeScript compiler options
- `.env.example` - Environment variable template
- `Dockerfile` - Container image definition

#### Source Code (`src/`)

**Entry Points:**
- `main.ts` - Application startup and configuration
- `app.module.ts` - Root module with dependencies
- `seed.ts` - Database seeding script

**Configuration:**
- `config/typeorm.config.ts` - Database connection settings

**Data Transfer Objects (DTOs):**
- `dto/analytics-query.dto.ts` - Input validation for analytics queries

**Database Entities:**
- `entities/patient.entity.ts` - Patient table schema
- `entities/appointment.entity.ts` - Appointment table schema
- `entities/revenue.entity.ts` - Revenue table schema

**Modules:**

*Analytics Module:*
- `modules/analytics/analytics.controller.ts` - REST endpoints
- `modules/analytics/analytics.service.ts` - Business logic
- `modules/analytics/analytics.module.ts` - Module definition

*Health Module:*
- `modules/health/health.controller.ts` - Health check endpoint
- `modules/health/health.module.ts` - Module definition

*Seed Module:*
- `modules/seed/seed.service.ts` - Sample data generation
- `modules/seed/seed.module.ts` - Module definition

### Frontend Files (`apps/frontend/`)

#### Configuration
- `next.config.js` - Next.js framework settings
- `tailwind.config.ts` - Tailwind CSS customization
- `postcss.config.js` - CSS processing
- `tsconfig.json` - TypeScript compiler options
- `.env.example` - Environment variable template
- `Dockerfile` - Container image definition

#### Source Code (`src/`)

**Application (`app/`):**
- `layout.tsx` - Root layout with metadata
- `page.tsx` - Main dashboard page
- `globals.css` - Global styles and Tailwind imports

**Components (`components/`):**
- `StatCard.tsx` - Reusable KPI card component
- `RevenueChart.tsx` - Line chart for revenue trends
- `DepartmentTable.tsx` - Table for department metrics
- `PatientDemographics.tsx` - Bar and pie charts

**Utilities (`lib/`):**
- `api.ts` - Type-safe API client
- `utils.ts` - Formatting and helper functions

**Types (`types/`):**
- `analytics.ts` - TypeScript interfaces for all data models

### CI/CD Files (`.github/`)

**Workflows:**
- `workflows/ci.yml` - GitHub Actions pipeline
  - Backend tests and build
  - Frontend tests and build
  - Docker image creation

## Key Design Patterns

### Backend Architecture
```
Controller → Service → Repository → Database
     ↓          ↓           ↓
   DTOs   Business Logic  Entities
```

### Frontend Architecture
```
Page → API Client → Components
  ↓         ↓           ↓
State    Types      Utilities
```

### Data Flow
```
User → Frontend → API → Service → Repository → Database
  ↑                                                ↓
  └────────────── Response ←─────────────────────┘
```

## Technology Stack by File Type

### TypeScript Files (.ts, .tsx)
- Backend: Nest.js controllers, services, entities
- Frontend: React components, API client, utilities

### Configuration Files
- JSON: package.json, tsconfig.json, nest-cli.json
- JavaScript: next.config.js, postcss.config.js
- YAML: ci.yml, docker-compose.yml

### Style Files
- CSS: globals.css (with Tailwind directives)
- Config: tailwind.config.ts

### Documentation Files
- Markdown: README.md, SETUP.md, etc.

### Scripts
- Shell: setup.sh (Unix/Linux/macOS)
- Batch: setup.bat (Windows)

## Code Organization Principles

1. **Separation of Concerns**: Each file has a single, clear responsibility

2. **Modularity**: Features organized into self-contained modules

3. **Type Safety**: TypeScript throughout for compile-time checks

4. **Reusability**: Components and utilities designed for reuse

5. **Scalability**: Structure supports adding new features easily

6. **Maintainability**: Clear naming and file organization

## File Naming Conventions

### Backend
- Controllers: `*.controller.ts`
- Services: `*.service.ts`
- Entities: `*.entity.ts`
- DTOs: `*.dto.ts`
- Modules: `*.module.ts`

### Frontend
- Components: `PascalCase.tsx`
- Utilities: `camelCase.ts`
- Pages: `page.tsx` (Next.js convention)
- Types: `camelCase.ts`

### Configuration
- Nest.js: `nest-cli.json`
- TypeScript: `tsconfig.json`
- Next.js: `next.config.js`
- Docker: `Dockerfile`, `docker-compose.yml`

## Total File Count

- **Backend**: ~20 TypeScript files
- **Frontend**: ~15 TypeScript/TSX files
- **Configuration**: ~15 config files
- **Documentation**: 7 Markdown files
- **Scripts**: 2 setup scripts
- **Total**: 50+ files

## Lines of Code Estimate

- **Backend**: ~2,000 lines
- **Frontend**: ~1,500 lines
- **Configuration**: ~500 lines
- **Documentation**: ~3,000 lines
- **Total**: ~7,000 lines

## Dependencies

### Backend Dependencies (Node Modules)
- Production: ~15 packages
- Development: ~20 packages

### Frontend Dependencies (Node Modules)
- Production: ~10 packages
- Development: ~10 packages

---

This structure demonstrates professional organization, clear separation of concerns, and scalable architecture suitable for production applications.
