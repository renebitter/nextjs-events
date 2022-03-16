import { useRef, useContext } from 'react';
import NotificationContext from '../../store/notification-context';
import classes from './new-comment.module.css';

function NewComment(props) {
  const notificationCtx = useContext(NotificationContext);

  const emailInputRef = useRef();
  const nameInputRef = useRef();
  const commentInputRef = useRef();

  function sendCommentHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredName = nameInputRef.current.value;
    const enteredComment = commentInputRef.current.value;

    if (
      !enteredEmail ||
      enteredEmail.trim() === '' ||
      !enteredEmail.includes('@') ||
      !enteredEmail.includes('.') ||
      !enteredName ||
      enteredName.trim() === '' ||
      !enteredComment ||
      enteredComment.trim() === ''
    ) {
      setIsInvalid(true);
      notificationCtx.showNotification({
        title: 'Invalid message',
        message: 'Please enter a valid email address, name and comment.',
        status: 'error',
      });
      return;
    }

    notificationCtx.showNotification({
      title: 'Sending message...',
      message: 'Delivering your message.',
      status: 'pending',
    });

    props.onAddComment({
      email: enteredEmail,
      name: enteredName,
      text: enteredComment,
      // eventId is set by API route
    });
  }

  return (
    <form className={classes.form} onSubmit={sendCommentHandler}>
      <div className={classes.row}>
        <div className={classes.control}>
          <label htmlFor='email'>Your email</label>
          <input type='email' id='email' ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='name'>Your name</label>
          <input type='text' id='name' ref={nameInputRef} />
        </div>
      </div>
      <div className={classes.control}>
        <label htmlFor='comment'>Your comment</label>
        <textarea id='comment' rows='5' ref={commentInputRef}></textarea>
      </div>
      <button>Submit</button>
    </form>
  );
}

export default NewComment;
