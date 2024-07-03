const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 55,
    unique: true,
    trim: true,
  },
  // email: {
  //   type: String,
  //   lowercase: true,
  //   required:true,
  //   validate: [isEmail, 'Invalid email address'],
  //   trim: true,
  // },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
  picture: {
    type: String,
    default: './uploads/profile/random-user.png',
  },
  bio: {
    type: String,
    maxlength: 1024,
  },
  followers: {
    type: [String],
  },
  following: {
    type: [String],
  },
  likes: {
    type: [String],
  },
  unlikes: {
    type: [String],
  },
  
 }, 
 
); 


const userModel = mongoose.model('User', userSchema);
module.exports = userModel;
