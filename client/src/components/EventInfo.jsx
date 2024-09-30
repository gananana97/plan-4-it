import React, { useState, useEffect } from 'react';
import api from '../utils/api';  

const EventInfo = ({ eventId }) => {
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await api.get(`/events/${eventId}`);  // Fetch event details by ID
        setEvent(response.data);
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  if (!event) return <p>Loading event details...</p>;

  return (
    <div>
      <h1>{event.eventName}</h1>
      <p>Date: {new Date(event.date).toLocaleDateString()}</p>
      <p>Location: {event.location}</p>
      <p>Description: {event.description}</p>
    </div>
  );
};

export default EventInfo;
