const mongoose = require('mongoose');

const CeosoftsSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  removed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Ceosofts', CeosoftsSchema);