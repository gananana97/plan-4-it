import React from 'react';
import EventForm from '../components/EventForm';
import EventList from '../components/EventList';

// EventPage component displays the EventForm and EventList components.

const EventsPage = () => {
  return (
    <div className="event-page container mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
      <EventForm />
      <EventList />
    </div>
  );
};

export default EventsPage;