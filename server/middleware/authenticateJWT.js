// middleware/authenticateJWT.js

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env; // Ensure you have a JWT secret in your environment variables

const authenticateJWT = (req, res, next) => {
  // Extract token from Authorization header
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied: No token provided' });
  }

  // Verify the token
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.error('Token verification failed:', err.message);
      return res.status(403).json({ message: 'Access denied: Invalid or expired token' });
    }

    req.user = user; // Attach the user object to the request
    next(); // Pass control to the next handler
  });
};

module.exports = authenticateJWT;
