require("dotenv").config();
const axios = require("axios");
const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const connection = require("./db");
const usersRoutes = require("./routes/users");
const userRoutes = require("./routes/user");
const authRoutes = require('./routes/auth');
const { User } = require("./models/user");
const profileRoutes = require('./routes/updateProfile');
const unitTestRoutes = require('./routes/unitTests');
const mongoose = require('mongoose');

const app = express();

// Database connection
connection();
mongoose.connect(process.env.DB, { // تأكد من أن `DB_URI` هو اسم المتغير الصحيح في .env
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/api/profile', profileRoutes);
app.use('/api/unitTests', unitTestRoutes);
app.use('/api/user', userRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/users', usersRoutes);

// Endpoint for resetting the password and role
app.post('/api/forgot-password', async (req, res) => {
  const { email, newPassword, role } = req.body;

  if (!email || !newPassword || role === undefined) { // تأكد من أنك تتحقق من القيمة المناسبة لدور المستخدم
    return res.status(400).json({ message: 'Email, new password, and role are required' });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password and role in the database
    user.password = hashedPassword;
    user.role = role;
    await user.save();

    res.status(200).json({ message: 'Password and role updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating password or role' });
  }
});

// Example Node.js/Express route
app.post('/api/unitTests', async (req, res) => {
  try {
    const UnitTestModel = require('./models/unitTest'); // تأكد من أن المسار صحيح هنا
    const UnitTest = new UnitTestModel(req.body);
    await UnitTest.save();
    res.status(201).json(UnitTest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

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


const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
