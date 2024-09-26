import React from 'react';
import RegisterForm from '../components/RegisterForm';
import { useHistory } from 'react-router-dom'; 

const Register = () => {
  const history = useHistory();

  const handleRegister = () => {
    // after registration, redirect the user to the dashboard or another page
    history.push('/dashboard');  // redirect after successful registration
  };

  return (
    <div>
      <h1>Register Page</h1>
      <RegisterForm onRegister={handleRegister} />
    </div>
  );
};

export default Register;
