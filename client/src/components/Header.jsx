import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Header = ({ title }) => {
  const { user, logout } = useContext(UserContext);  // Access user and logout from context

  return (
    <header>
      <h1>{title}</h1>
      {user ? (
        <>
          <p>Welcome, {user.username}!</p>  {/* Display the actual username */}
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">
            <button>Login</button>
          </Link>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </>
      )}
    </header>
  );
};

export default Header;
