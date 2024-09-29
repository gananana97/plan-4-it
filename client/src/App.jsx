import { Outlet, Link } from "react-router-dom";
import './App.css';

function App() {
  return (
    <>
      <nav className="p-4 bg-gray-800 text-white">
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:underline">Home</Link>
          </li>
          <li>
            <Link to="/events" className="hover:underline">Events</Link>
          </li>
          <li>
            <Link to="/login" className="hover:underline">Login</Link>
          </li>
          <li>
            <Link to="/register" className="hover:underline">Register</Link>
          </li>
        </ul>
      </nav>
      <div>
        <Outlet />  {/* This will render the child route components */}
      </div>
    </>
  );
}

export default App;
