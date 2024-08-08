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

module.exports = router;
