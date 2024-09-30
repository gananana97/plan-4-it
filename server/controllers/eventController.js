const Event = require('../models/Event');

// Create a new event
exports.createEvent = async (req, res) => {
  const { eventName, description, date, location } = req.body;
  try {
    const newEvent = new Event({
      eventName,
      description,
      date,
      location,
      createdBy: req.user.id, // user from auth middleware
    });
    const event = await newEvent.save();
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all events
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('createdBy', 'username');
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
