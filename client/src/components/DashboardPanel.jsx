import React, { useState, useEffect } from 'react';
import { getToken, logout } from '../utils/auth';
import { getUserInfo } from '../utils/api'; 

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Added error state

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserInfo(); // Use the getUserInfo API method
        if (userData) {
          setUser(userData);
        } else {
          throw new Error('No user data found');
        }
      } catch (error) {
        setError('Error fetching user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {user ? (
        <>
          <h1>Welcome, {user.name}!</h1>
          <p>Email: {user.id}</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
};

export default Dashboard;
