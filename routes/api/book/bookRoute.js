const express = require('express');
const router = express.Router();
const {
  getAllBooks,
  addBook,
  getBookById,
  editSingleBook,
  deleteSingleBook,
  searchBook,
  getAllKeywords,
  getAuthorBooks,
  getAllBooksByAuthor
} = require('../../../controllers/bookController');

// Get Route for All books ....
router.get('/all', getAllBooks);
// Get Book By ID
router.get('/book/:id', getBookById);
// Create new Book @Post Route
router.post('/addbook', addBook);
// get All tags count... it will return how many times oman was used in tags .. check wesbos
router.get('/keywords', getAllKeywords);
// one author contributed in how many books, when someone click on this in frontend should go to all those books which includes the selected author ..
router.get('/authors', getAuthorBooks);
// get all the books by author from the link where author-books shows all books related to single author.
// to get all on same Controller we can use below but if we want to keep them seperate we should go for seperate routes ..
router.get('/authors/:author', getAuthorBooks);
// seperate routes .. will decide in React how to show this data ..
// router.get('/authors/:author', allBooksByAuthor);

// Edit / Update Book
router.post('/editbook/:id', editSingleBook);
// Delete Book route
router.post('/deletebook/:id', deleteSingleBook);

// below are the routes with extra :id fields dont put one up in the list where route is exact, this will throw cost ID error..
// LEND BOOk REQUEST FROM EMPLOYEE
router.get('/searchbook/:search', searchBook);

module.exports = router;
