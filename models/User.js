const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  facebook: String,
  instagram: String,
  twitter: String
});

module.exports = mongoose.model('User', userSchema);
