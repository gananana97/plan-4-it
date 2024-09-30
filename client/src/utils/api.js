import api from '../api/axios'; 

// Helper function to check and handle responses
const handleResponse = async (response) => {
  if (!response.ok) {
    try {
      const errorMessage = await response.json(); // Try to parse JSON
      throw new Error(errorMessage.message || 'Request failed');
    } catch (err) {
      throw new Error('An error occurred while processing the request.');
    }
  }
  return await response.json();
};

// Login User
export const loginUser = async (credentials) => {
  const response = await api.post('/users/login', credentials);
  return response.data;  // Assuming api.post already handles response parsing
};

// Register User
export const registerUser = async (userData) => {
  const response = await api.post('/users/register', userData);
  return response.data;
};

// Get User Info
export const getUserInfo = async () => {
  const response = await api.get('/users/user');
  return response.data;
};

// Logout User
export const logoutUser = () => {
  localStorage.removeItem('token');  // Clear JWT token
  window.location.reload();  // Optionally, force a reload to reset the app state
};

export default api;
