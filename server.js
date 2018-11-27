const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const morgan = require('morgan');
const cors = require('cors');
const passport = require('passport');

// Import Routes Files from Routes/api/.....
const book = require('./routes/api/book/bookRoute');
const lend = require('./routes/api/lend/lendRoute');
const user = require('./routes/api/user/userRoute');

const app = express();

// MiddleWare
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({ extended: false }, { defaultCharset: 'utf-8' })
);
// below will parse cookie to get the JWT Token from it and passport will analyze the jwt token and authenticate user if valid.
app.use(cookieParser());
// Passport
app.use(passport.initialize());
//Passport Jwt Strategy
require('./passport/passport');

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
app.use('/api/user', user);
app.use('/api/book', book);
app.use('/api/lend', lend);

const port = process.env.PORT || 5000;
app.listen(port, err => {
  if (err) {
    return console.log(`ERROR: ${err}`);
  }
  console.log(`listening on port ${port}`);
});

// sequelize db with app
// sequelize
//   .sync({ force: true, logging: console.log })
//   .then(result => {
//     // console.log(result);
//     Product.findOne().then(product => {
//       console.log(product.get('title'));
//     });
//     // return Product.create({
//     //   title: 'شسيب',
//     //   price: 200,
//     //   imageUrl: 'no url for image yet',
//     //   description: 'testing arabic text search'
//     // });
//     // app.listen(5000);
//   })
//   .catch(err => {
//     console.log(err);
//   });

// sequelize
//   .sync()
//   .then(result => {
//     // console.log(result);
//     app.listen(3000);
//   })
//   .catch(err => {
//     console.log(err);
//   });
