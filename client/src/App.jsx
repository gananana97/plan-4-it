import './App.css';
// import { Outlet } from 'react-router-dom';

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EventForm from './components/EventForm';
import RSVPForm from './components/RSVPForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EventForm />} />
        <Route path="/rsvp/:eventId/:guestId" element={<RSVPForm />} />
      </Routes>
    </Router>
  );
};


// function App() {
//   return (
//     <div className="flex-column justify-center align-center min-100-vh bg-primary">
//       <Outlet />
//     </div>
//   );
// }

export default App;
