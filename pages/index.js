import { getFeaturedEvents } from '../data/dummy-data';
import Card from '../components/Card';

const HomePage = () => {
  const featuredEvents = getFeaturedEvents();

  return (
    <div>
      <h1>Home Page</h1>
      <div>
        <h2>Featured Events</h2>
        <ul>
          {featuredEvents.map((event) => (
            <Card event={event} key={event.id} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
