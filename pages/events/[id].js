import { useRouter } from 'next/router';
import EventItem from '../../components/EventItem';
import { getEventById } from '../../data/dummy-data';

const EventId = () => {
  const router = useRouter();
  const event = getEventById(router.query.id);

  console.log(event);
  console.log(router.query);

  if (event === undefined) {
    return null;
  } else {
    return (
      <div>
        <h1>EventId Page</h1>
        <EventItem event={event} />
      </div>
    );
  }
};

export default EventId;
