# API Testing Script for Thakur Online Shop
# Tests all backend endpoints to verify functionality

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  THAKUR ONLINE SHOP - API TESTER" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

$baseUrl = "http://localhost:5000/api"
$token = ""
$testResults = @()

function Test-Endpoint {
    param(
        [string]$Name,
        [string]$Url,
        [string]$Method = "GET",
        [hashtable]$Body = @{},
        [hashtable]$Headers = @{}
    )
    
    Write-Host "Testing: $Name..." -NoNewline
    
    try {
        if ($Method -eq "GET") {
            $response = Invoke-RestMethod -Uri $Url -Method $Method -Headers $Headers -ErrorAction Stop
        } else {
            $jsonBody = $Body | ConvertTo-Json
            $Headers["Content-Type"] = "application/json"
            $response = Invoke-RestMethod -Uri $Url -Method $Method -Body $jsonBody -Headers $Headers -ErrorAction Stop
        }
        
        Write-Host " ✓ PASS" -ForegroundColor Green
        $script:testResults += @{ Name = $Name; Status = "PASS"; Response = $response }
        return $response
    }
    catch {
        Write-Host " ✗ FAIL" -ForegroundColor Red
        Write-Host "  Error: $($_.Exception.Message)" -ForegroundColor Red
        $script:testResults += @{ Name = $Name; Status = "FAIL"; Error = $_.Exception.Message }
        return $null
    }
}

# Check if backend is running
Write-Host "Checking if backend server is running..." -ForegroundColor Yellow
try {
    $health = Invoke-RestMethod -Uri "http://localhost:5000/api/health" -ErrorAction Stop
    Write-Host "✓ Backend server is running`n" -ForegroundColor Green
}
catch {
    Write-Host "✗ Backend server is not running!" -ForegroundColor Red
    Write-Host "Please start the backend server first: cd backend && npm run dev`n" -ForegroundColor Yellow
    exit 1
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  PUBLIC ENDPOINTS (No Auth)" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Test public endpoints
Test-Endpoint -Name "Health Check" -Url "http://localhost:5000/api/health"
Test-Endpoint -Name "Get All Products" -Url "$baseUrl/products"
Test-Endpoint -Name "Get Single Product" -Url "$baseUrl/products/1"
Test-Endpoint -Name "Get Products with Filter" -Url "$baseUrl/products?category=Electronics"
Test-Endpoint -Name "Search Products" -Url "$baseUrl/products?search=laptop"

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  AUTHENTICATION ENDPOINTS" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Test login
$loginData = @{
    email = "user@user.com"
    password = "password"
}
$loginResponse = Test-Endpoint -Name "User Login" -Url "$baseUrl/users/login" -Method "POST" -Body $loginData

if ($loginResponse -and $loginResponse.data.token) {
    $token = $loginResponse.data.token
    Write-Host "`n✓ Login successful! Token obtained.`n" -ForegroundColor Green
} else {
    Write-Host "`n✗ Login failed! Cannot test protected endpoints.`n" -ForegroundColor Red
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  PROTECTED ENDPOINTS (User Auth)" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

if ($token) {
    $authHeaders = @{
        "Authorization" = "Bearer $token"
    }
    
    Test-Endpoint -Name "Get User Profile" -Url "$baseUrl/users/profile" -Headers $authHeaders
    Test-Endpoint -Name "Get User Cart" -Url "$baseUrl/cart" -Headers $authHeaders
    Test-Endpoint -Name "Get User Orders" -Url "$baseUrl/orders" -Headers $authHeaders
    
    # Test add to cart
    $cartData = @{
        productId = "1"
        quantity = 2
    }
    Test-Endpoint -Name "Add to Cart" -Url "$baseUrl/cart/add" -Method "POST" -Body $cartData -Headers $authHeaders
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  ADMIN ENDPOINTS" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Test admin login
$adminLoginData = @{
    email = "admin@admin.com"
    password = "password"
}
$adminLoginResponse = Test-Endpoint -Name "Admin Login" -Url "$baseUrl/users/login" -Method "POST" -Body $adminLoginData

if ($adminLoginResponse -and $adminLoginResponse.data.token) {
    $adminToken = $adminLoginResponse.data.token
    $adminHeaders = @{
        "Authorization" = "Bearer $adminToken"
    }
    
    Test-Endpoint -Name "Get All Orders (Admin)" -Url "$baseUrl/admin/orders" -Headers $adminHeaders
    Test-Endpoint -Name "Get All Users (Admin)" -Url "$baseUrl/admin/users" -Headers $adminHeaders
    Test-Endpoint -Name "Get Dashboard Stats (Admin)" -Url "$baseUrl/admin/dashboard" -Headers $adminHeaders
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  TEST RESULTS SUMMARY" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

$totalTests = $testResults.Count
$passedTests = ($testResults | Where-Object { $_.Status -eq "PASS" }).Count
$failedTests = ($testResults | Where-Object { $_.Status -eq "FAIL" }).Count

Write-Host "Total Tests: $totalTests" -ForegroundColor White
Write-Host "Passed: $passedTests" -ForegroundColor Green
Write-Host "Failed: $failedTests" -ForegroundColor Red

if ($failedTests -eq 0) {
    Write-Host "`n✓ ALL TESTS PASSED! API is fully functional." -ForegroundColor Green
} else {
    Write-Host "`n⚠ Some tests failed. Check errors above." -ForegroundColor Yellow
}

Write-Host "`n========================================`n" -ForegroundColor Cyan

Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
