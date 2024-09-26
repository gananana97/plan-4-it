// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const authenticate = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Access denied: No token provided' });
  }

  try {
    // Verify the token and extract user ID
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by ID
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(401).json({ message: 'Access denied: Invalid token' });
    }

    req.user = user; // Attach the user object to the request
    next(); // Pass control to the next handler
  } catch (err) {
    console.error('Token verification failed:', err.message);
    return res.status(403).json({ message: 'Access denied: Invalid token' });
  }
};

module.exports = authenticate;
