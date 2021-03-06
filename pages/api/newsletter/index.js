import { connectDatabase, insertDocument } from '../../../helpers/db-util';

async function handler(req, res) {
  if (req.method === 'POST') {
    const userEmail = req.body.email;

    if (
      !userEmail ||
      userEmail.trim() === '' ||
      !userEmail.includes('@') ||
      !userEmail.includes('.')
    ) {
      res.status(422).json({ message: 'Invalid email address.' });
      return;
    }

    // const client = new MongoClient(url);
    let client;

    //Database connection
    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: 'Connection failed!' });
    }

    //Data insertion
    try {
      await insertDocument(client, 'newsletter', { email: userEmail });
      console.log('Email added!');
      client.close();
    } catch (error) {
      res.status(500).json({ message: 'Inserting data failed!' });
    }

    res.status(201).json({ message: 'Signed up!' });
  }
}

export default handler;
