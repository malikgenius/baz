const mongoose = require('mongoose');
const mongoLOCAL = require('../config/Keys').mongoLOCAL;
// Simple mongoose.com to only open single connection to DB.
mongoose
  .connect(
    mongoLOCAL,
    { useNewUrlParser: true }
  )
  .then(err => {
    console.log('mongoLOCAL is connected!');
  })
  .catch(err => {
    console.log('error:', err);
  });
