const express = require('express');
const { 
  getBooks, 
  getBookById, 
  getMostPopularBooks 
} = require('../controllers/bookController');

const router = express.Router();

router.get('/', getBooks);
router.get('/popular', getMostPopularBooks);
router.get('/:bookId', getBookById);

module.exports = router;
