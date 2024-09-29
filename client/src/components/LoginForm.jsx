import React, { useState } from 'react';
import { loginUser } from '../utils/api';

const LoginForm = ({ onLogin }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await loginUser({ id, password });
      if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token);  // Store JWT
      onLogin();  // Notify parent component (e.g., Login.jsx)
    } else {
      setError('Invalid credentials');
    }
  } catch (error) {
    setError('An error occurred during login');
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
