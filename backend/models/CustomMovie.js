// models/CustomMovie.js
const mongoose = require('mongoose');

const customMovieSchema = new mongoose.Schema({
  movieId: {
    type: String,
    required: true,
    unique: true
  },
  customTitle: {
    type: String,
    default: '' 
  },
  customOverview: {
    type: String,
    default: '' 
  },
  metaTag:{
    type:String,
    default:""
  },
  category:{
    type:String,
    default:""
  },
  description:{
    type:String,
  }

},{
  timestamps:true
});

module.exports = mongoose.model('CustomMovie', customMovieSchema);
