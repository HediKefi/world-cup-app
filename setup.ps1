# Quick Start Script for World Cup App

Write-Host "🚀 World Cup 2026 App - Quick Start Setup" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

# Check if PostgreSQL is running
Write-Host "📦 Step 1: Checking PostgreSQL..." -ForegroundColor Yellow
try {
    $pgStatus = psql -U postgres -c "SELECT version();" 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ PostgreSQL is running" -ForegroundColor Green
    } else {
        Write-Host "⚠️  PostgreSQL might not be running. Please start PostgreSQL first." -ForegroundColor Red
        Write-Host "   You can start it with: pg_ctl start" -ForegroundColor Gray
    }
} catch {
    Write-Host "⚠️  Could not connect to PostgreSQL. Make sure it's installed and running." -ForegroundColor Red
}

Write-Host ""

# Backend Setup
Write-Host "🔧 Step 2: Setting up Backend..." -ForegroundColor Yellow
Set-Location backend

Write-Host "   Installing backend dependencies..." -ForegroundColor Gray
npm install

Write-Host "   Generating Prisma Client..." -ForegroundColor Gray
npm run prisma:generate

Write-Host "   Running database migrations..." -ForegroundColor Gray
npm run prisma:migrate

Write-Host "   Seeding database with initial data..." -ForegroundColor Gray
npm run seed

Write-Host "✅ Backend setup complete!" -ForegroundColor Green
Write-Host ""

# Frontend Setup
Write-Host "🎨 Step 3: Setting up Frontend..." -ForegroundColor Yellow
Set-Location ../frontend

Write-Host "   Installing frontend dependencies..." -ForegroundColor Gray
npm install

Write-Host "✅ Frontend setup complete!" -ForegroundColor Green
Write-Host ""

# Final Instructions
Write-Host "✨ Setup Complete!" -ForegroundColor Cyan
Write-Host "==================" -ForegroundColor Cyan
Write-Host ""
Write-Host "To start the application:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Start the backend (in the backend directory):" -ForegroundColor White
Write-Host "   cd backend" -ForegroundColor Gray
Write-Host "   npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Start the frontend (in a new terminal, in the frontend directory):" -ForegroundColor White
Write-Host "   cd frontend" -ForegroundColor Gray
Write-Host "   npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Access the application:" -ForegroundColor White
Write-Host "   Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "   Backend:  http://localhost:3001" -ForegroundColor Cyan
Write-Host "   Admin:    http://localhost:3000/admin/login (admin/admin)" -ForegroundColor Cyan
Write-Host ""

Set-Location ..
