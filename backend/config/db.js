const mongoose = require('mongoose');

let mongoConnectionError = '';

const isMongoConnected = () => mongoose.connection.readyState === 1;

function decodeUriPart(value) {
  try {
    return decodeURIComponent(value);
  } catch (error) {
    return value;
  }
}

// MongoDB credentials must be percent-encoded inside a connection URI.
function normalizeMongoUri(uri) {
  const match = uri.match(/^(mongodb(?:\+srv)?:\/\/)(.+)@(.+)$/);
  if (!match) return uri;

  const separator = match[2].indexOf(':');
  if (separator === -1) return uri;

  const username = decodeUriPart(match[2].slice(0, separator));
  const password = decodeUriPart(match[2].slice(separator + 1));
  return `${match[1]}${encodeURIComponent(username)}:${encodeURIComponent(password)}@${match[3]}`;
}

function getMongoUri() {
  const configuredUri = process.env.MONGO_URI || process.env.MONGODB_URI || process.env.MONGODB_URL;
  const username = process.env.MONGODB_USERNAME || process.env.MONGO_USERNAME;
  const password = process.env.MONGODB_PASSWORD || process.env.MONGO_PASSWORD;

  if (configuredUri) return normalizeMongoUri(configuredUri);
  if (!username || !password) return '';

  const host = process.env.MONGODB_HOST || 'localhost:27017';
  const database = process.env.MONGODB_DATABASE || 'dakhilaa';
  return `mongodb://${encodeURIComponent(username)}:${encodeURIComponent(password)}@${host}/${database}`;
}

const requireDbConnection = (req, res, next) => {
  if (!isMongoConnected()) {
    return res.status(503).json({
      error: mongoConnectionError || 'Database is not connected. Start MongoDB or configure MONGODB_URI.',
    });
  }

  next();
};

const connectDB = async () => {
  const mongoUri = getMongoUri();

  if (!mongoUri) {
    mongoConnectionError = 'MongoDB is not configured. Set MONGODB_URI in the project .env file.';
    return;
  }

  try {
    mongoConnectionError = '';
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    mongoConnectionError = `MongoDB connection failed: ${err.message}`;
    console.warn(`⚠️ ${mongoConnectionError}`);
  }
};

module.exports = connectDB;
module.exports.connectDB = connectDB;
module.exports.isMongoConnected = isMongoConnected;
module.exports.requireDbConnection = requireDbConnection;
module.exports.getMongoUri = getMongoUri;
module.exports.normalizeMongoUri = normalizeMongoUri;