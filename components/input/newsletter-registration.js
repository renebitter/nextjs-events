import { useState, useRef } from 'react';

import classes from './newsletter-registration.module.css';

function NewsletterRegistration() {
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
      return;
    }

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
        {isInvalid && <p>Please enter a valid email address!</p>}
      </form>
    </section>
  );
}

export default NewsletterRegistration;
