const User = require('../models/user'); // Import your User model
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Function to handle user registration
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Function to handle user login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Function to update the user profile
const updateUserProfile = async (req, res) => {
  const { email, password, newPassword } = req.body;
  const { userId } = req; // Assumed to be from middleware

  try {
    const user = await User.findById(userId);
    if (!user || user.email !== email) {
      return res.status(400).json({ message: 'Email does not match the logged-in email.' });
    }

    // Proceed with updating the profile
    // ...

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Export the controller functions
module.exports = {
  registerUser,
  loginUser,
  updateUserProfile,
};
