import { MongoClient } from 'mongodb';

export async function connectDatabase() {
  const client = await MongoClient.connect(process.env.MONGODB_EVENTS_URI);
  console.log('Connected successfully to server');
  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();
  const result = await db.collection(collection).insertOne(document);
  return result;
}

export async function filteredDocs(client, collection, eventId, sort) {
  const db = client.db();
  const filteredDocs = await db
    .collection(collection)
    .find(eventId)
    .sort(sort)
    .toArray();
  console.log(`Found documents filtered by eventId: ${eventId.eventId}`);

  return filteredDocs;
}

export async function getAllDocuments(client, collection, sort) {
  const db = client.db();

  const documents = await db.collection(collection).find().sort(sort).toArray();

  return documents;
}
