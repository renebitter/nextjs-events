import Link from 'next/link';

const Card = (props) => {
  const { event } = props;

  return (
    <li>
      {event.id}
      <div>
        <img src={event.image} alt={event.title} />
      </div>

      <h3>{event.title}</h3>
      <p>{event.date}</p>
      <p>{event.description}</p>

      <Link
        href={{
          pathname: '/events/[id]',
          query: { id: event.id },
        }}>
        {event.title}
      </Link>
    </li>
  );
};

export default Card;
