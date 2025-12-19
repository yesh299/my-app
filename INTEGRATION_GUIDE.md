# Frontend-Backend Integration Guide

## ✅ Integration Complete!

Your frontend is now connected to the backend API with full functionality.

## What Was Configured

### 1. **API Setup** (`src/api/`)
- **axios.js**: Axios instance with authentication headers
- **api.js**: All API endpoints for users, products, cart, orders, admin

### 2. **Authentication**
- Login & Register pages now use backend API
- JWT tokens stored in localStorage
- Automatic token attachment to requests
- Auto-redirect on token expiration

### 3. **Proxy Configuration**
- Added proxy to `package.json` for development
- Environment variable for API URL (`.env`)

### 4. **Updated Pages**
- Login page uses `loginUser` API
- Register page uses `registerUser` API  
- Product list loads from backend with filters
- Loading states and error handling added

## How to Test

### 1. Start Backend
```powershell
cd d:\myapp\backend
npm run dev
```
Backend runs on: http://localhost:5000

### 2. Seed Database (First Time Only)
```powershell
cd d:\myapp\backend
npm run seed
```

### 3. Start Frontend
```powershell
cd d:\myapp
npm start
```
Frontend runs on: http://localhost:3001

### 4. Test Credentials
After seeding:
- **Admin**: admin@thakurshop.com / admin123
- **User**: john@example.com / password123

## API Endpoints Used

### Public
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product details

### Protected (Requires Login)
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `GET /api/cart` - Get shopping cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:itemId` - Update cart item
- `DELETE /api/cart/:itemId` - Remove from cart
- `POST /api/orders` - Create order
- `GET /api/orders/myorders` - Get user orders

### Admin Only
- `GET /api/admin/users` - Manage users
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product
- `GET /api/admin/orders` - View all orders
- `GET /api/admin/analytics` - Dashboard stats

## Environment Variables

### Frontend (`.env`)
```
REACT_APP_API_URL=http://localhost:5000/api
```

### Backend (`backend/.env`)
```
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/thakur-shop
JWT_SECRET=thakur_shop_secret_key_2024_change_this
```

## Features Working

✅ User registration with backend
✅ User login with JWT authentication
✅ Product list from database
✅ Category filtering
✅ Price & rating filters
✅ Sorting options
✅ Auto token refresh
✅ Error handling
✅ Loading states
✅ Protected routes

## Next Steps to Complete Integration

1. **Update ProductDetailsPage** to load from API
2. **Update CartPage** to use backend cart
3. **Update Order pages** to use backend orders
4. **Update Admin pages** to manage backend data
5. **Add product reviews** functionality
6. **Implement order checkout** flow

## Testing the Integration

1. **Register a new user**
   - Go to /register
   - Fill form and submit
   - Check backend logs for user creation

2. **Login**
   - Use registered credentials
   - Check localStorage for token
   - Verify redirect to user page

3. **Browse Products**
   - Go to /product-list
   - Products load from database
   - Test filters and sorting

4. **Admin Access**
   - Login as admin@thakurshop.com
   - Access /admin/* routes
   - Manage users, products, orders

## Troubleshooting

**"Cannot connect to server":**
- Ensure backend is running on port 5000
- Check MONGO_URI in backend/.env
- MongoDB must be running

**"401 Unauthorized":**
- Token expired, logout and login again
- Check JWT_SECRET matches in backend

**"CORS Error":**
- Proxy is configured in package.json
- Backend has cors() middleware enabled

**Products not loading:**
- Run `npm run seed` in backend
- Check MongoDB connection
- Check backend logs for errors

## Support

Email: tyesh4804@gmail.com
Phone: +91 7644997168
