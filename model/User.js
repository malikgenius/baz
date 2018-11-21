const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
  name: {
    type: String,
    lowercase: true
  },
  email: {
    type: String,
    lowercase: true
  },
  password: {
    type: String
  },
  image: {
    type: String
  },
  secretToken: {
    type: String
  },
  active: {
    type: Boolean
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: Date
  }
});

module.exports = User = mongoose.model('user', UserSchema);
