const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true, // Event name is mandatory
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    required: true, // Date is mandatory for the event
  },
  location: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the User who created the event
    ref: "User",
    required: true,
  },
  attendees: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      rsvpStatus: { type: String, enum: ["yes", "no", "maybe"], default: "yes" },
    },
  ],
  
  eventStatus: {
    type: String,
    enum: ["upcoming", "cancelled", "completed"],
    default: "upcoming",
  },
  
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the creation date of the event
  },
});



// const eventSchema = new mongoose.Schema({
//   name: String,
//   description: String,
//   date: Date,
//   location: String,
//   attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
//   createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
// });

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;

