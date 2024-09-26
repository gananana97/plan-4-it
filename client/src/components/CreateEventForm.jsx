import React, { useState } from 'react';

const CreateEventForm = ({ onCreateEvent }) => {
  const [eventData, setEventData] = useState({
    name: '',
    dateStart: '',
    dateEnd: '',
    description: '',
    location: '',
  });

  const handleChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateEvent(eventData);  // pass event data back to the parent component
  };

  return (
    <div>
      <h2>Create Event</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Event Name"
          value={eventData.name}
          onChange={handleChange}
          required
        />
        <input
          type="datetime-local"
          name="dateStart"
          placeholder="Start Date"
          value={eventData.dateStart}
          onChange={handleChange}
          required
        />
        <input
          type="datetime-local"
          name="dateEnd"
          placeholder="End Date"
          value={eventData.dateEnd}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Event Description"
          value={eventData.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={eventData.location}
          onChange={handleChange}
          required
        />
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEventForm;
