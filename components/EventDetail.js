const EventItem = (props) => {
  if (props === undefined) {
    return null;
  } else {
    const { event } = props;

    return (
      <div>
        <h2>{event.id}</h2>
        <div>
          <img src={'../../' + `${event.image}`} alt={event.title} />
        </div>

        <h3>{event.title}</h3>
        <p>{event.date}</p>
        <address>{event.location}</address>
        <p>{event.description}</p>
      </div>
    );
  }
};

export default EventItem;
