const EventDetail = (props) => {
  if (props === undefined) {
    return null;
  } else {
    const { event } = props;
    const readableDate = new Date(event.date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    const formattedAddress = event.location.replace(',', '\n');

    return (
      <div>
        <h2>{event.id}</h2>
        <h3>{event.title}</h3>
        <div>
          <img src={'/' + `${event.image}`} alt={event.title} />
        </div>
        <p>{event.date}</p>
        <p>{readableDate}</p>
        <address>{event.location}</address>
        <address>{formattedAddress}</address>
        <p>{event.description}</p>
      </div>
    );
  }
};

export default EventDetail;
