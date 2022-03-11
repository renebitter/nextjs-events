import { MongoClient } from 'mongodb';

async function handler(req, res) {
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

    const client = await MongoClient.connect(process.env.MONGODB_COMMENTS_URI);
    console.log('Connected successfully to server');

    const db = client.db();
    const insertResult = await db.collection('comments').insertOne(newComment);
    console.log('Inserted documents =>', insertResult);

    client.close();

    res.status(201).json({ message: 'Success', comment: newComment });
  }

  if (req.method === 'GET') {
    const client = await MongoClient.connect(process.env.MONGODB_COMMENTS_URI);
    console.log('Connected successfully to server');

    const db = client.db();

    // const findResult = await db.collection('comments').find({}).toArray();
    // console.log('Found documents =>', findResult);

    const filteredDocs = await db
      .collection('comments')
      .find({ eventId: eventId })
      .toArray();
    console.log(
      `Found documents filtered by eventId: ${eventId} =>`,
      filteredDocs
    );

    client.close();

    res.status(200).json({ comments: filteredDocs });
  }
}

export default handler;
