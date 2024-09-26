
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import EventsPage from "./pages/EventsPage";
import RSVPPage from "./pages/RSVPPage";

import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Confirmation from './pages/Confirmation';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
   <nav className="p-4 bg-gray-800 text-white">
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link to="/events" className="hover:underline">
              Events
            </Link>
          </li>
          <li>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
          </li>
          <li>
            <Link to="/register" className="hover:underline">
              Register
            </Link>
          </li>
        </ul>
      </nav>

      <Routes>
    <Route path="/" element={<Home />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/rsvp/:eventId/:guestId" element={<RSVPPage />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
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
