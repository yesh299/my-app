const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Product = require('./models/Product');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const seedProducts = [
  {
    name: 'MacBook Pro 16',
    description: 'The most powerful MacBook Pro ever with M2 chip, stunning Retina display, and incredible battery life. Perfect for professionals and creators.',
    price: 2499,
    category: 'Electronics',
    images: ['/images/products/macbook.png'],
    brand: 'Apple',
    stock: 25,
    rating: 4.8,
    reviewsNumber: 342,
    sales: 156,
  },
  {
    name: 'iPhone 15 Pro',
    description: 'Latest iPhone with titanium design, A17 Pro chip, and pro camera system. The ultimate smartphone experience.',
    price: 999,
    category: 'Electronics',
    images: ['/images/products/iphone.png'],
    brand: 'Apple',
    stock: 50,
    rating: 4.9,
    reviewsNumber: 521,
    sales: 324,
  },
  {
    name: 'The Great Gatsby',
    description: "F. Scott Fitzgerald's classic American novel set in the Jazz Age. A timeless tale of love, wealth, and the American Dream.",
    price: 12.99,
    category: 'Books',
    images: ['/images/products/book1.png'],
    brand: 'Scribner',
    stock: 200,
    rating: 4.6,
    reviewsNumber: 1205,
    sales: 892,
  },
  {
    name: "Men's Casual Shirt",
    description: 'Premium cotton casual shirt perfect for any occasion. Comfortable, stylish, and versatile.',
    price: 39.99,
    category: 'Fashion',
    images: ['/images/products/shirt.png'],
    brand: 'FashionCo',
    stock: 75,
    rating: 4.3,
    reviewsNumber: 89,
    sales: 234,
  },
  {
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with thermal carafe and auto-shutoff. Start your mornings right.',
    price: 79.99,
    category: 'Home & Kitchen',
    images: ['/images/products/coffee-maker.png'],
    brand: 'BrewMaster',
    stock: 40,
    rating: 4.4,
    reviewsNumber: 234,
    sales: 178,
  },
  {
    name: 'Yoga Mat',
    description: 'Non-slip yoga mat with extra cushioning for comfort. Perfect for yoga, pilates, and home workouts.',
    price: 29.99,
    category: 'Sports',
    images: ['/images/products/yoga-mat.png'],
    brand: 'FitPro',
    stock: 100,
    rating: 4.7,
    reviewsNumber: 156,
    sales: 423,
  },
  {
    name: 'LEGO City Set',
    description: 'Build your own city with this amazing LEGO construction set. Hours of creative fun for kids.',
    price: 89.99,
    category: 'Toys',
    images: ['/images/products/lego.png'],
    brand: 'LEGO',
    stock: 60,
    rating: 4.9,
    reviewsNumber: 412,
    sales: 289,
  },
  {
    name: 'Wireless Headphones',
    description: 'Premium noise-cancelling headphones with 30-hour battery life. Studio-quality sound anywhere.',
    price: 199.99,
    category: 'Electronics',
    images: ['/images/products/headphones.png'],
    brand: 'SoundMax',
    stock: 45,
    rating: 4.6,
    reviewsNumber: 678,
    sales: 567,
  },
  {
    name: 'Running Shoes',
    description: 'Professional running shoes with advanced cushioning and support. Take your running to the next level.',
    price: 129.99,
    category: 'Sports',
    images: ['/images/products/shoes.png'],
    brand: 'RunFast',
    stock: 80,
    rating: 4.5,
    reviewsNumber: 234,
    sales: 345,
  },
  {
    name: 'Smart Watch',
    description: 'Feature-packed smartwatch with health tracking, notifications, and long battery life.',
    price: 299.99,
    category: 'Electronics',
    images: ['/images/products/smartwatch.png'],
    brand: 'TechWear',
    stock: 35,
    rating: 4.4,
    reviewsNumber: 456,
    sales: 234,
  },
];

const seedUsers = [
  {
    name: 'Admin User',
    email: 'admin@thakurshop.com',
    password: 'admin123',
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    isAdmin: false,
  },
];

const importData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();

    const createdUsers = await User.insertMany(seedUsers);
    const createdProducts = await Product.insertMany(seedProducts);

    console.log('Data Imported Successfully!');
    console.log(`${createdUsers.length} users created`);
    console.log(`${createdProducts.length} products created`);
    console.log('\nAdmin credentials:');
    console.log('Email: admin@thakurshop.com');
    console.log('Password: admin123');
    
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
