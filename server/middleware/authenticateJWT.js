const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;  // Load secret from environment variables

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];  // Ensure auth header exists

  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ message: 'Access denied: No token provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.log('JWT verification error:', err.message);
      return res.status(403).json({ message: 'Access denied: Invalid or expired token' });
    }

    req.user = user;  // Attach user to request
    next();  // Continue with request
  });
};

module.exports = authenticateJWT;
