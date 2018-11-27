const mongoose = require('mongoose');
const Book = require('../model/Book');
const Lend = require('../model/Lend');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

// get all books
exports.getAllBooks = async (req, res, next) => {
  const findBooks = await Book.find(
    {},
    // either use projection or .select() both will work, check if projection is better than select or not ?
    { title: 1, classification: 1, author: 1, imageUrl: 1 }
  )
    // .select('title classfication author pages imageUrl ')
    .populate('lend.lend')
    .sort({ createdAt: -1 });
  try {
    if (!findBooks) {
      return res.status(404).send('No Books Found!');
    }
    return await res.status(200).json(findBooks);
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
    return await res.status(200).json(singleBook);
  } catch (err) {
    return res.status(400).send(err);
  }
};

// Single Book Add @POST
exports.addBook = async (req, res, next) => {
  // keywods are the comma seperated values, we will make them an array so can map over it in the future ..
  let keywords = [];
  if (req.body.keywords) {
    // keywords.push(req.body.keywords.split(','));
    keywords = req.body.keywords.split(',');
    // console.log(keywords);
  }

  // let author = [];
  // if (req.body.author1) {
  //   author.push(req.body.author1);
  // }
  // if (req.body.author2) {
  //   author.push(req.body.author2);
  // }
  // if (req.body.author3) {
  //   author.push(req.body.author3);
  // }
  // if (req.body.author4) {
  //   author.push(req.body.author4);
  // }
  // if (req.body.author5) {
  //   author.push(req.body.author5);
  // }

  // author we can send a array with objects including values of author like below, check the playground mongo-aggregation file on how to send it from frontend.
  //from the frontend it should come like this....
  // [ { name: 'malik', email: 'malik@zeenah.com' },
  // { name: 'Ali', email: 'ali@zeenah.com' } ]

  const newBook = {
    title: req.body.title,
    classification: req.body.classification,
    author: req.body.author,
    isbn: req.body.isbn,
    keywords,
    pages: req.body.pages
  };
  const book = new Book(newBook);
  try {
    const saveBook = await book.save();
    return await res.status(200).json(saveBook);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Single Book Edit @POST
exports.editSingleBook = async (req, res, next) => {
  const bookId = req.params.id;

  let bookFields = {};

  // let author = [];
  // if (req.body.author1) {
  //   author.push(req.body.author1);
  // }
  // if (req.body.author2) {
  //   author.push(req.body.author2);
  // }
  // if (req.body.author3) {
  //   author.push(req.body.author3);
  // }
  // if (req.body.author4) {
  //   author.push(req.body.author4);
  // }
  // if (req.body.author5) {
  //   author.push(req.body.author5);
  // }
  // we should not use above method but should send author in [array] to be saved as an array of objects..
  bookFields.author = req.body.author;
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
    return await res.status(200).json(bookUpdate);
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
    return await res.status(200).send(`Book Deleted ${deleteBook}`);
  } catch (err) {
    return res.status(400).send(err);
  }
};

// Search Book
exports.searchBook = async (req, res, next) => {
  const search = req.params.search;
  console.log(typeof search);
  //below will search for malik but if malikmazhar is available it will bring that as well. $ is not at the end will continue looking for similar words.
  const regexFree = new RegExp(['^', search].join(''), 'i');
  //   const regexsecond = db.users.find( { 'name' : { '$regex' : yourvalue, '$options' : 'i' } } )
  try {
    // const bookSearch = await Book.find({ title: { $in: regexFree } });
    // $regex works with any word search .. will extend it to search in any field.
    const bookSearch = await Book.find(
      {
        // created text index in shell will do the $text search which is powerful than regex
        $text: { $search: [search] }
      },
      // sorting will help in bringing better hit up top (first in the list), it scores high in sorting..
      { score: { $meta: 'textScore' } },
      // for search we dont need all the fields but only few to show on drop down search list DownShift npm will show it in react.
      { title: 1, classification: 1, author: 1, imageUrl: 1, score: 1 }
    )
      // sort the score will inforce the score to sort, it works perfect without this but below will inforce it..
      .sort({ score: { $meta: 'textScore' } })
      .limit(10);
    // we are using PROJECTION here, can use .select as well but i guess projection is awesome.
    // .select('title classification pages author imageUrl');

    if (!bookSearch) {
      return res.status(404).send('Sorry no matching book found');
    }
    return await res.status(200).json(bookSearch);
  } catch (err) {
    return res.status(400).send('Something went wrong, Please try again ');
  }
};
