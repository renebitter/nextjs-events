import { useState, useEffect } from 'react';
import classes from './comment-list.module.css';

function CommentList(props) {
  const { eventId } = props;
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState();

  useEffect(() => {
    async function getComments() {
      await fetch('/api/comments/' + eventId)
        .then((response) => response.json())
        .then((data) => setComments(data.comments), setLoading(false));
    }

    getComments();
  }, []);

  if (comments === undefined || loading) {
    return <p>Loading...</p>;
  } else {
    return (
      <ul className={classes.comments}>
        {/* Render list of comments - fetched from API */}

        {comments
          //filter comments for given detail page. No need, since it's done in the API
          // .filter((event) => event.eventId === eventId)
          .map((comment) => (
            <li key={comment.id}>
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
