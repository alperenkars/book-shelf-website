const express = require('express');
const { getAllLibraries, getLibraryById } = require('../controllers/libraryController');
const router = express.Router();

router.get('/', getAllLibraries);
router.get('/:library_id', getLibraryById);

module.exports = router;