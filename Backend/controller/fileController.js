// controllers/fileController.js

const File = require('../models/fileModel');

exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Create a new document in the File collection with the filename
    const newFile = new File({ filename: req.file.filename });
    await newFile.save();

    res.status(201).json({ message: 'File uploaded successfully' });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
