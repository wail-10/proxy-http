const mongoose = require('mongoose')

const DB_NAME = 'proxy-http'
const MONGODB_URI = `mongodb://127.0.0.1:27017/${DB_NAME}`

mongoose.connect(MONGODB_URI);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = db;