const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Directory to save uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // File name with timestamp
  }
});

const upload = multer({ storage: storage });

router.post('/upload-image', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: 'No file uploaded' });
  }
  res.send({
    message: 'Image uploaded successfully',
    file: req.file,
    fileUrl: `/uploads/${req.file.filename}` // Provide the URL to access the image
  });
});

module.exports = router;
