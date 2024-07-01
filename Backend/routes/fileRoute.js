// routes/fileRoutes.js

const express = require('express');
const router = express.Router();
const fileController = require('../controller/fileController');
const multer = require('multer');

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Destination folder for storing files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename
  },
});
const upload = multer({ storage: storage });

// POST endpoint for uploading a file
router.post('/upload', upload.single('file'), fileController.uploadFile);

module.exports = router;
