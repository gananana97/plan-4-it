const express = require('express');
const { createEvent, getEvents } = require('../../controllers/eventController');
const auth = require('../../middleware/authMiddleware'); // JWT auth middleware
const Event = require('../../models/Event');
const router = express.Router();

// @route   POST /api/events
// @desc    Create a new event
// @access  Private (user must be authenticated)
router.post('/', auth, createEvent);

// @route   GET /api/events
// @desc    Get all events
// @access  Public
router.get('/', getEvents);

// commented out since we're referencing the create event from the eventController already
// Create Event
// router.post('/', auth, async (req, res) => {
//   const { name, description, date, location, userId } = req.body;
//   const event = new Event({ name, description, date, location, createdBy: userId });
//   try {
//     await event.save();
//     res.status(201).send(event);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

// Update Event
// added auth for the update route
router.put('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const userId = req.user.id; // corrected to use the id from the auth 

  try {
    const event = await Event.findOne({ _id: id, createdBy: userId });
    if (!event) return res.status(404).send({ error: 'Unauthorized or Event not found' });
    Object.assign(event, updates);
    await event.save();
    res.send(event);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete Event
// added auth for the delete route
router.delete('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const event = await Event.findOneAndDelete({ _id: id, createdBy: userId });
    if (!event) return res.status(404).send({ error: 'Unauthorized or Event not found' });
    res.send({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
