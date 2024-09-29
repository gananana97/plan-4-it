import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App.jsx';
import Home from './pages/Home';
import EventsPage from './pages/EventsPage.jsx';
import RSVPPage from './pages/RSVPPage.jsx';
import NotFound from './pages/NotFound';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import DashboardPanel from './components/DashboardPanel.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="events" element={<EventsPage />} />
        <Route path="rsvp/:id" element={<RSVPPage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="dashboard" element={<DashboardPanel />} />
        <Route path="*" element={<NotFound />} />  {/* Catch-all route */}
      </Route>
    </Routes>
  </BrowserRouter>
);
