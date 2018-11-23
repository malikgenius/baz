const express = require('express');
const router = express.Router();
const {
  getAllLends,
  getLendById,
  addLend,
  returnLend,
  renewLend
} = require('../../../controllers/lendController');

// Get Route for All books ....
router.get('/all', getAllLends);
// Get Book By ID
router.get('/:id', getLendById);
// Create new Book @Post Route
router.post('/addlend/:id', addLend);
// Edit / Update Book
router.post('/return-lend/:id', returnLend);
// RENEW LEND / Update Book
router.post('/renewlend/:id', renewLend);
// // Delete Book route
// router.post('/deletebook/:id', deleteSingleBook);
// // LEND BOOk REQUEST FROM EMPLOYEE
// router.post('/lendrequest/:id', lendRequest);

module.exports = router;
