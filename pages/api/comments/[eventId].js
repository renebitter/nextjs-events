import fs from 'fs';
import path from 'path';

//DRY
export function buildCommentsPath() {
  return path.join(process.cwd(), 'data', 'comments.json');
}

//DRY
export function extractComments(filePath) {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  return data;
}

function handler(req, res) {
  const eventId = req.query.eventId;

  if (req.method === 'POST') {
    //get data from http req body
    const { email, name, text } = req.body;

    //Server-side validation
    if (
      !email.includes('@') ||
      !email.includes('.') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input.' });
      client.close();
      return;
    }

    //create new object
    const newComment = {
      id: new Date().toISOString(),
      email: email,
      name: name,
      text: text,
      eventId: eventId,
    };

    //Call DRY functions
    const filePath = buildCommentsPath();
    const data = extractComments(filePath);

    data.push(newComment);

    console.table(newComment);
    console.table(data);

    fs.writeFileSync(filePath, JSON.stringify(data));

    res.status(201).json({ message: 'Success', comment: newComment });
  }

  if (req.method === 'GET') {
    //Call DRY functions
    const filePath = buildCommentsPath();
    const data = extractComments(filePath);

    console.table(data);

    res.status(200).json({ comments: data });
  }
}

export default handler;
