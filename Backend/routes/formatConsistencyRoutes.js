const { format } = require('path');
const formatControllers = require('../controller/formatConsistencyController');
const express = require('express');
const router = express.Router();

router.post('/create-format', formatControllers.createFormat);
router.get('/get-formats', formatControllers.getFormats);

router.put('/update-format/:id',formatControllers.updateFormat);
router.post('/checkPK-format',formatControllers.checkPrimaryKeyFormat);
router.post('/checkFK-format',formatControllers.checkForeignKeyFormat);
module.exports = router;
