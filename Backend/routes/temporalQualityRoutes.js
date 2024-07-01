const temporalQualityController = require('../controller/temporalQualityController');
const express = require('express');
const router = express.Router();

router.post('/tempoconist', temporalQualityController.tempoConistency)
router.post('/tempoStartEnd', temporalQualityController.tempoStartend)
router.post('/tempoValidity', temporalQualityController.tempoValidity)

module.exports = router;