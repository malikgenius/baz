const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const morgan = require('morgan');
const cors = require('cors');

// Import Routes Files from Routes/api/.....
const book = require('./routes/api/book/bookRoute');
const lend = require('./routes/api/lend/lendRoute');

const app = express();

// MiddleWare
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Logging
app.use(morgan('combined'));
app.use(
  morgan('common', {
    stream: fs.createWriteStream('./access.log', { flags: 'a' })
  })
);

// CORS Allowed, if app sends request to thirdparty we need CORS or will get an error.
app.use(cors());
// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   );
//   next();
// });

// mongodb load on startup
if (process.env.NODE_ENV === 'production') {
  require('./mongodb/mongodbMlab');
} else {
  require('./mongodb/mongodb');
}

// Routes
app.use('/api/book', book);
app.use('/api/lend', lend);

const port = process.env.PORT || 5000;
app.listen(port, err => {
  if (err) {
    return console.log(`ERROR: ${err}`);
  }
  console.log(`listening on port ${port}`);
});
