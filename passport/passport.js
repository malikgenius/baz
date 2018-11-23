const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const secretOrKey = require('../config/Keys').secretOrKey;
const User = require('../model/User');

// cookie Extraction from the req function ... required if wanna use cookie with jwt.
var cookieExtractor = function(req) {
  var token = null;
  if (req && req.cookies) {
    token = req.cookies['jwt'];
  }
  return token;
};
// Passport jwt Authentication.
const options = {};
// options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.jwtFromRequest = cookieExtractor; // check token in cookie
options.secretOrKey = secretOrKey;

passport.use(
  new JwtStrategy(options, async (jwt_payload, done) => {
    try {
      const user = await User.findById(jwt_payload.id);
      if (!user) {
        return done(null, false);
      }
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  })
);
