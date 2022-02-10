import { useRouter } from 'next/router';

const FilteredEventsPage = () => {
  const router = useRouter();

  console.log(router.query);

  return (
    <div>
      <h1>FilteredEventsPage</h1>
    </div>
  );
};

export default FilteredEventsPage;
