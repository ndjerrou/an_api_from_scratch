const mongoose = require('mongoose');
const MONGODB_URL = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@db.tounu.mongodb.net/api`;

module.exports = async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Impossible to connect, ', err.message);
  }
};
