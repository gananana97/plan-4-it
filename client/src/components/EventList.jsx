import React, { useEffect, useState } from "react";
import axios from "../api/axios";

const EventList = () => {
  const [events, setEvents] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("/events");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
        setError("Failed to load events. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : loading ? (
        <p>Loading events...</p>
      ) : events.length === 0 ? (
        <p>No events available</p>
      ) : (
        <ul className="space-y-4">
          {events.map((event) => (
            <li key={event._id} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">{event.eventName}</h3>
              <p>{event.description}</p>
              <p>
                Date:{" "}
                {new Date(event.date).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p>Location: {event.location}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventList;
