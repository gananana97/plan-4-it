import React, { useState } from 'react';
import { loginUser } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ onLogin }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const data = await loginUser({ email: id, password });
      localStorage.setItem('token', data.token);  // Store the JWT token
      onLogin();  // Notify parent component that login is successful
      navigate('/dashboard');  // Redirect to dashboard after login
    } catch (error) {
      setError('Invalid credentials');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Enter Your ID"
          value={id}
          onChange={(event) => setId(event.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter Your Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
