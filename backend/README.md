# Thakur Online Shop Backend API

Complete REST API for the Thakur Online Shop e-commerce platform.

## Features

- User authentication with JWT
- Product management (CRUD operations)
- Shopping cart functionality
- Order processing
- Admin panel features
- Product reviews and ratings
- User profile management

## Technology Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## Installation

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your MongoDB URI and JWT secret

5. Install and start MongoDB (if using local):
```bash
# Windows (if MongoDB is installed)
mongod

# Or use MongoDB Atlas cloud database
```

6. Seed the database with sample data:
```bash
npm run seed
```

7. Start the server:
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The API will be available at `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile (Protected)
- `PUT /api/users/profile` - Update user profile (Protected)

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products/:id/reviews` - Create product review (Protected)

### Orders
- `POST /api/orders` - Create new order (Protected)
- `GET /api/orders/myorders` - Get user orders (Protected)
- `GET /api/orders/:id` - Get order by ID (Protected)
- `PUT /api/orders/:id/pay` - Update order to paid (Protected)

### Cart
- `GET /api/cart` - Get user cart (Protected)
- `POST /api/cart` - Add item to cart (Protected)
- `PUT /api/cart/:itemId` - Update cart item (Protected)
- `DELETE /api/cart/:itemId` - Remove from cart (Protected)
- `DELETE /api/cart` - Clear cart (Protected)

### Admin Routes
- `GET /api/admin/users` - Get all users (Admin)
- `GET /api/admin/users/:id` - Get user by ID (Admin)
- `PUT /api/admin/users/:id` - Update user (Admin)
- `DELETE /api/admin/users/:id` - Delete user (Admin)
- `POST /api/admin/products` - Create product (Admin)
- `PUT /api/admin/products/:id` - Update product (Admin)
- `DELETE /api/admin/products/:id` - Delete product (Admin)
- `GET /api/admin/orders` - Get all orders (Admin)
- `PUT /api/admin/orders/:id` - Update order status (Admin)
- `GET /api/admin/analytics` - Get dashboard analytics (Admin)

## Default Admin Credentials

After running the seeder:
- **Email:** admin@thakurshop.com
- **Password:** admin123

## Sample User Credentials

- **Email:** john@example.com
- **Password:** password123

## Query Parameters

### Products Endpoint
- `category` - Filter by category
- `search` - Search in name and description
- `minPrice` - Minimum price filter
- `maxPrice` - Maximum price filter
- `minRating` - Minimum rating filter
- `sort` - Sort options: `price-asc`, `price-desc`, `rating`

Example:
```
GET /api/products?category=Electronics&minPrice=100&sort=price-desc
```

## Authentication

Protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## Environment Variables

```
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/thakur-shop
JWT_SECRET=your_jwt_secret_key
```

## Database Models

### User
- name, email, password (hashed)
- isAdmin (boolean)
- phone, address
- timestamps

### Product
- name, description, price
- category, brand, images
- stock, rating, reviewsNumber
- reviews array
- sales count
- timestamps

### Order
- user reference
- orderId (unique)
- items array
- shippingAddress
- paymentMethod, paymentResult
- prices (items, tax, shipping, total)
- status, isPaid, isDelivered
- timestamps

### Cart
- user reference (unique)
- items array
- timestamps

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error message here"
}
```

## Success Responses

```json
{
  "success": true,
  "data": { ... }
}
```

## Development

For development with auto-reload:
```bash
npm run dev
```

## Deployment

1. Set `NODE_ENV=production` in environment
2. Use MongoDB Atlas for production database
3. Set secure JWT_SECRET
4. Deploy to services like Heroku, Railway, or Render

## Support

For issues or questions, contact: tyesh4804@gmail.com
