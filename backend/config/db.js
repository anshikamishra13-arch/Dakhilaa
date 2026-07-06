const mongoose = require('mongoose');

const isMongoConnected = () => mongoose.connection.readyState === 1;

const requireDbConnection = (req, res, next) => {
  if (!isMongoConnected()) {
    return res.status(503).json({
      error: 'Database is temporarily unavailable. Configure MONGO_URI or MONGODB_URI to enable data features.',
    });
  }

  next();
};

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI || process.env.MONGODB_URL;

  if (!mongoUri) {
    console.warn('⚠️ MongoDB URI not set. Skipping database connection. Set MONGO_URI or MONGODB_URI to enable database-backed features.');
    return;
  }

  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    console.warn('⚠️ Continuing without MongoDB. Some features may be unavailable until the database is configured.');
  }
};

module.exports = connectDB;
module.exports.connectDB = connectDB;
module.exports.isMongoConnected = isMongoConnected;
module.exports.requireDbConnection = requireDbConnection;