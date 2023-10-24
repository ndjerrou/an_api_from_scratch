const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: String,
  price: String,
  description: String,
});

module.exports = mongoose.model('product', schema);
