const mongoose = require('mongoose');
const Book = require('../model/Book');
const Lend = require('../model/Lend');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

// get all books
exports.getAllLends = async (req, res, next) => {
  const findBooks = await Lend.find().populate('book');
  try {
    if (!findBooks) {
      return res.status(404).send('No Books Found!');
    }
    return res.status(200).json(findBooks);
  } catch (err) {
    return res.status(400).send(err);
  }
};

//get single Lended book by id
exports.getLendById = async (req, res, next) => {
  const bookId = req.params.id;
  const singleBook = await Lend.findById(bookId);
  try {
    if (!singleBook) {
      return res.status(404).send(`No book Found by the given ID: ${bookId}`);
    }
    return res.status(200).json(singleBook);
  } catch (err) {
    return res.status(400).send(err);
  }
};

// Single Book Add @POST
exports.addLend = async (req, res, next) => {
  console.log(req.body);
  const currentDate = new Date();

  const newLend = {
    book: req.params.id,
    returnDate: currentDate.setDate(currentDate.getDate() + 7)
  };

  try {
    const requestedBook = await Book.findById(req.params.id);
    if (!requestedBook) {
      return res.status(404).json(`Sorry couldnt find the requested book`);
    }
    if (!requestedBook.inStock) {
      return res
        .status(200)
        .json(
          `${
            requestedBook.title
          } is not in stock at the moment, please contact librarian`
        );
    }

    const book = await new Lend(newLend);
    const saveLend = await book.save();
    const editBook = await Book.updateOne(
      { _id: requestedBook.id },
      { inStock: false },
      { new: true }
    );
    // const saveBook = await editBook.save();
    return res.status(200).send(saveLend);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Edit Single Lend ---- Return Lend
exports.editSingleLend = (req, res, next) => {};
