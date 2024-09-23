import React, { useState } from "react";
import axios from "../api/axios"; // Axios instance with baseURL configured

const EventForm = () => {
  const [eventData, setEventData] = useState({
    eventName: "",
    description: "",
    date: "",
    location: "",
    guests: [{ email: "" }],
  });

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleGuestChange = (index, e) => {
    const updatedGuests = [...eventData.guests];
    updatedGuests[index][e.target.name] = e.target.value;
    setEventData({ ...eventData, guests: updatedGuests });
  };

  const addGuest = () => {
    setEventData({
      ...eventData,
      guests: [...eventData.guests, { email: "" }],
    });
  };

  const removeGuest = (index) => {
    const updatedGuests = eventData.guests.filter((_, i) => i !== index);
    setEventData({ ...eventData, guests: updatedGuests });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/create-event", eventData);

      alert("Event created and invitations sent!");
    } catch (error) {
      console.error("Error creating event", error);
      alert("Failed to create event");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="p-8">
          <h2 className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            Create Event
          </h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Event Name:
              </label>
              <input
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                type="text"
                name="eventName"
                value={eventData.eventName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description:
              </label>
              <textarea
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                name="description"
                value={eventData.description}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date:
              </label>
              <input
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                type="date"
                name="date"
                value={eventData.date}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location:
              </label>
              <input
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                type="text"
                name="location"
                value={eventData.location}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Guests:</label>
              {eventData.guests.map((guest, index) => (
                <div key={index} className="mb-2">
                  <input
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    type="email"
                    name="email"
                    value={guest.email}
                    onChange={(e) => handleGuestChange(index, e)}
                    required
                  />
                  <button
                    type="button"
                    className="mt-1 text-red-600"
                    onClick={() => removeGuest(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button type="button" onClick={addGuest}>
                Add Guest
              </button>
            </div>
            <button type="submit">Create Event</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventForm;
