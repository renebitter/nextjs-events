import classes from './comment-list.module.css';
import LoadingSpinner from '../ui/loading-spinner';

function CommentList(props) {
  const { items, loading } = props;

  if (items === undefined || loading) {
    return <LoadingSpinner />;
  } else {
    return (
      <ul className={classes.comments}>
        {items.map((comment) => (
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
