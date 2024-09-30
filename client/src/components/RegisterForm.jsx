import React, { useState } from 'react';
import { registerUser } from '../utils/api'; 
import { useNavigate } from 'react-router-dom'; 

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();  // Initialize navigate

  const handleRegister = async (event) => {
    event.preventDefault();
    console.log({ username: name, email, password });
    try {
      const data = await registerUser({ username: name, email, password });
      localStorage.setItem('token', data.token);  // store JWT token
      navigate('/dashboard');  // Redirect to dashboard after successful registration
    } catch (error) {
      setError('Registration failed');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Enter Your Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Enter Your Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter Your Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
