import { getAllEvents } from '../../data/dummy-data';
import EventList from '../../components/events/event-list';

const EventPage = () => {
  const events = getAllEvents();
  return <EventList items={events} />;
};

export default EventPage;
