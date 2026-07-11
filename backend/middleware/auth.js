const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'your-secret-key-change-in-production'
    );

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

// Middleware: require paid plan
const requirePaidPlan = (req, res, next) => {
  if (!req.user.planType || req.user.planType === 'free') {
    return res.status(403).json({
      error: 'Access denied. Upgrade to a paid plan.',
      upgradeUrl: process.env.UPGRADE_URL,
    });
  }

  // Check plan expiry
  if (req.user.planExpiryDate && new Date() > req.user.planExpiryDate) {
    return res.status(403).json({
      error: 'Your plan has expired. Please renew.',
      upgradeUrl: process.env.UPGRADE_URL,
    });
  }

  next();
};

module.exports = { auth, requirePaidPlan };
