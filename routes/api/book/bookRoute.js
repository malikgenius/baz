const express = require('express');
const router = express.Router();
const {
  getAllBooks,
  addBook,
  getBookById,
  editSingleBook,
  deleteSingleBook,
  searchBook
} = require('../../../controllers/bookController');

// Get Route for All books ....
router.get('/all', getAllBooks);
// Get Book By ID
router.get('/:id', getBookById);
// Create new Book @Post Route
router.post('/addbook', addBook);
// Edit / Update Book
router.post('/editbook/:id', editSingleBook);
// Delete Book route
router.post('/deletebook/:id', deleteSingleBook);
// LEND BOOk REQUEST FROM EMPLOYEE
router.get('/searchbook/:search', searchBook);

module.exports = router;
