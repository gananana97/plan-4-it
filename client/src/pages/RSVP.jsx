import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../utils/api';

const RSVP = () => {
  const [id, setId] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const history = useHistory();

  const handleRSVP = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post('/rsvp', { id, inviteCode });
      
      const { eventName, date, time, location } = response.data;

      //redirect to Confirmation page with event details
      history.push({
        pathname: '/confirmation',
        state: { eventName, date, time, location },
      });
    } catch (error) {
    }
  };

  return (
    <div>
      <h1>RSVP for an Event</h1>
      <form onSubmit={handleRSVP}>
        <input
          type="text"
          placeholder="Enter your ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Invite Code"
          value={inviteCode}
          onChange={(e) => setInviteCode(e.target.value)}
        />
        <button type="submit">RSVP</button>
      </form>
    </div>
  );
};

export default RSVP;
