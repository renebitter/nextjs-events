import { buildFeedbackPath, extractFeedback } from '../api/feedback';
import { useState } from 'react';

function FeedbackPage(props) {
  //redundant, since it's already available from getStaticProps
  const [feedbackData, setFeedbackData] = useState();

  function loadFeedbackHandler(id) {
    fetch(`/api/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFeedbackData(data.feedback);
      });
  }

  return (
    <>
      {feedbackData && <p>{feedbackData.email}</p>}
      <ul>
        {props.feedbackItems.map((item) => (
          <li key={item.id}>
            {item.text}

            {/* loadFeedbackHandler.bind(null -> this, item.id -> firs argument) */}
            {/* <button onClick={loadFeedbackHandler.bind(null, item.id)}>
              Show Details
            </button> */}

            {/* onClick={loadFeedbackHandler(item.id) won't work because it calls the function before clicking*/}
            <button onClick={() => loadFeedbackHandler(item.id)}>
              Show Details
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export async function getStaticProps() {
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);
  return {
    props: {
      feedbackItems: data,
    },
  };
}

export default FeedbackPage;
