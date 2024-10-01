require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('./config/connection'); // This already handles the connection logic
const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

// CORS setup
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? process.env.CLIENT_URL : 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
  credentials: true, 
}));

// Log the JWT secret to verify it's loaded
console.log("JWT_SECRET:", process.env.JWT_SECRET);  // Ensure this logs correctly

// Middleware for parsing request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use routes
app.use(routes);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'An error occurred', error: err.message });
});

// Start the server
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
});
