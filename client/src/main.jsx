import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Home from './pages/Home';
// import Matchup from './pages/Matchup';
// import Vote from './pages/Vote';
import EventsPage from './pages/EventsPage.jsx';
import RSVPPage from './pages/RSVPPage.jsx';
import NotFound from './pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />
      }, {
        path: '/events',
        element: <EventsPage />
      }, {
        path: '/rsvp/:id',
        element: <RSVPPage />
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
