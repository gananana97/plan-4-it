import React, { useState } from 'react';
import axios from '../api/axios'; // Axios instance with baseURL configured


const EventForm = () => {
  const [eventData, setEventData] = useState({
    eventName: '',
    description: '',
    date: '',
    location: '',
    guests: [{ email: '' }]
  });

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleGuestChange = (index, e) => {
    const updatedGuests = [...eventData.guests];
    updatedGuests[index][e.target.name] = e.target.value;
    setEventData({ ...eventData, guests: updatedGuests });
  };

  const addGuest = () => {
    setEventData({ ...eventData, guests: [...eventData.guests, { email: '' }] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/create-event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        throw new Error('Failed to create event');
      }

      alert('Event created and invitations sent!');
    } catch (error) {
      console.error('Error creating event', error);
    }
  };

  return (
    <div>
      <h2>Create Event</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Event Name:</label>
          <input type="text" name="eventName" value={eventData.eventName} onChange={handleChange} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={eventData.description} onChange={handleChange} required />
        </div>
        <div>
          <label>Date:</label>
          <input type="date" name="date" value={eventData.date} onChange={handleChange} required />
        </div>
        <div>
          <label>Location:</label>
          <input type="text" name="location" value={eventData.location} onChange={handleChange} required />
        </div>
        <div>
          <label>Guests:</label>
          {eventData.guests.map((guest, index) => (
            <input
              key={index}
              type="email"
              name="email"
              value={guest.email}
              onChange={(e) => handleGuestChange(index, e)}
              required
            />
          ))}
          <button type="button" onClick={addGuest}>Add Guest</button>
        </div>
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default EventForm;