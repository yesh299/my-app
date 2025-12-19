# Thakur Online Shop - E-Commerce Platform

A fully functional, professional e-commerce website built with React, React Bootstrap, and React Router.

## 🌟 Features

### Public Features
- **Homepage** with product carousel and category cards
- **Product Listing** with advanced filtering and sorting
  - Filter by category, price range, and ratings
  - Sort by price and rating
- **Product Details** with reviews and add to cart functionality
- **Shopping Cart** with quantity management
- **User Authentication** (Login/Register)
- **Responsive Design** that works on all devices
- **Live Chat Support** for customer assistance

### User Features (Protected Routes)
- **User Profile Management** with password change
- **Order History** with detailed tracking
- **Checkout Process** with shipping and payment forms
- **Order Details** with status tracking

### Admin Features (Protected Routes)
- **Dashboard Analytics** with key metrics and charts
- **User Management** - View, edit, and manage users
- **Product Management** - CRUD operations for products
- **Order Management** - View and update order status
- **Customer Support Chat** - Real-time messaging interface

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd myapp
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📱 Application Structure

```
src/
├── Component/
│   ├── CategoryCardComponent.js
│   ├── FooterComponent.js
│   ├── HeaderComponent.js
│   ├── ProductCardComponent.js
│   ├── ProductCarouselComponent.js
│   ├── ProtectedRoutesComponent.js
│   ├── Rating.js
│   └── User/
│       ├── RouteWithUserChatComponent.js
│       └── UserChatComponent.js
├── Pages/
│   ├── Homepage.js
│   ├── Loginpage.js
│   ├── RegisterPage.js
│   ├── ProductListPage.js
│   ├── ProductDetailsPage.js
│   ├── cartpage.js
│   ├── NotFoundPage.js
│   ├── User/
│   │   ├── UserProfilePage.js
│   │   ├── UserOrderPage.js
│   │   ├── UserOrderDetsilsPage.js
│   │   └── UserCartDetailsPage.js
│   └── admin/
│       ├── AdminAnalyticsPage.js
│       ├── AdminChatsPage.js
│       ├── AdminCreateProductPage.js
│       ├── AdminEditProductPage.js
│       ├── AdminEditUserPage.js
│       ├── AdminOrderDetailsPage.js
│       ├── AdminOrdersPage.js
│       ├── AdminProductsPage.js
│       └── AdminUsersPage.js
├── App.js
├── index.js
└── index.css
```

## 🔐 Demo Accounts

### Regular User
- Email: `user@user.com`
- Password: `password`

### Admin User
- Email: `admin@admin.com`
- Password: `password`

## 🎨 Technologies Used

- **React 17** - UI library
- **React Router DOM v6** - Client-side routing
- **React Bootstrap** - UI components
- **Bootstrap 5** - CSS framework
- **Bootstrap Icons** - Icon library
- **LocalStorage** - Client-side data persistence

## 📋 Available Scripts

### `npm start`
Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder. The build is minified and optimized for best performance.

## 🌐 Routes

### Public Routes
- `/` - Homepage
- `/product-list` - Product listing with filters
- `/product-details/:id` - Product details
- `/cart` - Shopping cart
- `/login` - User login
- `/register` - User registration

### Protected User Routes
- `/user` - User profile
- `/user/my-orders` - Order history
- `/user/order-details/:id` - Specific order details
- `/user/cart-details` - Checkout page

### Protected Admin Routes
- `/admin/orders` - Order management
- `/admin/products` - Product management
- `/admin/create-new-product` - Create product
- `/admin/edit-product/:id` - Edit product
- `/admin/users` - User management
- `/admin/edit-user/:id` - Edit user
- `/admin/order-details/:id` - Order details
- `/admin/chats` - Customer support chats
- `/admin/analytics` - Analytics dashboard

## 💾 Data Storage

Currently, the application uses `localStorage` for data persistence:
- User authentication state
- Shopping cart items
- Order history

**Note:** For production, integrate with a backend API (REST or GraphQL) and database.

## 🎯 Key Features Implementation

### Authentication
- Form validation
- Password confirmation
- Persistent login state
- Role-based access (User/Admin)

### Shopping Cart
- Add/remove items
- Update quantities
- Calculate totals with tax and shipping
- Persist across sessions

### Product Filtering
- Category selection
- Price range filtering
- Rating-based filtering
- Dynamic sorting

### Responsive Design
- Mobile-first approach
- Bootstrap grid system
- Adaptive navigation
- Touch-friendly interfaces

## 🔧 Customization

### Adding New Categories
Edit the categories array in `CategoryCardComponent.js` and `ProductListPage.js`

### Styling
Custom styles are in `index.css`. Bootstrap can be customized by modifying variables before importing.

### Adding Products
Currently products are hardcoded in `ProductListPage.js`. In production, these should come from an API.

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

This creates an optimized production build in the `build` folder.

### Deploy to Netlify/Vercel
1. Connect your repository
2. Set build command: `npm run build`
3. Set publish directory: `build`

## 📝 Future Enhancements

- [ ] Backend API integration
- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Email notifications
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Advanced search with autocomplete
- [ ] Image upload for products
- [ ] Order tracking with shipping API
- [ ] Analytics charts (Chart.js/Recharts)
- [ ] Multi-language support
- [ ] Dark mode

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Thakur**
- GitHub: [@yesh299](https://github.com/yesh299)

## 📞 Support

For support, email support@thakurshop.com or use the live chat feature in the application.

---

**Made with ❤️ using React and Bootstrap**

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
