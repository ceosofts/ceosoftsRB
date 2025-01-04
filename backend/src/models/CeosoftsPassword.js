const mongoose = require('mongoose');

const CeosoftsPasswordSchema = new mongoose.Schema({
  userModel: {
    type: String,
    required: true,
  },
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

module.exports = mongoose.model('CeosoftsPassword', CeosoftsPasswordSchema);