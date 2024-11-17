// models/mode.js
const mongoose = require('mongoose');

const modeSchema = new mongoose.Schema({
  onMode: {
    type: Boolean,
    default: false
  },
  link: {
    type: String,
    default: ""
  }
});

module.exports = mongoose.model('Mode', modeSchema);
