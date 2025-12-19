const Order = require('../models/Order');
const Product = require('../models/Product');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
exports.createOrder = async (req, res) => {
  try {
    const {
      items,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      total,
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No order items',
      });
    }

    // Generate unique order ID
    const orderId = 'ORD-' + Date.now() + Math.floor(Math.random() * 1000);

    // For COD, mark as not paid. For online payment, wait for payment verification
    const isPaid = paymentMethod === 'Cash on Delivery' ? false : false;

    const order = await Order.create({
      user: req.user._id,
      orderId,
      items,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      total,
      isPaid,
      status: 'Processing',
    });

    // Update product sales and stock
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (product) {
        product.sales += item.quantity;
        product.stock -= item.quantity;
        await product.save();
      }
    }

    res.status(201).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get user orders
// @route   GET /api/orders/myorders
// @access  Private
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (order) {
      // Check if user is authorized to view this order
      if (order.user._id.toString() !== req.user._id.toString() && !req.user.isAdmin) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to view this order',
        });
      }

      res.json({
        success: true,
        data: order,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
exports.updateOrderToPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        updateTime: req.body.update_time,
        emailAddress: req.body.email_address,
      };

      const updatedOrder = await order.save();

      res.json({
        success: true,
        data: updatedOrder,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
