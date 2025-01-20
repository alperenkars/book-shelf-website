const express = require('express');
const { getAllUsers, getUserById, getBooksByUserId } = require('../controllers/userController');
const router = express.Router();

router.get('/', getAllUsers);
router.get('/:user_id', getUserById);
router.get('/:user_id/books', getBooksByUserId);

module.exports = router;