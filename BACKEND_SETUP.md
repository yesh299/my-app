# Backend Instructions

## Setup Complete! 🎉

Your backend has been created successfully with all necessary files and configurations.

## Quick Start Guide

### 1. Install MongoDB (Choose One Option)

**Option A: Local MongoDB (Windows)**
- Download and install MongoDB Community Server from: https://www.mongodb.com/try/download/community
- Run MongoDB: `mongod` in a terminal
- Default connection: `mongodb://localhost:27017`

**Option B: MongoDB Atlas (Cloud - Recommended)**
- Create free account at: https://www.mongodb.com/cloud/atlas
- Create a cluster
- Get your connection string
- Update `backend\.env` file with your MongoDB Atlas URI

### 2. Start the Backend Server

Open a new terminal and run:

```powershell
cd d:\myapp\backend
npm run dev
```

The server will start on http://localhost:5000

### 3. Seed the Database (Optional but Recommended)

In another terminal:

```powershell
cd d:\myapp\backend
npm run seed
```

This will create:
- Sample products (10 products across all categories)
- Admin user: admin@thakurshop.com / admin123
- Test user: john@example.com / password123

### 4. Test the API

Open browser or Postman and test:
- http://localhost:5000 (API info)
- http://localhost:5000/api/products (Get all products)
- http://localhost:5000/api/users/login (POST - Login)

## API Endpoints Summary

### Public Routes
- POST /api/users/register - Register
- POST /api/users/login - Login
- GET /api/products - Get all products
- GET /api/products/:id - Get product details

### Protected Routes (Require Login)
- GET /api/users/profile - Get profile
- PUT /api/users/profile - Update profile
- GET /api/cart - Get cart
- POST /api/cart - Add to cart
- POST /api/orders - Create order
- GET /api/orders/myorders - Get my orders

### Admin Routes (Require Admin Access)
- GET /api/admin/users - Manage users
- POST /api/admin/products - Create product
- GET /api/admin/orders - View all orders
- GET /api/admin/analytics - Dashboard stats

## Environment Variables

Check `backend\.env` file and update if needed:
- MONGO_URI - Your MongoDB connection string
- JWT_SECRET - Secret key for JWT tokens
- PORT - Server port (default: 5000)

## Troubleshooting

**MongoDB Connection Error:**
- Make sure MongoDB is running
- Check MONGO_URI in .env file
- For Atlas, whitelist your IP address

**Port Already in Use:**
- Change PORT in .env file
- Or kill the process using port 5000

## Next Steps

1. Start MongoDB
2. Run `npm run dev` in backend folder
3. Run `npm run seed` to populate database
4. Test API endpoints
5. Connect frontend to backend (update frontend to use http://localhost:5000/api)

## Project Structure

```
backend/
├── config/
│   └── db.js                 # Database connection
├── controllers/              # Business logic
│   ├── userController.js
│   ├── productController.js
│   ├── orderController.js
│   ├── cartController.js
│   └── adminController.js
├── middleware/
│   └── auth.js               # JWT authentication
├── models/                   # Database schemas
│   ├── User.js
│   ├── Product.js
│   ├── Order.js
│   └── Cart.js
├── routes/                   # API routes
│   ├── userRoutes.js
│   ├── productRoutes.js
│   ├── orderRoutes.js
│   ├── cartRoutes.js
│   └── adminRoutes.js
├── .env                      # Environment variables
├── .env.example              # Example env file
├── server.js                 # Main server file
├── seeder.js                 # Database seeder
├── package.json
└── README.md
```

## Support

Email: tyesh4804@gmail.com
Phone: +91 7644997168
