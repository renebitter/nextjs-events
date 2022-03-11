import { MongoClient } from 'mongodb';

async function handler(req, res) {
  if (req.method === 'POST') {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email address.' });
      return;
    }

    const client = await MongoClient.connect(
      process.env.MONGODB_NEWSLETTER_URI
    );

    console.log('Connected successfully to server');

    const db = client.db();
    const insertResult = await db
      .collection('emails')
      .insertOne({ email: userEmail });
    console.log('Inserted documents =>', insertResult);

    client.close();

    res.status(201).json({ message: 'Signed up!' });
  }
}

export default handler;
