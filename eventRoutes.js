const express = require('express');
const router = express.Router();
const { createEvent, getEvents } = require('../controllers/eventController');
const auth = require('../middleware/authMiddleware'); // JWT auth middleware

// @route   POST /api/events
// @desc    Create a new event
// @access  Private (user must be authenticated)
router.post('/', auth, createEvent);

// @route   GET /api/events
// @desc    Get all events
// @access  Public
router.get('/', getEvents);

//module.exports = router;
//const express = require('express');
//const Event = require('../models/Event');
//const router = express.Router();

// Create Event
//router.post('/', async (req, res) => {
  //const { name, description, date, location, userId } = req.body;
  //const event = new Event({ name, description, date, location, createdBy: userId });
  //try {
    //await event.save();
    //res.status(201).send(event);
  //} catch (error) {
    //res.status(400).send(error);
  //}
//});

// Update Event
//router.put('/:id', async (req, res) => {
  //const { id } = req.params;
  //const updates = req.body;
  //const userId = req.body.userId;

  //try {
    //const event = await Event.findOne({ _id: id, createdBy: userId });
    //if (!event) return res.status(404).send({ error: 'Unauthorized or Event not found' });
    //Object.assign(event, updates);
    //await event.save();
    //res.send(event);
  //} catch (error) {
    //res.status(400).send(error);
  //}
//});

// Delete Event
//router.delete('/:id', async (req, res) => {
  //const { id } = req.params;
  //const userId = req.body.userId;

  //try {
    //const event = await Event.findOneAndDelete({ _id: id, createdBy: userId });
    //if (!event) return res.status(404).send({ error: 'Unauthorized or Event not found' });
    //res.send({ message: 'Event deleted successfully' });
  //} catch (error) {
    //res.status(400).send(error);
  //}
//});

//module.exports = router;

