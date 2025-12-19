const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Product = require('./models/Product');
const connectDB = require('./config/db');
const { seedProducts } = require('./data/productsSeed');

dotenv.config();
connectDB();

const seedUsers = [
  {
    name: 'Admin User',
    email: 'admin@admin.com',
    password: 'password',
    isAdmin: true,
  },
  {
    name: 'Regular User',
    email: 'user@user.com',
    password: 'password',
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
    console.log('\n=== Demo Credentials ===');
    console.log('Admin: admin@admin.com / password');
    console.log('User:  user@user.com / password');
    
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
