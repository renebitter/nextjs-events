import { useRouter } from 'next/router';
import Head from 'next/head';
import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';

const AllEventsPage = (props) => {
  const router = useRouter();
  const { events } = props;

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }
  return (
    <>
      <Head>
        <title>All Events</title>
        <meta name='description' content='All Events' />
      </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </>
  );
};

export default AllEventsPage;

export async function getStaticProps() {
  const response = await fetch(
    'https://nextjs-course-data-fetch-6969f-default-rtdb.firebaseio.com/events.json'
  );
  const data = await response.json();
  const events = Object.values(data);

  return {
    props: { events: events },
    revalidate: 60,
  };
}
