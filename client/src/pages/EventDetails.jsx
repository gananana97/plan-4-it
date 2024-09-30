import React, { useState, useEffect } from 'react';
import api from '../utils/api'; 
import { useParams } from 'react-router-dom';  // Use useParams to get eventId from the route

const EventDetails = () => {
  const { eventId } = useParams();  // Get eventId from the route
  const [event, setEvent] = useState(null);
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        // Fetch event details
        const eventResponse = await api.get(`/events/${eventId}`);
        setEvent(eventResponse.data);

        // Fetch guests
        const guestsResponse = await api.get(`/events/${eventId}/guests`);
        setGuests(guestsResponse.data);
      } catch (error) {
        console.error('Error fetching event details or guests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  if (loading) return <p>Loading event details...</p>;
  if (!event) return <p>Error loading event details.</p>;

  return (
    <div>
      <h1>{event.eventName}</h1>
      <p>Description: {event.description}</p>
      <p>Date: {new Date(event.date).toLocaleDateString()}</p>
      <p>Location: {event.location}</p>
      
      <h2>Guests</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>ID</th>  
            <th>RSVP Status</th>
          </tr>
        </thead>
        <tbody>
          {guests.length > 0 ? (
            guests.map(guest => (
              <tr key={guest.id}> 
                <td>{guest.name}</td>
                <td>{guest.id}</td> 
                <td>{guest.rsvpStatus}</td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="3">No guests have RSVP'd yet.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EventDetails;
