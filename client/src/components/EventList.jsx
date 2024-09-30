import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";  // Import routing functionality
import axios from "../api/axios";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();  // Use navigate for redirects

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

  const handleDelete = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      await axios.delete(`/events/${eventId}`);  // Send delete request to API
      setEvents(events.filter(event => event._id !== eventId));  // Remove deleted event from list
    } catch (error) {
      console.error("Error deleting event:", error);
      setError("Failed to delete the event. Please try again.");
    }
  };

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

              {/* Buttons for View, Edit, and Delete */}
              <div className="mt-4 space-x-2">
                {/* View Event */}
                <Link
                  to={`/events/${event._id}`}  // Navigate to event details page
                  className="text-blue-500 hover:underline"
                >
                  View
                </Link>

                {/* Edit Event */}
                <Link
                  to={`/events/edit/${event._id}`}  // Navigate to edit event page
                  className="text-yellow-500 hover:underline"
                >
                  Edit
                </Link>

                {/* Delete Event */}
                <button
                  onClick={() => handleDelete(event._id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventList;
