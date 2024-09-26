import React from 'react';
import LoginForm from '../components/LoginForm';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const history = useHistory();

  const handleLogin = () => {
    // redirect after successful login
    history.push('/dashboard');
  };

  return (
    <div>
      <h1>Login Page</h1>
      <LoginForm onLogin={handleLogin} />
    </div>
  );
};

export default Login;
