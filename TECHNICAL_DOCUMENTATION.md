# 📚 Technical Documentation - Thakur Online Shop

## Architecture Overview

```
┌─────────────────────────────────────────────────┐
│           Frontend (React)                       │
│  - Product Browse & Catalog                     │
│  - Shopping Cart Management                     │
│  - Checkout & Payment UI                        │
│  - Order Tracking & History                     │
│  - User Authentication                          │
└────────────────┬────────────────────────────────┘
                 │ API Calls (Axios)
                 ↓
┌─────────────────────────────────────────────────┐
│        Backend (Node.js/Express)                │
│  - API Routes & Controllers                     │
│  - Razorpay Integration                         │
│  - Order Management                             │
│  - User Authentication (JWT)                    │
│  - Product Management                           │
└────────────────┬────────────────────────────────┘
                 │ Database Queries
                 ↓
┌─────────────────────────────────────────────────┐
│        MongoDB Database                         │
│  - Users Collection                             │
│  - Products Collection                          │
│  - Orders Collection                            │
│  - Cart Collection                              │
└─────────────────────────────────────────────────┘
                 │
                 ↓
        ┌───────────────────┐
        │  Razorpay API     │
        │  Payment Gateway  │
        └───────────────────┘
```

## API Endpoints

### Payment Endpoints

#### 1. Create Razorpay Order
```
POST /api/payment/create-order
Headers: 
  Content-Type: application/json

Request Body:
{
  "amount": 5000,
  "orderId": "ORD-1234567890",
  "description": "Order from Thakur Online Shop",
  "customerEmail": "customer@example.com",
  "customerName": "John Doe"
}

Response:
{
  "success": true,
  "data": {
    "razorpayOrderId": "order_xxx",
    "amount": 500000,
    "currency": "INR",
    "receipt": "ORD-1234567890",
    "keyId": "rzp_test_xxx"
  }
}
```

#### 2. Verify Payment
```
POST /api/payment/verify
Headers:
  Content-Type: application/json

Request Body:
{
  "razorpayOrderId": "order_xxx",
  "razorpayPaymentId": "pay_xxx",
  "razorpaySignature": "signature_xxx",
  "orderId": "ORD-1234567890"
}

Response:
{
  "success": true,
  "message": "Payment verified successfully",
  "data": {
    "orderId": "ORD-1234567890",
    "isPaid": true,
    "paymentResult": {
      "razorpayPaymentId": "pay_xxx",
      "razorpayOrderId": "order_xxx",
      "status": "COMPLETED"
    }
  }
}
```

#### 3. Get Payment Details
```
GET /api/payment/:razorpayPaymentId
Response: Payment object with all details
```

#### 4. Refund Payment
```
POST /api/payment/refund
Headers:
  Authorization: Bearer {JWT_TOKEN}
  Content-Type: application/json

Request Body:
{
  "razorpayPaymentId": "pay_xxx",
  "amount": 5000  // Optional: partial refund
}

Response:
{
  "success": true,
  "message": "Refund processed successfully",
  "data": { refund object }
}
```

### Order Endpoints

#### 1. Create Order
```
POST /api/orders
Headers:
  Authorization: Bearer {JWT_TOKEN}
  Content-Type: application/json

Request Body:
{
  "items": [
    {
      "product": "product_id",
      "name": "Product Name",
      "quantity": 2,
      "price": 1000,
      "image": "url"
    }
  ],
  "shippingAddress": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "address": "123 Main St",
    "city": "Mumbai",
    "state": "Maharashtra",
    "postalCode": "400001",
    "country": "India"
  },
  "paymentMethod": "Razorpay",
  "itemsPrice": 2000,
  "taxPrice": 360,
  "shippingPrice": 0,
  "total": 2360
}
```

#### 2. Get User Orders
```
GET /api/orders/myorders
Headers:
  Authorization: Bearer {JWT_TOKEN}

Response:
{
  "success": true,
  "count": 5,
  "data": [ { order objects } ]
}
```

#### 3. Get Order by ID
```
GET /api/orders/:id
Headers:
  Authorization: Bearer {JWT_TOKEN}

Response: { complete order object }
```

