const { format } = require('path');
const formatControllers = require('../controller/formatConsistencyController');
const express = require('express');
const router = express.Router();


router.post('/checkPK-format',formatControllers.checkPrimaryKeyFormat);
router.post('/checkFK-format',formatControllers.checkForeignKeyFormat);
module.exports = router;
