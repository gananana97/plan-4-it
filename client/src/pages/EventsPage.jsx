import React from 'react';
import EventCreationForm from '../components/EventForm';
import EventList from '../components/EventList';

const EventsPage = () => {
  return (
    <div className="container mx-auto">
      <EventCreationForm />
      <EventList />
    </div>
  );
};

export default EventsPage;