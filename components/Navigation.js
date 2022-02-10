import Link from 'next/link';

const Navigation = (props) => {
  return (
    <>
      <div>
        {' '}
        <ul>
          <li>
            <Link href='/'>Home</Link>
          </li>
          <li>
            <Link href='/events'>Events</Link>
          </li>
        </ul>
      </div>
      <main>{props.children}</main>
    </>
  );
};

export default Navigation;
