// controllers/api/user-routes.js
const express = require('express');
const router = express.Router();
const { userControllers } = require('../index');

// Route for user registration
router.post('/register', userControllers.register);

// Route for user login
router.post('/login', userControllers.login);

// Route for getting user info (protected)
router.get('/profile', userControllers.getProfile);

module.exports = router;
