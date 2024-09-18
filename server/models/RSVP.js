const mongoose = require('mongoose');

const RSVPSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,  // Reference to the Event
    ref: 'Event',
    required: true,
  },
  guest: {
    type: mongoose.Schema.Types.ObjectId,  // Reference to the User (guest)
    ref: 'User',
    required: true,
  },
  response: {
    type: String,
    enum: ['yes', 'no'],   // Ensures that the response is either "yes" or "no"
    required: true,
  },
  respondedAt: {
    type: Date,
    default: Date.now,     // Automatically sets the timestamp when the RSVP is created
  },
});

module.exports = mongoose.model('RSVP', RSVPSchema);