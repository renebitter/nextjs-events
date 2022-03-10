import Head from 'next/head';
import ErrorAlert from '../../components/ui/error-alert';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import Comments from '../../components/input/comments';

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
      <Head>
        <title>{event.title}</title>
        <meta name='description' content={event.description} />
      </Head>
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
      <Comments />
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

  if (!event) {
    return { notFound: true };
  }

  return {
    props: { event: event },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const data = await getData();
  // const pathsWithIds = data.map((event) => ({
  //   params: { eventId: event.id },
  // }));

  //Pre-render only featured events
  const featuredEvents = Object.values(data).filter(
    (event) => event.isFeatured
  );

  const pathsWithIds = featuredEvents.map((event) => ({
    params: { eventId: event.id },
  }));

  return {
    paths: pathsWithIds,
    fallback: 'blocking', //'blocking' waits for page to be fully generated before rendering it (no loading/error before)
  };
}
