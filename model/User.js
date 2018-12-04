const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const UserSchema = Schema(
  {
    firstname: {
      type: String,
      // lowercase: true
      trim: true
    },
    lastname: {
      type: String,
      // lowercase: true
      trim: true
    },
    email: {
      type: String,
      lowercase: true,
      trim: true
    },
    password: {
      type: String
    },
    imageUrl: {
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
  },
  { timestamps: true }
);

// Hashing Password ...

UserSchema.pre('save', function userSchemaPre(next) {
  const user = this;
  // if (user.method === 'local') {
  if (this.isModified(user.password) || this.isNew) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, (hashErr, hash) => {
        if (hashErr) {
          return next(hashErr);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

// Define Indexes check wesbos node course for details...
UserSchema.index({
  firstname: 'text',
  lastname: 'text',
  email: 'text'
});

const User = mongoose.model('users', UserSchema);

module.exports = User;

// module.exports = User = mongoose.model('user', UserSchema);
