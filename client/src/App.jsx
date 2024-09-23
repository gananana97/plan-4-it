import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import EventsPage from "./pages/EventsPage";
import RSVPPage from "./pages/RSVPPage";

function App() {
  return (
    <Router>
      <nav className="p-4 bg-gray-800 text-white">
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:underline">
              Events
            </Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<EventsPage />} />
        <Route path="/rsvp/:eventId/:guestId" element={<RSVPPage />} />
        <Route
          path="*"
          element={<h2 className="text-center">404 - Page Not Found</h2>}
        />
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
