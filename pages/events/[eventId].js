import ErrorAlert from '../../components/ui/error-alert';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';

const EventId = (props) => {
  const { event } = props;

  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );
  }

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
};

export default EventId;

async function getData() {
  const response = await fetch(
    'https://nextjs-course-data-fetch-6969f-default-rtdb.firebaseio.com/events.json'
  );

  const data = await response.json();

  const eventsArray = Object.values(data);

  return eventsArray;
}

export async function getStaticProps(context) {
  const { params } = context;

  const eventId = params.eventId;

  const data = await getData();

  const event = data.find((event) => event.id === eventId);

  return {
    props: { event: event },
    // revalidate: 10,
  };
}

export async function getStaticPaths() {
  const data = await getData();

  const ids = data.map((event) => event.id);
  const pathsWithIds = ids.map((id) => ({ params: { eventId: id } }));

  return {
    paths: pathsWithIds,
    fallback: true,
  };
}
