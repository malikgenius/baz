const mongoose = require('mongoose');
const mongoLOCAL = require('../config/Keys').mongoLOCAL;
// Simple mongoose.com to only open single connection to DB.
mongoose
  .connect(
    mongoLOCAL,
    // Create Index True will not warn when creating indexes in Model .. check the model and wesbos node.js course 32 lecture
    { useNewUrlParser: true, useCreateIndex: true }
  )
  .then(err => {
    console.log('mongoLOCAL is connected!');
  })
  .catch(err => {
    console.log('error:', err);
  });
