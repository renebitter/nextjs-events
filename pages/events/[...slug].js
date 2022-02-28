import Head from 'next/head';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import ErrorAlert from '../../components/ui/error-alert';
import Button from '../../components/ui/button';

const FilteredEventsPage = (props) => {
  const { filteredEvents, date } = props;
  const numYear = date.numYear;
  const numMonth = date.numMonth;

  // "-1" because Date takes the first month as 0
  const createDate = new Date(numYear, numMonth - 1);

  if (!filteredEvents) {
    return <p className='center'>Loading...</p>;
  }

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid filter!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </>
    );
  }

  // NO FILTERED EVENTS
  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No events found for the chosen date!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Filtered Events</title>
        <meta
          name='description'
          content={`All events for ${numMonth}/${numYear}`}
        />
      </Head>
      <ResultsTitle date={createDate} />
      <EventList items={filteredEvents} />
    </>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;

  const filterData = params.slug;
  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  async function getFilteredEvents(dateFilter) {
    const { year, month } = dateFilter;

    const response = await fetch(
      'https://nextjs-course-data-fetch-6969f-default-rtdb.firebaseio.com/events.json'
    );
    const data = await response.json();
    const events = Object.values(data);

    const filteredEvents = events.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
      );
    });

    return filteredEvents;
  }

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  return {
    props: {
      filteredEvents: filteredEvents,
      date: {
        numYear: numYear,
        numMonth: numMonth,
      },
    },
  };
}

export default FilteredEventsPage;
