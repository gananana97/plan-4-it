import React, { useState, useContext } from 'react';
import { loginUser } from '../utils/api';  // API call to login
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { setUser } = useContext(UserContext);  
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const data = await loginUser({ email, password });
      localStorage.setItem('token', data.token);  // Store JWT token
      localStorage.setItem('user', JSON.stringify(data.user));  // Store user data as JSON string
      setUser(data.user);  // Set user in context
      navigate('/dashboard');  // Navigate to dashboard
    } catch (error) {
      setError(error.response?.data?.error || 'An error occurred. Please try again.');  // Display the error
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Email" 
        required 
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Password" 
        required 
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Display error */}
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
