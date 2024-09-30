
import { Link } from 'react-router-dom';  
import Header from '../components/Header'; 
import eventImage from '../assets/photos/event1.jpg';


const Home = () => {
  return (
    <div>

      <Header title="Welcome to Plan-4-It!" />
      <div className="home-content" style={{backgroundImage: `url(${eventImage})`}}>

        <p>
          Organize your events, manage your attendees, and much more with our platform!
        </p>
      </div>
    </div>
  );
};

export default Home;
