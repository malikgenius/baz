const express = require('express');
const router = express.Router();
const passport = require('passport');
const {
  getAllUsers,
  getUserById,
  searchUser,
  registerUser,
  loginUser
} = require('../../../controllers/userController');

// Register new User @Post Route
router.post('/register', registerUser);
// Login User
router.post('/login', loginUser);
// Get Route for All Users ....
router.get(
  '/all',
  passport.authenticate('jwt', {
    session: false
  }),
  getAllUsers
);
// Get User By ID
router.get(
  '/:id',
  passport.authenticate('jwt', {
    session: false
  }),
  getUserById
);
// Search user -- using mongodb text indexes ... awesome solution for text searches ..
router.get(
  '/searchuser/:search',
  passport.authenticate('jwt', {
    session: false
  }),
  searchUser
);

module.exports = router;
