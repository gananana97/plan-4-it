// utils/jwt.js
const jwt = require('jsonwebtoken');

// Use environment variables for the secret key
const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key'; // Replace with your secret key

// Generate a JWT token
const generateToken = (userId, expiresIn = '1h') => {
  return jwt.sign({ userId }, SECRET_KEY, { expiresIn });
};

// Verify a JWT token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    console.error('Token verification failed:', err.message);
    return null; // Return null if the token is invalid
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
