# Thakur Online Shop - Startup Script
# This script starts both backend and frontend servers

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  THAKUR ONLINE SHOP - STARTUP SCRIPT" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Check if Node.js is installed
Write-Host "✓ Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "  Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js is not installed. Please install Node.js from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Check if npm is installed
try {
    $npmVersion = npm --version
    Write-Host "  npm version: $npmVersion`n" -ForegroundColor Green
} catch {
    Write-Host "✗ npm is not installed." -ForegroundColor Red
    exit 1
}

# Check if backend dependencies are installed
Write-Host "✓ Checking backend dependencies..." -ForegroundColor Yellow
if (-not (Test-Path ".\backend\node_modules")) {
    Write-Host "  Installing backend dependencies..." -ForegroundColor Yellow
    Set-Location backend
    npm install
    Set-Location ..
}
Write-Host "  Backend dependencies ready`n" -ForegroundColor Green

# Check if frontend dependencies are installed
Write-Host "✓ Checking frontend dependencies..." -ForegroundColor Yellow
if (-not (Test-Path ".\node_modules")) {
    Write-Host "  Installing frontend dependencies..." -ForegroundColor Yellow
    npm install
}
Write-Host "  Frontend dependencies ready`n" -ForegroundColor Green

# Display startup information
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  STARTING SERVERS" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "Backend Server:" -ForegroundColor Yellow
Write-Host "  URL: http://localhost:5000" -ForegroundColor White
Write-Host "  API: http://localhost:5000/api`n" -ForegroundColor White

Write-Host "Frontend Server:" -ForegroundColor Yellow
Write-Host "  URL: http://localhost:3000`n" -ForegroundColor White

Write-Host "Demo Accounts:" -ForegroundColor Yellow
Write-Host "  Admin:  admin@admin.com / password" -ForegroundColor White
Write-Host "  User:   user@user.com / password`n" -ForegroundColor White

Write-Host "========================================`n" -ForegroundColor Cyan

# Start backend server in a new window
Write-Host "✓ Starting backend server..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\backend'; Write-Host 'BACKEND SERVER' -ForegroundColor Cyan; npm run dev"

# Wait a bit for backend to start
Start-Sleep -Seconds 3

# Start frontend server in a new window
Write-Host "✓ Starting frontend server...`n" -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; Write-Host 'FRONTEND SERVER' -ForegroundColor Cyan; npm start"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  SERVERS STARTED SUCCESSFULLY!" -ForegroundColor Green
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "The application will open automatically in your browser." -ForegroundColor Yellow
Write-Host "If it doesn't, navigate to http://localhost:3000`n" -ForegroundColor Yellow

Write-Host "Press any key to exit this window..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
