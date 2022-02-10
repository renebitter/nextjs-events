import Link from 'next/link';

const EventPage = () => {
  const events = [
    { id: '01', name: 'Event 1' },
    { id: '02', name: 'Event 2' },
  ];

  return (
    <div>
      <h1>Events Page</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <Link
              href={{
                pathname: '/events/[id]',
                query: { id: event.id },
              }}>
              {event.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventPage;
