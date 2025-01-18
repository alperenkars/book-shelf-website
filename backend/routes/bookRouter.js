const express = require('express');
const { getBooks, getBookById } = require('../controllers/bookController');
const router = express.Router();

router.get('/books', getBooks);
router.get('/books/:book_id', getBookById);

module.exports = router;
