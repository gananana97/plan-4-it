const express = require('express');
const router = express.Router();
const { rsvpEvent } = require('../controllers/rsvpController');

// @route   POST /api/rsvp/:eventId/:guestId
// @desc    RSVP to an event
// @access  Public
router.post('/:eventId/:guestId', rsvpEvent);

module.exports = router;