const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  createProduct,
  updateProduct,
  deleteProduct,
  getOrders,
  updateOrderStatus,
  getAnalytics,
} = require('../controllers/adminController');
const { protect, admin } = require('../middleware/auth');

// User management
router.route('/users').get(protect, admin, getUsers);
router
  .route('/users/:id')
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser);

// Product management
router.route('/products').post(protect, admin, createProduct);
router
  .route('/products/:id')
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

// Order management
router.route('/orders').get(protect, admin, getOrders);
router.route('/orders/:id').put(protect, admin, updateOrderStatus);

// Analytics
router.route('/analytics').get(protect, admin, getAnalytics);

module.exports = router;
