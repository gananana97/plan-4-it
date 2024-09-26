// controllers/home-routes.js
const express = require('express');
const router = express.Router();

// EXAMPLE route for homepage
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the PLAN-4-IT!' });
});

// EXAMPLE route for about page
router.get('/about', (req, res) => {
  res.status(200).json({ message: 'About us' });
});

// EXPORT the router
module.exports = router;
