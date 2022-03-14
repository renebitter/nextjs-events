import Head from 'next/head';
import Layout from '../components/layout/layout';
import Notification from '../components/notification/notification';
import { NotificationContextProvider } from '../store/notification-context';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Head>
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1.0'
          />
        </Head>
        <Component {...pageProps} />
        <Notification
          title='Pending'
          message='Sending request...'
          status='pending'
        />
      </Layout>
    </NotificationContextProvider>
  );
}

export default MyApp;
