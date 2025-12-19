// In-memory data store for development (without MongoDB)
// This will be replaced by actual database when MongoDB is set up

const { seedProducts } = require('./data/productsSeed');

const users = [
  {
    _id: '1',
    name: 'Admin User',
    email: 'admin@thakurshop.com',
    password: '$2a$10$ZJ8q8K7h8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K', // admin123 hashed
    isAdmin: true,
    phone: '+91 7644997168',
    address: { city: 'Ranchi', state: 'Jharkhand', country: 'India' },
    createdAt: new Date(),
  },
  {
    _id: '2',
    name: 'John Doe',
    email: 'john@example.com',
    password: '$2a$10$ZJ8q8K7h8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K', // password123 hashed
    isAdmin: false,
    phone: '+91 9876543210',
    address: { city: 'Mumbai', state: 'Maharashtra', country: 'India' },
    createdAt: new Date(),
  },
];

let nextId = 1;
const products = seedProducts.map((product) => ({
  ...product,
  _id: String(nextId++),
  reviews: [],
  createdAt: new Date(),
}));

const orders = [];
const carts = {};

module.exports = {
  users,
  products,
  orders,
  carts,
};
