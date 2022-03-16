import { useState, useRef, useContext } from 'react';
import NotificationContext from '../../store/notification-context';

import classes from './newsletter-registration.module.css';

function NewsletterRegistration() {
  const notificationCtx = useContext(NotificationContext);
  const emailInputRef = useRef();
  const [isInvalid, setIsInvalid] = useState(false);

  async function registrationHandler(event) {
    event.preventDefault();
    const userEmail = emailInputRef.current.value;

    const reqBody = { email: userEmail };

    if (
      !userEmail ||
      userEmail.trim() === '' ||
      !userEmail.includes('@') ||
      !userEmail.includes('.')
    ) {
      setIsInvalid(true);

      notificationCtx.showNotification({
        title: 'Invalid e-mail',
        message: 'Please enter a valid email address.',
        status: 'error',
      });
    }

    notificationCtx.showNotification({
      title: 'Signing up...',
      message: 'Registering for newsletter.',
      status: 'pending',
    });

    await fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        //Nested promise
        return response.json().then((data) => {
          throw new Error(data.message || 'Something went wrong');
        });
      })
      .then((data) => {
        notificationCtx.showNotification({
          title: 'Success!',
          message: 'Successfully registered for newsletter',
          status: 'success',
        });
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: 'Error',
          message: error.message || 'Something went wrong',
          status: 'error',
        });
      });
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={emailInputRef}
          />
          {/* TODO: Disabling button: Try to be more specific using 'status===pending'. See(notification.js). Define notification: null, // { title, message, status } ?  */}
          <button
            disabled={
              notificationCtx.notification !== null &&
              notificationCtx.notification !== undefined
            }>
            Register
          </button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
