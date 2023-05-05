const { MongoClient } = require('mongodb');
require('dotenv').config();
const url = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`;


const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 50,
});

const dbName = 'employee';

let db;

async function connect() {
  if (!db) {
    try {
      await client.connect();
      console.log('Connected successfully to server');
      db = client.db(dbName);
    } catch (error) {
      console.error(error);
    }
  }
  return db;
}

module.exports = connect;

