import React from "react";
import EventForm from "../components/EventForm";
import EventList from "../components/EventList";

const EventsPage = () => {
  return (
    <div className="event-page container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        Manage Your Events
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <EventForm />
        <EventList />
      </div>
    </div>
  );
};

export default EventsPage;
