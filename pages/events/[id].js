import { useRouter } from 'next/router';
const EventId = () => {
  const router = useRouter();

  console.log(router.query);

  return (
    <div>
      <h1>EventId Page {router.query.id}</h1>
    </div>
  );
};

export default EventId;
