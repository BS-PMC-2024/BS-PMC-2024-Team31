require("dotenv").config();
const axios = require("axios");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const connection = require("./db");
const usersRoutes = require("./routes/users");
const userRoutes = require("./routes/user");
const authRoutes = require('./routes/auth');
const path = require('path');
const bcrypt = require('bcrypt');
const { User } = require("./models/user");
const adminRoutes = require('./routes/admins'); // Import the routes

// Database connection
connection();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/api/admins", adminRoutes); // Use the admin routes
app.use("/api/users", usersRoutes);

// Import routes
const updateProfileRoute = require('./routes/updateProfile');

// Use routes
app.use("/api/admins", adminRoutes);
app.use(updateProfileRoute);
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/user", userRoutes);

app.post('/api/search', async (req, res) => {
  try {
    const searchQueries = req.body.products;
    if (!searchQueries || searchQueries.length === 0) {
      return res.status(400).send({ message: 'No search queries provided' });
    }
    const response = await axios.post('http://localhost:3000/search', req.body, {
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

app.post('/api/forgot-password', async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({ message: 'Email and new password are required' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error.message);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

// Implement or remove these endpoints as needed
app.get('/api/product/:id', async (req, res) => {
  // Product details endpoint implementation
});

app.get('/api/cart', async (req, res) => {
  // Cart items endpoint implementation
});

app.post('/api/cart/add', async (req, res) => {
  // Add item to cart endpoint implementation
});

app.post('/api/cart/remove', async (req, res) => {
  // Remove item from cart endpoint implementation
});

app.post('/api/cart/checkout', async (req, res) => {
  // Checkout cart endpoint implementation
});

app.post('/api/admins/add', async (req, res) => {
  // Your route logic for adding admin
});

// Connect to MongoDB
mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
