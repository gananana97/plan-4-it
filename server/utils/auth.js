// utils/auth.js
const { verifyToken } = require('../utils/jwt');

// Middleware to check if the user is authenticated
const authenticateJWT = (req, res, next) => {
  // GET token from headers
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: 'No token provided' }); // If no token is present
  }

  // Verify the token
  const user = verifyToken(token);
  if (!user) {
    return res.status(403).json({ message: 'Invalid token' }); // Forbidden
  }

  req.user = user; // Attach user to request
  next(); // Pass control to the next handler
};

module.exports = authenticateJWT;
