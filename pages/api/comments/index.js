import fs from 'fs';
import path from 'path';

//DRY
export function buildFeedbackPath() {
  return path.join(process.cwd(), 'data', 'comments.json');
}

//DRY
export function extractFeedback(filePath) {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  return data;
}

function handler(req, res) {
  console.log(req.body);
  if (req.method === 'POST') {
    //get data from http req body
    const email = req.body.email;
    const name = req.body.name;
    const text = req.body.text;

    //create new object
    const newComment = {
      id: new Date().toISOString(),
      email: email,
      name: name,
      text: text,
    };

    //Call DRY functions
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);

    data.push(newComment);

    console.table(newComment);
    console.table(data);

    fs.writeFileSync(filePath, JSON.stringify(data));

    res.status(201).json({ message: 'Success', feedback: newComment });
  } else {
    //Call DRY functions
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);

    console.table(data);

    res.status(200).json({ feedback: data });
  }
}

export default handler;
