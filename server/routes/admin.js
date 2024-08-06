const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Route to get list of admins
router.get('/', async (req, res) => {
    try {
        const admins = await User.find({ isAdmin: true }, 'firstName lastName email');
        res.json(admins);
    } catch (error) {
        console.error('Error fetching admins:', error);
        res.status(500).send({ message: 'Internal server error' });
    }
});

// Route to toggle admin status
router.post('/toggle', async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        user.isAdmin = !user.isAdmin;
        await user.save();

        res.status(200).send({
            message: user.isAdmin ? 'Admin added successfully' : 'Admin removed successfully'
        });
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

module.exports = router;
