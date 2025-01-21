const express = require('express');
const { 
  getAllUsers, 
  getUserById, 
  getBooksByUserId, 
  getActiveUsers, 
  getUsersWithMostCommonBorrowedGenre 
} = require('../controllers/userController');

const router = express.Router();

router.get('/', getAllUsers);
router.get('/active', getActiveUsers);

router.get('/:user_id', getUserById);
router.get('/:user_id/books', getBooksByUserId);
router.get('/:user_id/most-common-genre', getUsersWithMostCommonBorrowedGenre);

module.exports = router;