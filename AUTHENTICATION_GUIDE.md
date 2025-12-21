# Authentication System Guide

## Overview
The authentication system has been fixed and is now working smoothly. Users can register, login, and access protected routes properly.

## Key Features

### 1. **User Registration**
- Navigate to `/register` or click "Sign Up" in the header
- Fill in:
  - First Name
  - Last Name
  - Email (must be unique)
  - Password (minimum 6 characters)
  - Confirm Password
- After successful registration, you'll be redirected to the homepage and automatically logged in

### 2. **User Login**
- Navigate to `/login` or click "Login" in the header
- Enter your email and password
- Check "Do not logout" to stay logged in
- Demo credentials:
  - **User**: `user@user.com` / `password`
  - **Admin**: `admin@admin.com` / `password`

### 3. **Authentication States**

#### When Logged Out:
- Can access: Homepage, Product List, Product Details, Cart
- Cannot access: User Profile, User Orders, Admin Pages
- Header shows: "Login" and "Sign Up" buttons

#### When Logged In (Regular User):
- Can access: All public pages + User Profile, User Orders
- Cannot access: Admin Pages
- Header shows: User menu with "My Orders", "My Profile", "Logout"

#### When Logged In (Admin):
- Can access: All pages including Admin Dashboard
- Header shows: "Admin" link + User menu with all options

### 4. **Protected Routes**
The `ProtectedRoutesComponent` now properly checks:
- If user is logged in (checks localStorage for userInfo)
- If user has valid token
- If admin access is required (checks isAdmin flag)
- Redirects to `/login` if authentication fails

### 5. **Token Management**
- JWT tokens are stored in localStorage as part of `userInfo`
- Tokens are automatically sent with API requests via axios interceptor
- Tokens expire after 30 days
- On token expiration or 401 errors, user is automatically logged out

## Testing the Authentication

### Test User Registration:
1. Go to http://localhost:3000/register
2. Fill in the form with new user details
3. Submit
4. Verify you're redirected to homepage and logged in
5. Check header shows your username

### Test User Login:
1. Go to http://localhost:3000/login
2. Use demo credentials: `user@user.com` / `password`
3. Submit
4. Verify redirect to `/user` page
5. Check header shows "My Orders" and "My Profile"

### Test Admin Login:
1. Go to http://localhost:3000/login
2. Use admin credentials: `admin@admin.com` / `password`
3. Submit
4. Verify redirect to `/admin/orders` page
5. Check header shows "Admin" link

### Test Protected Routes:
1. Log out if logged in
2. Try to access http://localhost:3000/user
3. Verify redirect to `/login`
4. Login as regular user
5. Try to access http://localhost:3000/admin/orders
6. Verify redirect to `/login` (user not admin)
7. Login as admin
8. Access http://localhost:3000/admin/orders
9. Verify access granted

## Technical Details

### Backend Changes:
- **userController.js**: Register and login now work with both MongoDB and mock database
- **auth.js middleware**: Updated to support mock database for token verification
- **mockAuthDB.js**: In-memory database for authentication without MongoDB

### Frontend Changes:
- **ProtectedRoutesComponent.js**: Now properly validates authentication state
- **LoginPage.js**: Already working correctly
- **RegisterPage.js**: Already working correctly
- **HeaderComponent.js**: Already working correctly with proper user state management

### API Endpoints:
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update user profile (protected)

## Common Issues and Solutions

### Issue: "Not authorized, token failed"
**Solution**: Token expired or invalid. Clear localStorage and login again.
```javascript
localStorage.removeItem('userInfo');
```

### Issue: Still seeing "Login" after successful login
**Solution**: Check if userInfo is in localStorage:
```javascript
console.log(localStorage.getItem('userInfo'));
```
If empty, the API response might be failing. Check browser console for errors.

### Issue: Can access admin pages as regular user
**Solution**: This has been fixed in ProtectedRoutesComponent. If still happening:
1. Clear localStorage
2. Refresh page
3. Login again

### Issue: Registration doesn't redirect
**Solution**: Check browser console for API errors. Backend might not be running.

## Security Features
- Passwords are hashed with bcrypt (10 salt rounds)
- JWT tokens for stateless authentication
- Protected routes on both frontend and backend
- Admin-only routes require both authentication and admin flag
- Automatic logout on token expiration or invalid token

## Development Notes
- Backend runs on: http://localhost:5000
- Frontend runs on: http://localhost:3000
- No MongoDB required - uses in-memory mock database
- All demo users created on server startup

## Next Steps
To further enhance the system:
1. Add email verification
2. Add password reset functionality
3. Add refresh token mechanism
4. Add rate limiting for login attempts
5. Add two-factor authentication (2FA)
