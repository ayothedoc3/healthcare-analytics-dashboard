@echo off
REM Medical Analytics Dashboard - Automated Setup Script (Windows)
REM Author: Ayokunle Ademola-John

echo ================================================
echo Medical Analytics Dashboard - Setup
echo ================================================
echo.

REM Check Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/
    exit /b 1
)

REM Check npm
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] npm is not installed. Please install npm.
    exit /b 1
)

REM Check Docker
where docker >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Docker is not installed. Please install Docker from https://docker.com/
    exit /b 1
)

echo [SUCCESS] All prerequisites are installed
echo.

REM Install root dependencies
echo Installing root dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install root dependencies
    exit /b 1
)

REM Install backend dependencies
echo Installing backend dependencies...
cd apps\backend
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install backend dependencies
    exit /b 1
)
cd ..\..

REM Install frontend dependencies
echo Installing frontend dependencies...
cd apps\frontend
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install frontend dependencies
    exit /b 1
)
cd ..\..

echo [SUCCESS] Dependencies installed successfully
echo.

REM Setup environment files
echo Setting up environment files...

if not exist apps\backend\.env (
    copy apps\backend\.env.example apps\backend\.env
    echo [SUCCESS] Created backend .env file
) else (
    echo [WARNING] Backend .env file already exists
)

if not exist apps\frontend\.env (
    copy apps\frontend\.env.example apps\frontend\.env
    echo [SUCCESS] Created frontend .env file
) else (
    echo [WARNING] Frontend .env file already exists
)

echo.

REM Start PostgreSQL
echo Starting PostgreSQL database...
docker-compose up -d postgres
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to start PostgreSQL
    exit /b 1
)

echo Waiting for PostgreSQL to be ready...
timeout /t 10 /nobreak >nul

echo [SUCCESS] PostgreSQL is running
echo.

REM Seed database
echo Seeding database with sample data...
cd apps\backend
call npm run seed
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to seed database
    exit /b 1
)
cd ..\..

echo [SUCCESS] Database seeded successfully
echo.

REM Summary
echo ================================================
echo Setup completed successfully!
echo ================================================
echo.
echo To start the application:
echo.
echo   npm run dev
echo.
echo Then open your browser:
echo.
echo   Frontend Dashboard: http://localhost:3000
echo   Backend API:        http://localhost:4000/api
echo   Swagger Docs:       http://localhost:4000/api/docs
echo.
echo For more information, see SETUP.md
echo.

pause
