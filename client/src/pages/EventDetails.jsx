import React, { useState, useEffect } from 'react';
import api from '../utils/api'; 

const EventDetails = ({ eventId }) => {
  const [guests, setGuests] = useState([]);

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const response = await api.get(`/event/${eventId}/guests`);  // fetch guests by event ID
        setGuests(response.data);
      } catch (error) {
        console.error('Error fetching guests:', error);
      }
    };

    fetchGuests();
  }, [eventId]);

  return (
    <div>
      <h1>Event Details</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>ID</th>  {}
            <th>RSVP Status</th>
          </tr>
        </thead>
        <tbody>
          {guests.map(guest => (
            <tr key={guest.id}> {}
              <td>{guest.name}</td>
              <td>{guest.id}</td>  {}
              <td>{guest.rsvpStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventDetails;
