import React from 'react';
import { useLocation } from 'react-router-dom'; 

const Confirmation = () => {
  const location = useLocation();
  const { eventName, date, time, location: eventLocation } = location.state || {};  // destructure passed state

  return (
    <div>
      <h1>Confirmation Page</h1>
      {eventName ? (
        <div>
          <h2>You’re all set! Here are the event details:</h2>
          <p><strong>Event Name:</strong> {eventName}</p>
          <p><strong>Date:</strong> {date}</p>
          <p><strong>Time:</strong> {time}</p>
          <p><strong>Location:</strong> {eventLocation}</p>
        </div>
      ) : (
        <p>Something went wrong, no event details available.</p>
      )}
    </div>
  );
};

export default Confirmation;
