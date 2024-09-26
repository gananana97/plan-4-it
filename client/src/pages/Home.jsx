import React from 'react';
import { Link } from 'react-router-dom';  
import Header from '../components/Header'; 

const Home = () => {
  return (
    <div>
      <Header title="Welcome to Plan-4-It!" />
      <div className="home-content">
        <p>
          Organize your events, manage your attendees, and much more with our platform!
        </p>
        <p>To get started, please log in or register:</p>
        <div>
          <Link to="/login">
            <button>Login</button>
          </Link>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
