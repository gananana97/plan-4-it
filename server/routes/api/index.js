// routes/api/index.js

const router = require('express').Router();
const userRoutes = require('./user-routes');
const eventRoutes = require('./eventRoutes');
const rsvpRoutes = require('./rsvpRoutes');

router.use('/users', userRoutes);

module.exports = router;