#### 4. Update Order Payment Status
```
PUT /api/orders/:id/pay
Headers:
  Authorization: Bearer {JWT_TOKEN}
  Content-Type: application/json

Request Body:
{
  "id": "payment_id",
  "status": "COMPLETED",
  "email_address": "customer@example.com"
}
```

## Database Schema

### Order Model
```javascript
{
  _id: ObjectId,
  user: ObjectId (User reference),
  orderId: String (unique, e.g., "ORD-1234567890"),
  items: [
    {
      product: ObjectId,
      name: String,
      quantity: Number,
      price: Number,
      image: String
    }
  ],
  shippingAddress: {
    name: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    postalCode: String,
    country: String
  },
  paymentMethod: String (enum: ['Razorpay', 'UPI', 'NetBanking', 'Wallet', 'Cash on Delivery']),
  paymentResult: {
    razorpayPaymentId: String,
    razorpayOrderId: String,
    razorpaySignature: String,
    status: String,
    method: String,
    amount: Number,
    currency: String,
    receipt: String
  },
  itemsPrice: Number,
  taxPrice: Number,
  shippingPrice: Number,
  total: Number,
  status: String (enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled']),
  isPaid: Boolean,
  paidAt: Date,
  isDelivered: Boolean,
  deliveredAt: Date,
  createdAt: Date (default: now)
}
```

## Frontend Components

### UserCartDetailsPage.js
**Purpose**: Checkout page with payment integration
**Key Features**:
- Multi-step form with validation
- Real-time total calculation (items + tax + shipping)
- Razorpay payment modal integration
- COD option for cash payments
- Order confirmation and redirect

**State Management**:
```javascript
- cartItems: [] - Items in cart
- validated: boolean - Form validation state
- paymentMethod: string - Selected payment method
- loading: boolean - Processing state
- error/success: string - Messages
```

**Key Functions**:
```javascript
- loadRazorpayScript() - Dynamically load Razorpay SDK
- handleRazorpayPayment() - Initiate payment process
- handleSubmit() - Form submission and order creation
- getCartSubtotal() - Calculate subtotal
- getTaxAmount() - Calculate 18% GST
- getTotalAmount() - Calculate final amount
```

### UserOrderDetailsPage.js
**Purpose**: Order tracking and management
**Key Features**:
- Timeline-based status visualization
- Order item details
- Shipping information
- Payment status display
- Track Order button
- Cancel Order button

**State Management**:
```javascript
- order: object - Current order details
- orders: [] - All user orders
- cancelReason: string - Cancellation reason
```

**Key Functions**:
```javascript
- getStatusStage() - Get current status level (0-2)
- getTrackingTimeline() - Generate timeline steps
- updateOrderStatus() - Change order status
```

### AdminOrdersPage.js
**Purpose**: Admin order management dashboard
**Key Features**:
- Order statistics
- Search and filter
- Status management
- Revenue tracking
- Order modal details

**State Management**:
```javascript
- orders: [] - All orders
- filteredOrders: [] - Filtered results
- statusFilter: string - Current filter
- searchTerm: string - Search input
- selectedOrder: object - Modal order
```

## Frontend Payment Flow

```
1. Customer fills checkout form
   ↓
2. Submit form → handleSubmit()
   ↓
3. Call handleRazorpayPayment(orderData)
   ↓
4. POST /api/payment/create-order
   ↓
5. Receive razorpayOrderId and keyId
   ↓
6. Open Razorpay modal with options
   ↓
7. Customer completes payment
   ↓
8. Razorpay calls handler function
   ↓
9. POST /api/payment/verify
   ↓
10. Verify response and save order
   ↓
11. Redirect to order confirmation
```

## Backend Payment Flow

```
1. Receive POST /api/payment/create-order
   ↓
2. Validate amount and orderId
   ↓
3. Create Razorpay order with razorpay.orders.create()
   ↓
4. Return order ID and key
   ↓
(Customer pays)
   ↓
5. Receive POST /api/payment/verify
   ↓
6. Verify signature: 
   body = razorpayOrderId + '|' + razorpayPaymentId
   expectedSignature = HMAC-SHA256(body, secret)
   ↓
7. If signature matches:
   - Update Order.isPaid = true
   - Set paymentResult details
   - Save order
   ↓
8. Return success/failure
```

