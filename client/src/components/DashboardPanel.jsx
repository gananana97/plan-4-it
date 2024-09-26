import React, { useState, useEffect } from 'react';
import { getToken, logout } from '../utils/auth';
import api from '../utils/api'; 

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get('/me', {
          headers: { Authorization: `Bearer ${getToken()}` },  // attach token to request
        });
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data');
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <p>Email: {user.id}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
