const express = require('express');
const router = express.Router();
const {
  createPaymentOrder,
  verifyPayment,
  getPaymentDetails,
  refundPayment,
} = require('../controllers/paymentController');
const { protect } = require('../middleware/auth');

// Create Razorpay order
router.post('/create-order', createPaymentOrder);

// Verify payment signature
router.post('/verify', verifyPayment);

// Get payment details
router.get('/:razorpayPaymentId', getPaymentDetails);

// Refund payment
router.post('/refund', protect, refundPayment);

module.exports = router;