## Security Implementation

### 1. Payment Signature Verification
```javascript
const crypto = require('crypto');

const body = razorpayOrderId + '|' + razorpayPaymentId;
const expectedSignature = crypto
  .createHmac('sha256', RAZORPAY_KEY_SECRET)
  .update(body)
  .digest('hex');

if (expectedSignature === razorpaySignature) {
  // Payment is valid
} else {
  // Payment is tampered
}
```

### 2. JWT Authentication
```javascript
// Protecting sensitive routes
router.post('/refund', auth, refundPayment);

// auth middleware verifies JWT token
const { auth } = require('../middleware/auth');
```

### 3. Order Authorization
```javascript
// Users can only access their own orders
if (order.user._id.toString() !== req.user._id.toString() && !req.user.isAdmin) {
  return res.status(403).json({ message: 'Not authorized' });
}
```

## Environment Variables

```env
# Backend (.env)
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/thakur-shop
JWT_SECRET=your-secret-key

# Razorpay Configuration
RAZORPAY_KEY_ID=rzp_test_1Xy2DjlKMrKyqR
RAZORPAY_KEY_SECRET=EkuLdBSDjy38K9KsV8mfJvqA

# Frontend URLs
FRONTEND_URL=http://localhost:3000
```

## Error Handling

### Payment Errors
```javascript
// Backend handles:
- Invalid amount
- Missing order ID
- Failed Razorpay request
- Invalid signature
- Order not found

// Frontend displays:
- User-friendly error messages
- Retry options
- Support contact information
```

### Order Errors
```javascript
// Validation:
- Empty cart check
- Valid shipping address
- Payment method selection
- Product availability
```

## Performance Considerations

### Frontend Optimization
1. Lazy load Razorpay script
2. Memoize calculation functions
3. Debounce search input
4. Pagination for large order lists

### Backend Optimization
1. Index Order queries by user_id
2. Cache product details
3. Connection pooling for MongoDB
4. API response compression

## Testing Checklist

- [ ] Add product to cart
- [ ] Proceed to checkout
- [ ] Fill all required fields
- [ ] Submit form with Razorpay selected
- [ ] Complete payment with test card
- [ ] Verify order in My Orders
- [ ] Track order status
- [ ] Test COD option
- [ ] Admin search and filter
- [ ] Admin status update
- [ ] Cancel order functionality
- [ ] Refund process
- [ ] Mobile responsiveness

## Deployment Checklist

- [ ] Replace test Razorpay keys with production keys
- [ ] Update MongoDB URI to production database
- [ ] Set NODE_ENV=production
- [ ] Configure CORS for production domain
- [ ] Set up HTTPS/SSL
- [ ] Configure backup strategy
- [ ] Set up monitoring and logging
- [ ] Test payment with real cards
- [ ] Configure email notifications
- [ ] Deploy frontend to CDN

## Common Issues & Solutions

### Issue: Payment Modal Not Opening
**Solution**: Check Razorpay script load in browser console

### Issue: Signature Verification Fails
**Solution**: Verify RAZORPAY_KEY_SECRET is correct

### Issue: Orders Not Persisting
**Solution**: Ensure MongoDB connection is established

### Issue: CORS Errors
**Solution**: Verify backend CORS middleware configuration

## Future Enhancements

1. **Real Email Notifications**
   - Order confirmation
   - Payment receipt
   - Shipping updates
   - Delivery notification

2. **SMS Tracking**
   - OTP for orders
   - Status updates via SMS
   - Delivery OTP

3. **Analytics**
   - Order analytics
   - Payment trends
   - Revenue reports
   - Customer insights

4. **Webhooks**
   - Real-time payment updates
   - Automatic status changes
   - Inventory sync

5. **Inventory Management**
   - Stock tracking
   - Automated reordering
   - Warehouse management

## Contact & Support

For technical support or questions:
- Check logs in backend terminal
- Review browser DevTools console
- Verify API endpoints are running
- Check database connection status
