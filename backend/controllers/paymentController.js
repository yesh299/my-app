const Razorpay = require('razorpay');
const crypto = require('crypto');
const Order = require('../models/Order');

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_1Xy2DjlKMrKyqR',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'EkuLdBSDjy38K9KsV8mfJvqA',
});

// @desc    Create Razorpay order
// @route   POST /api/payment/create-order
// @access  Private
exports.createPaymentOrder = async (req, res) => {
  try {
    const { amount, orderId, description, customerEmail, customerName } = req.body;

    if (!amount || !orderId) {
      return res.status(400).json({
        success: false,
        message: 'Amount and Order ID are required',
      });
    }

    // Create Razorpay order
    const options = {
      amount: Math.round(amount * 100), // Razorpay expects amount in paise
      currency: 'INR',
      receipt: orderId,
      description: description || 'Thakur Online Shop Purchase',
      customer_notify: 1,
      notes: {
        orderId: orderId,
        customerEmail: customerEmail,
        customerName: customerName,
      },
    };

    const razorpayOrder = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      data: {
        razorpayOrderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        receipt: razorpayOrder.receipt,
        keyId: process.env.RAZORPAY_KEY_ID || 'rzp_test_1Xy2DjlKMrKyqR',
      },
    });
  } catch (error) {
    console.error('Payment order creation error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Verify payment signature
// @route   POST /api/payment/verify
// @access  Private
exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      orderId,
    } = req.body;

    // Generate signature
    const body = razorpayOrderId + '|' + razorpayPaymentId;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'EkuLdBSDjy38K9KsV8mfJvqA')
      .update(body)
      .digest('hex');

    if (expectedSignature === razorpaySignature) {
      // Signature is valid, update order in database
      const order = await Order.findOne({ orderId });

      if (order) {
        order.isPaid = true;
        order.paidAt = new Date();
        order.paymentResult = {
          razorpayPaymentId,
          razorpayOrderId,
          razorpaySignature,
          status: 'COMPLETED',
          method: 'Razorpay',
          amount: order.total,
          currency: 'INR',
          receipt: orderId,
        };
        await order.save();

        res.status(200).json({
          success: true,
          message: 'Payment verified successfully',
          data: order,
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'Order not found',
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: 'Invalid payment signature',
      });
    }
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get payment details
// @route   GET /api/payment/:razorpayPaymentId
// @access  Private
exports.getPaymentDetails = async (req, res) => {
  try {
    const { razorpayPaymentId } = req.params;

    const paymentDetails = await razorpay.payments.fetch(razorpayPaymentId);

    res.status(200).json({
      success: true,
      data: paymentDetails,
    });
  } catch (error) {
    console.error('Get payment details error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Refund payment
// @route   POST /api/payment/refund
// @access  Private/Admin
exports.refundPayment = async (req, res) => {
  try {
    const { razorpayPaymentId, amount } = req.body;

    const refund = await razorpay.payments.refund(razorpayPaymentId, {
      amount: amount ? Math.round(amount * 100) : undefined,
    });

    // Update order status
    const order = await Order.findOne({
      'paymentResult.razorpayPaymentId': razorpayPaymentId,
    });

    if (order) {
      order.status = 'Cancelled';
      order.isPaid = false;
      await order.save();
    }

    res.status(200).json({
      success: true,
      message: 'Refund processed successfully',
      data: refund,
    });
  } catch (error) {
    console.error('Refund error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
