const express = require('express');
const { 
    getAllLibraries, 
    getLibraryById,
    getMostCommonGenre 
} = require('../controllers/libraryController');

const router = express.Router();

// Move specific routes below the general route to prevent conflict
router.get('/:library_id/most-common-genre', getMostCommonGenre);
router.get('/:library_id', getLibraryById);
router.get('/', getAllLibraries);

module.exports = router;