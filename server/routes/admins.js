const express = require('express');
const router = express.Router();
const { User, validate } = require('../models/user');
const bcrypt = require('bcrypt');

// Route to add a new admin
router.post('/add', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
  
    // Validate input
    const { error } = validate({ firstName, lastName, email, password });
    if (error) return res.status(400).json({ message: error.details[0].message });
  
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Admin already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        isAdmin: true
      });
  
      await newUser.save();
      res.status(200).json({ message: 'Admin added successfully!' });
    } catch (error) {
      console.error('Error adding admin:', error.message);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  });
  
// Route to get list of admins
router.get('/all', async (req, res) => {
    try {
        const admins = await User.find({ isAdmin: true }, 'firstName lastName email');
        res.status(200).json(admins);
    } catch (error) {
        console.error('Error fetching admins:', error);
        res.status(500).send({ message: 'Internal server error' });
    }
});

// Route to get all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({ isAdmin: false }, 'firstName lastName email userType');
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send({ message: 'Internal server error' });
    }
});
router.post('/remove', async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).send({ message: 'Email is required' });
        }

        const result = await User.deleteOne({ email, isAdmin: true });
        if (result.deletedCount > 0) {
            res.status(200).send({ message: 'Admin removed successfully' });
        } else {
            res.status(404).send({ message: 'Admin not found' });
        }
    } catch (error) {
        console.error('Error removing admin:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

module.exports = router;
