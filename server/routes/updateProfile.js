// server/routes/updateProfile.js
const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Adjust the path as needed
const bcrypt = require('bcrypt');

// Route to update profile
router.post('/update', async (req, res) => {
  const { email, newPassword, role } = req.body;

  if (!email || !newPassword || !role) {
    return res.status(400).json({ message: 'Email, new password, and role are required' });
  }
const upload = require('../config/multerConfig'); // تأكد من استخدام المسار الصحيح

  try {
    const user = await User.findOne({ email });
    console.log('Request body:', req.body);
    console.log('File:', req.file);

    const { email, bio } = req.body;
    const updateData = { bio };

    if (req.file) {
      updateData.profileImage = req.file.filename;
    }


    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user details
    user.password = hashedPassword;
    user.role = role; // Assuming you have a 'role' field
    await user.save();

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile' });
  }
});

module.exports = router;
