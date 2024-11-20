const express = require('express');
const router = express.Router();
const audioController = require('../controllers/audioController');

router.post('/process', audioController.processYouTubeAudio);

module.exports = router;
