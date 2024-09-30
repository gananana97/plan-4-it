const router = require('express').Router();
const userRoutes = require('./user-routes');
const eventRoutes = require('./eventRoutes');
const rsvpRoutes = require('./rsvpRoutes'); // Don't forget to import rsvpRoutes

// Define the routes and their base paths
router.use('/users', userRoutes);   // /api/users
router.use('/events', eventRoutes); // /api/events
router.use('/rsvp', rsvpRoutes);    // /api/rsvp

module.exports = router;
