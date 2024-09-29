// routes/api/eventRoutes.js
const express = require('express');
const { createEvent, getEvents } = require('../../controllers/eventController');
const auth = require('../../middleware/authenticateJWT'); // JWT auth middleware
const router = express.Router();

// Create Event (Private)
router.post('/', auth, createEvent);

// Get All Events (Public)
router.get('/', getEvents);

// Update Event (Private)
router.put('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const userId = req.user.id;

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

// Delete Event (Private)
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
