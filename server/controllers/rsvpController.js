const RSVP = require('../models/RSVP');
const Event = require('../models/Event');
const User = require('../models/User');

// RSVP to an event
exports.rsvpEvent = async (req, res) => {
  const { eventId, guestId } = req.params;
  const { response } = req.body;

  try {
    // Check if the event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if the guest exists
    const guest = await User.findById(guestId);
    if (!guest) {
      return res.status(404).json({ message: 'Guest not found' });
    }

    // Check if guest has already RSVP'd to this event
    const existingRSVP = await RSVP.findOne({ event: eventId, guest: guestId });
    if (existingRSVP) {
      return res.status(400).json({ message: 'Guest has already RSVP\'d to this event' });
    }

    // Create a new RSVP
    const newRSVP = new RSVP({
      event: eventId,
      guest: guestId,
      response, // RSVP response like 'yes', 'no', etc.
    });

    const rsvp = await newRSVP.save();

    res.status(201).json(rsvp);
  } catch (err) {
    console.error('RSVP error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
