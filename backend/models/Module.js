const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  content: String, 
});

module.exports = mongoose.model('Module', moduleSchema);
