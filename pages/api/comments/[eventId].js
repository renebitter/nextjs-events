import {
  connectDatabase,
  insertDocument,
  filteredDocs,
} from '../../../helpers/db-util';

async function handler(req, res) {
  const eventId = req.query.eventId;

  // const client = new MongoClient(url);
  let client;

  //Database connection
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: 'Connection failed!' });
    return;
  }

  if (req.method === 'POST') {
    //Get data from http req body
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

    //Create new object
    const newComment = {
      email: email,
      name: name,
      text: text,
      eventId: eventId,
    };

    //Data insertion
    try {
      await insertDocument(client, 'comments', newComment);
      res
        .status(201)
        .json({ message: 'Comment added successfully.', comment: newComment });
    } catch (error) {
      res.status(500).json({ message: 'Inserting data failed!' });
    }
  }

  if (req.method === 'GET') {
    try {
      //Show comments per filter "eventId"
      //Arguments: (client, collection, eventId, sort)
      const documents = await filteredDocs(
        client,
        'comments',
        { eventId: eventId },
        { _id: -1 }
      );
      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ message: 'Getting comments failed.' });
    }

    //Gets all comments
    // try {
    //   const documents = await getAllDocuments(client, 'comments', { _id: -1 });
    //   res.status(200).json({ comments: documents });
    // } catch (error) {
    //   res.status(500).json({ message: 'Getting comments failed.' });
    // }
  }
  client.close();
}

export default handler;
