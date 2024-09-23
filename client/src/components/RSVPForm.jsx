import React, { useState } from "react";
import axios from "../api/axios";
import { useParams } from "react-router-dom";

const RSVPForm = () => {
  const { eventId, guestId } = useParams();
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!response) {
      setError("Please select your RSVP response.");
      return;
    }
    setLoading(true);
    setError(""); // Reset error state
    try {
      await axios.post(`/rsvp/${eventId}/${guestId}`, { response });
      alert("RSVP submitted successfully!");
      setResponse(""); // Clear the input after submission
    } catch (error) {
      console.error("Error submitting RSVP:", error);
      setError(
        "There was a problem submitting your RSVP. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>RSVP</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="rsvp-response">Will you attend?</label>
        <select
          id="rsvp-response"
          value={response}
          onChange={(e) => setResponse(e.target.value)}
        >
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
          <option value="maybe">Maybe</option>
        </select>
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit RSVP"}
        </button>
      </form>
    </div>
  );
};

export default RSVPForm;
