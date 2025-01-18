const express = require('express');
const { getAllUsers ,getUserById} = require('../controllers/userController');
const router = express.Router();

router.get('/users/', getAllUsers);
router.get('/users/:user_id', getUserById)

module.exports = router;
