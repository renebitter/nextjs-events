import { useRouter } from 'next/router';
import { getEventById } from '../../data/dummy-data';

const EventId = () => {
  const router = useRouter();
  const event = getEventById(router.query.id);
  console.log(event);

  // if (event === undefined) {
  //   return null;
  // } else {
  return (
    <div>
      <h1>Event Detail Page</h1>
    </div>
  );
};
// };

export default EventId;
