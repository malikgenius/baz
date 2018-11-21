const mongoose = require('mongoose');
const Book = require('../model/Book');
const Lend = require('../model/Lend');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

// get all books
exports.getAllBooks = async (req, res, next) => {
  const findBooks = await Book.find();
  try {
    if (!findBooks) {
      return res.status(404).send('No Books Found!');
    }
    return res.status(200).json(findBooks);
  } catch (err) {
    return res.status(400).send(err);
  }
};

//get single book by id
exports.getBookById = async (req, res, next) => {
  const bookId = req.params.id;
  const singleBook = await Book.findById(bookId);
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
exports.addBook = async (req, res, next) => {
  console.log(req.body);
  let author = [];
  if (req.body.author1) {
    author.push(req.body.author1);
  }
  if (req.body.author2) {
    author.push(req.body.author2);
  }
  if (req.body.author3) {
    author.push(req.body.author3);
  }
  if (req.body.author4) {
    author.push(req.body.author4);
  }
  if (req.body.author5) {
    author.push(req.body.author5);
  }
  // the way it should be recieved from front end form ... dont know any better way yet but this works in addbook and editbook as well.
  // below is postman example not the React .. find out way in next.js or react.js

  //   "author1": {
  // 	"name": "Malik",
  // 	"email": "m@mail.com",
  // 	"website": "mysite.com"
  // },
  // "author2": {
  // 	"name": "Malik2",
  // 	"email": "m@mail2.com",
  // 	"website": "mysite2.com"
  // },
  // "author3": {
  // 	"name": "Malik3",
  // 	"email": "m3@mail.com",
  // 	"website": "mysite3.com"
  // }
  const newBook = {
    title: req.body.title,
    classification: req.body.classification,
    author,
    isbn: req.body.isbn,
    keywords: req.body.keywords,
    pages: req.body.pages
  };
  const book = new Book(newBook);
  try {
    const saveBook = await book.save();
    return res.status(200).json(saveBook);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Single Book Edit @POST
exports.editSingleBook = async (req, res, next) => {
  const bookId = req.params.id;

  let bookFields = {};
  let author = [];
  if (req.body.author1) {
    author.push(req.body.author1);
  }
  if (req.body.author2) {
    author.push(req.body.author2);
  }
  if (req.body.author3) {
    author.push(req.body.author3);
  }
  if (req.body.author4) {
    author.push(req.body.author4);
  }
  if (req.body.author5) {
    author.push(req.body.author5);
  }
  bookFields.author = author;
  bookFields.title = req.body.title;
  bookFields.classification = req.body.classification;
  bookFields.auther = req.body.auther;
  bookFields.isbn = req.body.isbn;
  bookFields.keywords = req.body.keywords;
  bookFields.pages = req.body.pages;
  try {
    const bookUpdate = await Book.findByIdAndUpdate(
      { _id: bookId },
      { $set: bookFields },
      { new: true }
    );
    if (!bookUpdate) {
      return res.status(404).send(`Book not found with specified Id ${bookId}`);
    }
    return res.status(200).json(bookUpdate);
  } catch (err) {
    return res.status(400).send(err);
  }
};

// Delete Book
exports.deleteSingleBook = async (req, res, next) => {
  const bookId = req.params.id;
  try {
    const deleteBook = await Book.findByIdAndDelete(bookId);
    if (!deleteBook) {
      return res.status(404).send(`No Book found to Delete by Id: ${bookId}`);
    }
    return res.status(200).send(`Book Deleted ${deleteBook}`);
  } catch (err) {
    return res.status(400).send(err);
  }
};

// Book Lend Request
exports.lendRequest = async (req, res, next) => {
  const bookId = req.params.id;
  const requestedBook = await Book.findById(bookId);
  try {
    if (!requestedBook) {
      return res.status(404).send('Requested Book not found');
    }
    if (!requestedBook.inStock) {
      return res
        .status(404)
        .send(
          `Sorry book ${requestedBook.title} is not in Stock at the moment`
        );
    }
  } catch (err) {
    return res.status(400).send(err);
  }
  return res.status(200).send(` you requested for ${bookId}`);
};
