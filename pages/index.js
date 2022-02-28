import Head from 'next/head';
import EventList from '../components/events/event-list';

function HomePage(props) {
  const { events } = props;

  return (
    <div>
      <Head>
        <title>Events</title>
        <meta name='description' content='lorem ipsum' />
      </Head>
      <EventList items={events} />
    </div>
  );
}

export default HomePage;

export async function getStaticProps() {
  const response = await fetch(
    'https://nextjs-course-data-fetch-6969f-default-rtdb.firebaseio.com/events.json'
  );

  const data = await response.json();

  const featuredEvents = Object.values(data).filter(
    (event) => event.isFeatured
  );

  return {
    props: { events: featuredEvents },
    revalidate: 1800, // 30min
  };
}
