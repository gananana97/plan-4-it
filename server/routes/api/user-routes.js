const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const authenticateJWT = require('../../middleware/authenticateJWT');

// Register a new user
router.post('/register', [
  body('username').notEmpty().isLength({ min: 3, max: 30 }),
  body('email').notEmpty().isEmail(),
  body('password').notEmpty().isLength({ min: 6 }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { username, email, password } = req.body;

    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if JWT_SECRET exists, fallback for testing (optional)
    const jwtSecret = process.env.JWT_SECRET || 'fallbackSecret';  // Add fallback secret for debugging
    if (!jwtSecret) {
      console.error('JWT_SECRET is not defined');
      return res.status(500).json({ message: 'Server configuration error' });
    }

    // Create new user
    const newUser = await User.create({ username, email, password: hashedPassword });

    // Create JWT token
    const token = jwt.sign({ id: newUser._id }, jwtSecret, { expiresIn: '1h' });

    // Return new user and token
    res.status(201).json({ user: { id: newUser._id, username, email }, token });
  } catch (err) {
    console.error('Error creating user:', err); // Log the actual error to console
    res.status(500).json({ message: 'Error creating user', error: err.message });
  }
});

// Login a user
router.post('/login', [
  body('email').notEmpty().isEmail(),
  body('password').notEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare passwords
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if JWT_SECRET exists, fallback for testing (optional)
    const jwtSecret = process.env.JWT_SECRET || 'fallbackSecret';  // Add fallback secret for debugging
    if (!jwtSecret) {
      console.error('JWT_SECRET is not defined');
      return res.status(500).json({ message: 'Server configuration error' });
    }

    // Create JWT token
    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '1h' });

    // Return user and token
    res.status(200).json({ user: { id: user._id, email: user.email, username: user.username }, token });
  } catch (err) {
    console.error('Error logging in:', err); // Log the actual error
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
});

module.exports = router;
