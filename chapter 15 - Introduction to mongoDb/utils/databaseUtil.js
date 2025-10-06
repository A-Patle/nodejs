const mongoClient = require('mongodb').MongoClient;

const MONGO_URL =
  'mongodb+srv://aakashpatle781_db_user:v61rs8AGX18JLUDN@cluster0.wanobx7.mongodb.net/';

let _db;

const mongoConnect = (callback) =>
  mongoClient
    .connect(MONGO_URL)
    .then((client) => {
      console.log('connected to mongoDb successfully');
      _db = client.db('airbnbClone');
      callback();
    })
    .catch((err) => {
      console.log('error in connecting to mongoDb', err);
    });

const getDb = () => {
  if (!_db) {
    throw new Error('No database found!');
  }
  return _db;
};

module.exports = { mongoConnect, getDb };
