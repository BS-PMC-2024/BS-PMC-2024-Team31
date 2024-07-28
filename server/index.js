require("dotenv").config();
const axios = require("axios");
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const usersRoutes = require("./routes/users");
const userRoutes = require("./routes/user");
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const path = require('path');

const bcrypt = require('bcrypt'); // استيراد مكتبة bcrypt
const { User } = require("./models/user"); // استيراد موديل User

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
// Static file setup for serving images and other static assets

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Import routes
const updateProfileRoute = require('./routes/updateProfile');

// Use routes
app.use(updateProfileRoute);

// Auth routes
app.use("/api/auth", authRoutes);
// مسار تحديث الملف الشخصي
// Users routes
app.use("/api/users", usersRoutes);
app.use("/api/user", userRoutes);

// Products routes
app.post('/api/search', async (req, res) => {
  try {
    const searchQueries = req.body.products;
    if (!searchQueries || searchQueries.length === 0) {
      return res.status(400).send({ message: 'No search queries provided' });
    }
    const response = await axios.post('http://localhost:3002/search', req.body, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error during search:", error);
    res.status(500).send({ message: 'Internal server error' });
  }
});

// Password Reset Endpoint
app.post('/api/forgot-password', async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({ message: 'Email and new password are required' });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password in the database
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error.message); // Print only the error message
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

app.get('/api/product/{id}', async (req, res) => {
  // a product with: Name, Price, Description, Availablity, Ratings, Deals, Cheapest stores near by
})

// Cart routes
app.get('/api/cart', async (req, res) => {
  // a list of items in the cart
})
app.post('/api/cart/add', async (req, res) => {
  // add an item to the cart
})
app.post('/api/cart/remove', async (req, res) => {
  // remove an item from the cart
})
app.post('/api/cart/checkout', async (req, res) => {
  // checkout the cart
})

const port = process.env.PORT || 3001;
app.listen(port, console.log(`Listening on port ${port}...`));
