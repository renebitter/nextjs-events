import { useRef } from 'react';

import classes from './newsletter-registration.module.css';

function NewsletterRegistration() {
  const emailInputRef = useRef();

  async function registrationHandler(event) {
    event.preventDefault();
    const userEmail = emailInputRef.current.value;
    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
    console.log(userEmail);
    console.log(JSON.stringify(userEmail));

    const reqBody = { email: userEmail };

    await fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
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
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
