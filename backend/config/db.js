const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (process.env.USE_MOCK_DB === 'true') {
      console.warn('ℹ Skipping MongoDB connection because USE_MOCK_DB=true. Using mock data only.');
      return;
    }

    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/thakur-shop';
    const conn = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✓ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`⚠ MongoDB Connection Error: ${error.message}`);
    console.warn('Starting server without database connection...');
    console.warn('Install MongoDB or use MongoDB Atlas to enable persistence');
  }
};

module.exports = connectDB;
