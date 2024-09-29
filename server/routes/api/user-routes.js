// routes/api/user-routes.js

const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt'); // Import bcryptjs
const jwt = require('jsonwebtoken');  // Added JWT for token generation
const authenticateJWT = require('../../middleware/authenticateJWT');

// CREATE a user (authentication not required, usually used during registration)
router.post(
  '/register',
  [
    body('username')
      .notEmpty().withMessage('Username is required')
      .isLength({ min: 3, max: 30 }).withMessage('Username must be between 3 and 30 characters'),
    body('email')
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Invalid email address'),
    body('password')
      .notEmpty().withMessage('Password is required')
      .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation Errors:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { username, email, password } = req.body;
      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        username,
        email,
        password: hashedPassword
      });

      // Exclude password from response
      const userResponse = newUser.toObject();
      delete userResponse.password;

      const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.status(201).json({ user: userResponse, token }); 
    } catch (err) {
      console.error('Error creating user:', err);
      res.status(500).json({ message: 'An error occurred while creating the user' });
    }
  }
);

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, user: { username: user.username, email: user.email } });
  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).json({ message: 'Error logging in' });
  }
});

router.get('/user', authenticateJWT, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ username: user.username, email: user.email });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user info' });
  }
});

// UPDATE a user (authentication required)
router.put(
  '/:id',
  authenticateJWT,
  [
    body('username')
      .optional()
      .isLength({ min: 3, max: 30 }).withMessage('Username must be between 3 and 30 characters'),
    body('email')
      .optional()
      .isEmail().withMessage('Invalid email address'),
    body('password')
      .optional()
      .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const userId = req.params.id;
      const { username, email, password } = req.body;

      // Find the user by ID and ensure it's the authenticated user
      const user = await User.findByPk(userId);
      if (!user || user.id !== req.user.id) {
        return res.status(404).json({ message: 'User not found or not authorized' });
      }

      // UPDATE user details
      if (username) user.username = username;
      if (email) user.email = email;
      if (password) {
        // Hash the new password before saving
        user.password = await bcrypt.hash(password, 10);
      }

      await user.save();

      // Exclude password from response
      const userResponse = { ...user.dataValues };
      delete userResponse.password;

      res.json(userResponse);
    } catch (err) {
      console.error('Error updating user:', err);
      res.status(500).json({ message: 'An error occurred while updating the user' });
    }
  }
);

// DELETE a user (authentication required)
router.delete('/:id', authenticateJWT, async (req, res) => {
  try {
    const userId = req.params.id;

    // Find the user by ID and ensure it's the authenticated user
    const user = await User.findByPk(userId);
    if (!user || user.id !== req.user.id) {
      return res.status(404).json({ message: 'User not found or not authorized' });
    }

    // DELETE user
    await user.destroy();
    res.status(204).send();
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ message: 'An error occurred while deleting the user' });
  }
});

module.exports = router;
