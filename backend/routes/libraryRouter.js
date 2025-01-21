const express = require('express');
const { 
    getAllLibraries, 
    getLibraryById,
    getMostCommonGenre 
} = require('../controllers/libraryController');

const router = express.Router();

router.get('/', getAllLibraries);
router.get('/:library_id', getLibraryById);
router.get('/:library_id/most-common-genre', getMostCommonGenre);


module.exports = router;