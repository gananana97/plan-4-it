import { Form, Button, Card } from "react-bootstrap";
import eventImage from '../assets/photos/event1.jpg';

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
      const response = await axios.post("/events", eventData); // Updated endpoint

      alert("Event created and invitations sent!");
    } catch (error) {
      console.error("Error creating event", error);
      alert("Failed to create event");
    }
  };

  return (
    <Card className="event max-w-md mx-auto shadow-md" style={{backgroundImage: `url(${eventImage})`}}>
      <Card.Body>
        <h2 className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-4">
          Create Event
        </h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="eventName">
            <Form.Label>Event Name: </Form.Label> <br></br>
            <Form.Control
              type="text"
              name="eventName"
              value={eventData.eventName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description: </Form.Label>
            <br></br>
            <Form.Control
              as="textarea"
              name="description"
              value={eventData.description}
              onChange={handleChange}
              required
              className="mb-2" // Add margin for spacing
            />
          </Form.Group>

          <Form.Group controlId="date">
            <Form.Label>Date: </Form.Label>
            <br></br>
            <Form.Control
              type="date"
              name="date"
              value={eventData.date}
              onChange={handleChange}
              required
              className="mb-2" // Add margin for spacing
            />
          </Form.Group>

          <Form.Group controlId="location">
            <Form.Label>Location: </Form.Label>
            <br></br>
            <Form.Control
              type="text"
              name="location"
              value={eventData.location}
              onChange={handleChange}
              required
              className="mb-2" // Add margin for spacing
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Guests: </Form.Label>
            {eventData.guests.map((guest, index) => (
              <div key={index} className="mb-2">
                <Form.Control
                  type="email"
                  name="email"
                  value={guest.email}
                  onChange={(e) => handleGuestChange(index, e)}
                  required
                />
              </div>
            ))}
            <Button variant="secondary" onClick={addGuest} className="mb-2">
              Add Guest
            </Button>
            <Button
              variant="link"
              className="text-danger p-0"
              onClick={() => removeGuest(index)}
            >
              Remove
            </Button>
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            {" "}
            {/* Make button full-width */}

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
