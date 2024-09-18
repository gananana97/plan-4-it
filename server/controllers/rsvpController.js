const RSVP = require('../models/RSVP');

// RSVP to an event
exports.rsvpEvent = async (req, res) => {
  const { eventId, guestId } = req.params;
  const { response } = req.body;

  try {
    const newRSVP = new RSVP({
      event: eventId,
      guest: guestId,
      response,
    });

    const rsvp = await newRSVP.save();
    res.json(rsvp);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};