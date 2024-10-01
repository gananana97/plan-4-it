const mongoose = require('mongoose');

// Connect to MongoDB using environment variable or fallback to local database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/plan4it', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Database connected successfully!'))
  .catch((err) => console.error('Database connection error:', err));

module.exports = mongoose.connection;
