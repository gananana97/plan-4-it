import React from 'react';
import RegisterForm from '../components/RegisterForm';
import { useNavigate } from 'react-router-dom'; 

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    // after registration, redirect the user to the dashboard or another page
    navigate('/dashboard');  // redirect after successful registration
  };

  return (
    <div>
      <h1>Register Page</h1>
      <RegisterForm onRegister={handleRegister} />
    </div>
  );
};

export default Register;
