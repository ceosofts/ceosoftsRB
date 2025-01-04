require('dotenv').config({ path: '.env' });

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log('MongoDB connected successfully');
    mongoose.connection.close();
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  }
};

connectDB();