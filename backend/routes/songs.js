const express = require('express');
const router = express.Router();
const songsController = require('../controllers/songsController');


router.post('/', songsController.createSong);
router.get('/:id', songsController.getSong);
router.get('/', songsController.getSongs);
router.delete('/:id', songsController.deleteSong);
router.put('/:id', songsController.updateSong);

module.exports = router;