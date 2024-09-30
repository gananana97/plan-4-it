import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { useParams, useNavigate } from 'react-router-dom';

const EditEvent = () => {
  const { eventId } = useParams();  // Get eventId from the URL
  const navigate = useNavigate();
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        console.log('Fetching event with ID:', eventId);  // Debugging log
        const response = await api.get(`/events/${eventId}`);  // Corrected URL
        console.log('Event data received:', response.data);  // Log the response
        setEventData(response.data);
      } catch (error) {
        console.error('Error fetching event details:', error.response || error.message);  // Capture full error details
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleInputChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Updating event with ID:", eventId);  // Log eventId for debugging
      await api.put(`/events/${eventId}`, eventData);  // Corrected URL
      navigate(`/events/${eventId}`);  // Navigate after successful update
    } catch (error) {
      console.error('Error updating event:', error);
      alert('Failed to update the event. Please try again.');
    }
  };

  if (loading) return <p>Loading event details...</p>;
  if (!eventData) return <p>Error loading event details.</p>;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Event Name</label>
        <input
          type="text"
          name="eventName"
          value={eventData.eventName || ''}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          name="description"
          value={eventData.description || ''}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Date</label>
        <input
          type="date"
          name="date"
          value={
            eventData.date
              ? new Date(eventData.date).toISOString().split('T')[0]
              : ''
          }
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Location</label>
        <input
          type="text"
          name="location"
          value={eventData.location || ''}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Update Event</button>
    </form>
  );
};

export default EditEvent;
