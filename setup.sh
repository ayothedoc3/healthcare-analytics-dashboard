#!/bin/bash

# Medical Analytics Dashboard - Automated Setup Script
# Author: Ayokunle Ademola-John

set -e

echo "================================================"
echo "Medical Analytics Dashboard - Setup"
echo "================================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Print colored message
print_message() {
    echo -e "${2}${1}${NC}"
}

# Check prerequisites
print_message "Checking prerequisites..." "$YELLOW"

if ! command_exists node; then
    print_message "❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/" "$RED"
    exit 1
fi

if ! command_exists npm; then
    print_message "❌ npm is not installed. Please install npm." "$RED"
    exit 1
fi

if ! command_exists docker; then
    print_message "❌ Docker is not installed. Please install Docker from https://docker.com/" "$RED"
    exit 1
fi

print_message "✅ All prerequisites are installed" "$GREEN"
echo ""

# Install root dependencies
print_message "Installing root dependencies..." "$YELLOW"
npm install

# Install backend dependencies
print_message "Installing backend dependencies..." "$YELLOW"
cd apps/backend
npm install
cd ../..

# Install frontend dependencies
print_message "Installing frontend dependencies..." "$YELLOW"
cd apps/frontend
npm install
cd ../..

print_message "✅ Dependencies installed successfully" "$GREEN"
echo ""

# Setup environment files
print_message "Setting up environment files..." "$YELLOW"

if [ ! -f apps/backend/.env ]; then
    cp apps/backend/.env.example apps/backend/.env
    print_message "✅ Created backend .env file" "$GREEN"
else
    print_message "⚠️  Backend .env file already exists" "$YELLOW"
fi

if [ ! -f apps/frontend/.env ]; then
    cp apps/frontend/.env.example apps/frontend/.env
    print_message "✅ Created frontend .env file" "$GREEN"
else
    print_message "⚠️  Frontend .env file already exists" "$YELLOW"
fi

echo ""

# Start PostgreSQL
print_message "Starting PostgreSQL database..." "$YELLOW"
docker-compose up -d postgres

print_message "Waiting for PostgreSQL to be ready..." "$YELLOW"
sleep 10

print_message "✅ PostgreSQL is running" "$GREEN"
echo ""

# Seed database
print_message "Seeding database with sample data..." "$YELLOW"
cd apps/backend
npm run seed
cd ../..

print_message "✅ Database seeded successfully" "$GREEN"
echo ""

# Summary
print_message "================================================" "$GREEN"
print_message "Setup completed successfully!" "$GREEN"
print_message "================================================" "$GREEN"
echo ""
print_message "To start the application:" "$YELLOW"
echo ""
echo "  npm run dev"
echo ""
print_message "Then open your browser:" "$YELLOW"
echo ""
echo "  Frontend Dashboard: http://localhost:3000"
echo "  Backend API:        http://localhost:4000/api"
echo "  Swagger Docs:       http://localhost:4000/api/docs"
echo ""
print_message "For more information, see SETUP.md" "$YELLOW"
echo ""
