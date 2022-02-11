const EventItem = (props) => {
  {
    console.log(props);
  }

  if (props === undefined) {
    <div>Loading...</div>;
  } else {
    return (
      <div>
        {props.event.id}
        <div>
          <img
            src={'../../' + `${props.event.image}`}
            alt={props.event.title}
          />
        </div>

        <h3>{props.event.title}</h3>
        <p>{props.event.date}</p>
        <p>{props.event.description}</p>
      </div>
    );
  }
};

export default EventItem;
