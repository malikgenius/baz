const mongoose = require('mongoose');
const User = require('../model/User');
const Lend = require('../model/Lend');
const Book = require('../model/Book');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const secretOrKey = require('../config/Keys').secretOrKey;
const randomstring = require('randomstring');

// Register a new User @POST
exports.registerUser = async (req, res, next) => {
  const {
    firstname,
    lastname,
    email,
    password,
    password2,
    imageUrl
  } = req.body;
  const user = await User.findOne({ email: email });
  try {
    if (user) {
      return res
        .status(400)
        .json('Email is already being used for other Account');
    }
    if (password !== password2) {
      return res.status(400).json('confirm password do not match');
    }

    const newUser = {
      firstname,
      lastname,
      email,
      password,
      imageUrl
    };
    const saveUser = await new User(newUser);
    // bcrypt encryption will be done in User Model in pre method.
    const secretToken = randomstring.generate();
    saveUser.secretToken = secretToken;
    // Active Property False, till the user verify email.
    saveUser.active = false;
    const userSaved = await saveUser.save();
    return res
      .status(200)
      .json(
        `${firstname} ${lastname} your account was created successfully, please check your ${email} for verification link to activate account.`
      );
  } catch (err) {
    throw err;
  }
};

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json('user not found');
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(404).json('wrong Password, please try again');
    }
    const payload = {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      active: user.active,
      isAdmin: user.isAdmin
    };
    if (!user.active) {
      return res
        .status(400)
        .json(`Please confirm your email ${email} to activate your account`);
    }
    const token = await jwt.sign(payload, secretOrKey, { expiresIn: '24h' });
    res.cookie('jwt', token);
    console.log({ token: token });
    return res.json({ token: 'JWT' + token });
  } catch (err) {
    throw err;
  }
};

// Get All Users List
exports.getAllUsers = async (req, res, next) => {
  //   console.log(req.cookies);
  try {
    const user = await User.find();
    if (!user) {
      return res.status(404).json('Sorry no user found');
    }
    return res.status(200).json(user);
  } catch (err) {
    throw err;
  }
};
// Get Single User by Id
exports.getUserById = async (req, res, next) => {
  const { user } = req;
  const userId = req.params.id;
  try {
    if (!user.isAdmin) {
      return res
        .status(400)
        .json('Sorry you are not Authorized to view this Page');
    }
    const findUser = await User.findById(userId);
    return res.status(200).json(findUser);
  } catch (err) {
    throw err;
  }
};
