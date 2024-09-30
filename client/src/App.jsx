import React, { useState, useEffect } from 'react';
import { Outlet, Link } from "react-router-dom";
import Home from './pages/Home';
import EventsPage from './pages/EventsPage';
import EventDetails from './pages/EventDetails';  // Import EventDetails for viewing an event
import EditEvent from './pages/EditEvent';  // Import EditEvent for editing an event
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Header from './components/Header';
import { UserContext } from './context/UserContext';
import './App.css';


function App() {
  const [user, setUser] = useState(null);

  // Load user from localStorage on page load (if token exists)
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userInfo = localStorage.getItem('user');  // Retrieve user data from localStorage
    if (token && userInfo) {
      const parsedUser = JSON.parse(userInfo);
      setUser(parsedUser);  // Set user state from localStorage data
    }
  }, []);

  // Logout function to clear user session
  const logout = () => {
    localStorage.removeItem('token');  // Clear JWT token
    localStorage.removeItem('user');  // Clear user data
    setUser(null);  // Clear user state
  };

  return (
    <>
      <div className="min-h-screen">
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/events">
                Events
              </Nav.Link>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/register">
                Register
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <Outlet /> {/* This will render the child route components */}
      </div>
    </>

    <UserContext.Provider value={{ user, setUser, logout }}>
      <Header title="Plan-4-It" />
      <nav className="p-4 bg-gray-800 text-white">
        <ul className="flex space-x-4">
          <li><Link to="/" className="hover:underline">Home</Link></li>
          <li><Link to="/events" className="hover:underline">Events</Link></li>
          <li><Link to="/dashboard" className="hover:underline">Dashboard</Link></li>
        </ul>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:eventId" element={<EventDetails />} />  {/* View Event Details */}
        <Route path="/events/edit/:eventId" element={<EditEvent />} />  {/* Edit Event */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
