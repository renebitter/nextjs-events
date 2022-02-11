import Link from 'next/link';

const Card = (props) => {
  {
    console.log(props.event.title);
  }

  return (
    <li>
      {props.event.id}
      <div>
        <img src={props.event.image} alt={props.event.title} />
      </div>

      <h3>{props.event.title}</h3>
      <p>{props.event.date}</p>
      <p>{props.event.description}</p>

      <Link
        href={{
          pathname: '/events/[id]',
          query: { id: props.event.id },
        }}>
        {props.event.title}
      </Link>
    </li>
  );
};

export default Card;
