import { getAllEvents } from '../../data/dummy-data';
import Card from '../../components/Card';

const EventPage = () => {
  return (
    <div>
      <h1>Events Page</h1>
      <ul>
        {getAllEvents().map((event) => (
          <Card event={event} key={event.id} />
        ))}
      </ul>
    </div>
  );
};

export default EventPage;
