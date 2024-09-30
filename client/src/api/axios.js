import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',  // Adjust base URL for the backend
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;  // Attach token to every request
  }
  return config;
});

export default api;
