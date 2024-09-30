const express = require('express');
const { createEvent, getEvents } = require('../../controllers/eventController');
const authenticateJWT = require('../../middleware/authenticateJWT'); // JWT auth middleware
const Event = require('../../models/Event'); // Import the Event model
const router = express.Router();

// Create Event (Private)
router.post('/', authenticateJWT, async (req, res) => {
  try {
    const { eventName, description, date, location } = req.body;
    const newEvent = new Event({
      eventName,
      description,
      date,
      location,
      createdBy: req.user.id // Link event to user
    });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create event' });
  }
});

// Get All Events (Public)
// router.get('/', getEvents);
router.get('/', authenticateJWT, async (req, res) => {
  try {
    const userId = req.user.id;  // Get the authenticated user's ID
    const events = await Event.find({ createdBy: userId });  // Filter events by createdBy field
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events' });
  }
});

// Get Event by ID (Public)
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching event' });
  }
});

// Update Event (Private)
router.put('/:id', authenticateJWT, async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const userId = req.user.id;

  console.log(`Received update request for event ${id} by user ${userId}`);  // Log the request

  try {
    const event = await Event.findOne({ _id: id, createdBy: userId });
    if (!event) {
      return res.status(404).json({ error: 'Unauthorized or Event not found' });
    }
    Object.assign(event, updates);
    await event.save();
    res.json(event);
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(400).json({ message: 'Failed to update event', error });
  }
});

// Delete Event (Private)
router.delete('/:id', authenticateJWT, async (req, res) => {
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
