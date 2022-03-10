import { buildFeedbackPath, extractFeedback } from './index';

function handler(req, res) {
  // if (req.method === 'POST')

  //No conditional will accept any method (GET, POST, etc)
  const feedbackId = req.query.feedbackId;
  const filePath = buildFeedbackPath();
  const feedbackData = extractFeedback(filePath);

  const selectedFeedback = feedbackData.find(
    (feedback) => feedback.id === feedbackId
  );

  res.status(200).json({ feedback: selectedFeedback });
}

export default handler;
