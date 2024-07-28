const express = require('express');
const router = express.Router();
const User = require('../models/user');
const multer = require('multer');
const path = require('path');
const upload = require('./config/multerConfig');

router.put('/update-profile', upload.single('profileImage'), async (req, res) => {
  try {
    console.log('Request body:', req.body);
    console.log('File:', req.file);

    const { email, bio } = req.body;
    const updateData = { bio };

    if (req.file) {
      updateData.profileImage = req.file.filename; // احفظ اسم الملف أو المسار
    }

    const user = await User.findOneAndUpdate({ email }, updateData, { new: true });

    if (!user) {
      console.log('User not found');
      return res.status(404).send({ message: 'User not found' });
    }

    console.log('Profile updated successfully');
    res.send({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).send({ message: 'Server error' });
  }
});