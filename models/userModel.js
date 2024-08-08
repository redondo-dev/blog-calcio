const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 55,
    unique: true,
    trim: true,
  },
  // Uncomment and use if email is required
  // email: {
  //   type: String,
  //   lowercase: true,
  //   required: true,
  //   validate: [isEmail, 'Invalid email address'],
  //   trim: true,
  // },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024,
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
}, {
  timestamps: true,


});



const userModel = mongoose.model('User', userSchema);
module.exports = userModel;
