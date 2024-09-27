// controllers/home-routes.js
const express = require('express');
const router = express.Router();

// Route for homepage
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to PLAN-4-IT!' });
});

// Route for about page
router.get('/about', (req, res) => {
  res.status(200).json({ message: 'About us' });
});

// EXPORT the router
module.exports = router;
