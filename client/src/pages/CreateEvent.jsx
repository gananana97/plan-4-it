import React from 'react';
import { useHistory } from 'react-router-dom';
import CreateEventForm from '../components/CreateEventForm';
import api from '../utils/api';

const CreateEvent = () => {
  const history = useHistory();

  const handleCreateEvent = async (eventData) => {
    try {
      const response = await api.post('/create-event', eventData);
      
      const { name: eventName, dateStart: date, time, location } = eventData;

      // redirect to Confirmation page with event details
      history.push({
        pathname: '/confirmation',
        state: { eventName, date, time, location },
      });
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div>
      <h1>Create Event</h1>
      <CreateEventForm onCreateEvent={handleCreateEvent} />
    </div>
  );
};

export default CreateEvent;
