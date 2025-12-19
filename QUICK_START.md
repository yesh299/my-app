# 🚀 Quick Start Guide - Thakur Online Shop

## Getting Started in 5 Minutes

### 1. Start the Backend Server
```bash
cd backend
npm install  # (if not already done)
npm run dev
```
Backend will run on: `http://localhost:5000`

### 2. Start the Frontend Application
```bash
npm install  # (if not already done)
npm start
```
Frontend will run on: `http://localhost:3000`

---

## 🧪 Testing the Payment System

### Step 1: Add Products to Cart
1. Browse the homepage
2. Click on any product
3. Click "Add to Cart"
4. Add multiple items to cart

### Step 2: Proceed to Checkout
1. Click cart icon (top-right)
2. Click "Proceed to Checkout"
3. Fill in shipping details:
   - Full Name: `John Doe`
   - Email: `john@example.com`
   - Phone: `9876543210`
   - Address: `123 Main Street`
   - City: `Mumbai`
   - State: `Maharashtra`
   - Postal Code: `400001`
   - Country: `India`

### Step 3: Complete Payment
1. Select payment method: **Razorpay** (recommended for testing)
2. Click "Proceed to Payment"
3. Razorpay modal will open
4. Use test card:
   - **Card Number**: `4111 1111 1111 1111`
   - **Expiry**: Any future date (e.g., `12/25`)
   - **CVV**: Any 3 digits (e.g., `123`)
5. Click "Pay"
6. Payment should succeed
7. Order confirmation page appears

### Step 4: Track Your Order
1. Click on your profile (top-right)
2. Go to "My Orders"
3. Click on the latest order
4. See the tracking timeline
5. Click "Track Order" to advance status
6. Status progression:
   - Processing → Shipped → Delivered

### Step 5: Admin Panel (Order Management)
1. Go to `/admin/orders` directly or
2. From admin dashboard click "Orders"
3. View all orders with stats:
   - Total Orders
   - Processing Orders
   - Delivered Orders
   - Total Revenue
4. Search for specific order
5. Filter by status
6. Click "View" or "Update"
7. Change order status in modal

---

## 🎯 Key Test Scenarios

### Scenario 1: Successful Purchase with Online Payment
```
✓ Cart with items
✓ Fill shipping info
✓ Select Razorpay
✓ Pay with test card
✓ See order confirmation
✓ View in My Orders
✓ Track status
```

### Scenario 2: Cash on Delivery Order
```
✓ Cart with items
✓ Fill shipping info
✓ Select "Cash on Delivery"
✓ Click "Proceed to Order Confirmation"
✓ Order placed (No payment needed)
✓ Status: Processing
✓ Can be tracked and cancelled
```

### Scenario 3: Admin Order Management
```
✓ View all orders
✓ Search by Order ID
✓ Filter by status
✓ Update order status
✓ View detailed info
✓ See revenue stats
```

---

## 📱 Important URLs

| Feature | URL |
|---------|-----|
| Homepage | `http://localhost:3000/` |
| Products | `http://localhost:3000/product-list` |
| Cart | `http://localhost:3000/cart` |
| Checkout | `http://localhost:3000/user/cart-details` |
| My Orders | `http://localhost:3000/user/my-orders` |
| Admin Orders | `http://localhost:3000/admin/orders` |
| Login | `http://localhost:3000/login` |
| Register | `http://localhost:3000/register` |

---

## 💡 Pro Tips

1. **View Orders in Browser**
   - Open DevTools (F12)
   - Go to Application → localStorage
   - Look for "orders" key to see all orders

2. **Test Different Card Types**
   - Visa: `4111 1111 1111 1111`
   - Mastercard: `5555 5555 5555 4444`
   - Amex: `3782 822463 10005`

3. **Clear Test Data**
   - To clear orders: Open DevTools → localStorage → Delete "orders"
   - To clear cart: Open DevTools → localStorage → Delete "cart"

4. **Check Backend Logs**
   - Terminal running backend shows all API calls
   - Watch for payment verification logs

5. **Network Issues**
   - If payment fails, check browser Network tab (F12)
   - Verify API calls are reaching `http://localhost:5000/api/payment/*`

---

## ❓ FAQ

**Q: Payment modal not opening?**
A: Check browser console for errors. Razorpay script may not load. Try refreshing page.

**Q: Orders not saving?**
A: Verify localStorage is enabled. Check browser DevTools → Application → Storage → Cookies → Allow third-party.

**Q: Can't login?**
A: Default test account is created during first signup. Sign up with any email.

**Q: How to change from Test to Production Razorpay?**
A: Replace keys in `backend/.env` and restart server.

**Q: Mobile checkout not working?**
A: All pages are responsive. Try zooming in browser (Ctrl + +) if text is too small.

---

## 🎓 What You've Built

### Payment Flow (Complete)
```
Cart → Checkout Form → Payment Modal → 
Verification → Order Confirmation → 
Order Tracking → Admin Management
```

### Database (Demo Using localStorage)
```
Items: products
Cart: items selected
Orders: placed orders with status
Users: login/register data
```

### Admin Capabilities
```
✓ View all orders
✓ Search orders
✓ Filter by status
✓ Update status
✓ View revenue
✓ Track stats
```

---

## 🎉 You're All Set!

Your **fully functional e-commerce platform** is ready for:
- ✅ Testing
- ✅ Demoing to clients
- ✅ Deployment
- ✅ Further development

**Happy coding! 🚀**
