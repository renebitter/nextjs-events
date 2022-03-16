import { useState, useEffect } from 'react';
import classes from './comment-list.module.css';
import LoadingSpinner from '../ui/loading-spinner';

function CommentList(props) {
  const { eventId } = props;
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState();

  //TODO: Refactor: Move to comments.js
  useEffect(() => {
    async function getComments() {
      await fetch('/api/comments/' + eventId)
        .then((response) => response.json())
        .then((data) => setComments(data.comments), setLoading(false));
    }

    getComments();
  }, []);

  if (comments === undefined || loading) {
    return <LoadingSpinner />;
  } else {
    return (
      <ul className={classes.comments}>
        {comments.map((comment) => (
          <li key={comment._id}>
            <p>{comment.text}</p>
            <div>By {comment.name}</div>
            <div>
              <address>{comment.email}</address>
            </div>
          </li>
        ))}
      </ul>
    );
  }
}

export default CommentList;
