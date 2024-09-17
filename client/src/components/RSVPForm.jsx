import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const RSVPForm = () => {
  const { eventId, guestId } = useParams();
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/rsvp/${eventId}/${guestId}`, { response });
      alert('RSVP submitted!');
    } catch (error) {
      console.error('Error submitting RSVP', error);
    }
  };

  return (
    <div>
      <h2>RSVP</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Will you attend?
          <select value={response} onChange={(e) => setResponse(e.target.value)}>
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="maybe">Maybe</option>
          </select>
        </label>
        <button type="submit">Submit RSVP</button>
      </form>
    </div>
  );
};

export default RSVPForm;