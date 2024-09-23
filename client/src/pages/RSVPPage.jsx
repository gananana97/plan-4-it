import React from "react";
import RSVPForm from "../components/RSVPForm";

const RSVPPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        RSVP for the Event
      </h1>
      <RSVPForm />
    </div>
  );
};

export default RSVPPage;
