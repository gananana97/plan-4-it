import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EventsPage from './pages/EventsPage';
import RSVPPage from './pages/RSVPPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EventsPage />} />
        <Route path="/rsvp/:eventId/:guestId" element={<RSVPPage />} />
      </Routes>
    </Router>
  );
}

export default App;

// function App() {
//   return (
//     <div className="flex-column justify-center align-center min-100-vh bg-primary">
//       <Outlet />
//     </div>
//   );
// }

// export default App;
