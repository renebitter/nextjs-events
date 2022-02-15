import { useRouter } from 'next/router';
import EventDetail from '../../components/EventDetail';
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
        <h1>Event Detail Page</h1>
        <EventDetail event={event} />
      </div>
    );
  }
};

export default EventId;
