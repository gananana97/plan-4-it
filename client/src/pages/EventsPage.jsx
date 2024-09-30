import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import EventForm from "../components/EventForm";
import EventList from "../components/EventList";
import { UserContext } from "../context/UserContext";  // Import UserContext


const EventsPage = () => {
  const { user } = useContext(UserContext);

  // Redirect to login if the user is not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

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
