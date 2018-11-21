const mongoose = require('mongoose');
const mongobazMlab = require('../config/Keys').mongobazMlab;
// Simple mongoose.com to only open single connection to DB.

mongoose
  .connect(
    mongobazMlab,
    { useNewUrlParser: true }
  )
  .then(err => {
    console.log('mongoFullStackAuth Mlab is connected!');
  })
  .catch(err => {
    console.log('error:', err);
  });
