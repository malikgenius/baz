const mongoose = require('mongoose');
const Book = require('../model/Book');
const Lend = require('../model/Lend');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

// get all books
exports.getAllLends = async (req, res, next) => {
  const findBooks = await Lend.find()
    .populate('book')
    .sort({ createdAt: -1 });
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
  //   console.log(req.body);
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

    const lendedbook = await new Lend(newLend);
    const saveLend = await lendedbook.save();
    // const lendAdded = await requestedBook.lend.unshift(saveLend.id);
    // const StockChanged = await {requestedBook.inStock: }
    const editBook = await Book.updateOne(
      { _id: requestedBook.id },
      //   { inStock: false },
      {
        $set: {
          inStock: false
        },
        $push: { lend: { $each: [{ lend: saveLend.id }], $position: 0 } }
      },
      { multi: true }
      //   { array: { $push: { lend: { $each: ['value'], $position: 0 } } } },
      //   { new: true }
    );
    // const saveBook = await editBook.save();
    return res.status(200).send(saveLend);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Edit Single Lend ---- Return Lend
exports.returnLend = async (req, res, next) => {
  const currentDate = new Date();
  const lendId = req.params.id;

  const lendedBook = await Lend.findById(lendId);
  const requestedBook = await Book.findById(lendedBook.book);
  try {
    if (!lendedBook) {
      return res.status(404).send('No Lend record found with given ID');
    }
    if (!requestedBook) {
      return res.status(404).send('No Book found');
    }

    const editLend = await Lend.findByIdAndUpdate(
      { _id: lendId },
      {
        $set: {
          isActive: false
        }
      },
      { new: true }
    );
    const editBook = await Book.updateOne(
      { _id: requestedBook },
      {
        $set: {
          inStock: true
        }
      },
      { new: true }
    );
    return res.send(lendedBook);
  } catch (err) {
    throw err;
  }
};
