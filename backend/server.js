const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const mockAuthDB = require('./mockAuthDB');

// Load environment variables
dotenv.config();

// Connect to database (non-blocking)
connectDB();

// Initialize mock authentication database
mockAuthDB.initializeMockUsers();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/payment', require('./routes/paymentRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// Welcome route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to Thakur Online Shop API',
    version: '1.0.0',
    endpoints: {
      users: '/api/users',
      products: '/api/products',
      orders: '/api/orders',
      cart: '/api/cart',
      admin: '/api/admin'
    }
  });
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`\n✓ Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  console.log(`✓ API available at http://localhost:${PORT}`);
  console.log(`✓ Auth using mock database (no MongoDB required)`);
  console.log(`✓ Demo: admin@admin.com / password  or  user@user.com / password\n`);
});
