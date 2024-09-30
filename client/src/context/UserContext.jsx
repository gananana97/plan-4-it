import { createContext, useState, useEffect } from 'react';
import api from '../api/axios';  // Axios instance

export const UserContext = createContext({
  user: null,
  setUser: () => {},
  logout: () => {},
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserData();  // Fetch user info if token exists
    }
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await api.get('/users/user');  // Fetch user data from backend
      setUser(response.data);  // Set user data in context
    } catch (error) {
      console.error('Error fetching user data:', error);
      setUser(null);  // Clear user data in case of error
    }
  };

  const logout = () => {
    localStorage.removeItem('token');  // Remove token from localStorage
    setUser(null);  // Clear user data on logout
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
