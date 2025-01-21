const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// Fetch all books
router.get('/', bookController.getBooks);

// Fetch book details by ID
router.get('/:bookId', bookController.getBookById);

module.exports = router;