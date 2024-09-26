import React from 'react';
import LoginForm from '../components/loginForm';

const Login = ({ onLogin }) => {
  return (
    <div>
      <h1>Login</h1>
      <LoginForm onLogin={onLogin} />
    </div>
  );
};

export default Login;
