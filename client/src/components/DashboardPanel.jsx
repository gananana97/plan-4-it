import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import EventList from '../components/EventList';
import api from '../utils/api';

const DashboardPanel = () => {
  const { user } = useContext(UserContext);  // Access user data from context
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      if (!user) return;  // Early return if no user
      try {
        const response = await api.get(`/events?userId=${user.id}`);  // Fetch user-specific events
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
        setError('Failed to load events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [user]);

  if (!user) {
    return <div>No user data available. Please log in.</div>;
  }

  if (loading) return <p>Loading events...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Welcome, {user.username}!</h1>
      <h2>Your Upcoming Events</h2>
      {events.length === 0 ? (
        <p>No upcoming events</p>
      ) : (
        <EventList events={events} />  // Pass events to the EventList component
      )}
    </div>
  );
};

export default DashboardPanel;
