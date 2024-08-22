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
const path = require('path');
const bcrypt = require('bcrypt');
const adminRoutes = require('./routes/admins');
const mongoose = require('mongoose');
const adminsRoutes = require('./routes/admins');

const app = express();
app.use(express.json());

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
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/admins', adminsRoutes);
app.use('/api', authRoutes); // Ensure the route is correctly integrated

// Import routes
//const updateProfileRoute = require('./routes/updateProfile');


// Use routes
app.use("/api/admins", adminRoutes);
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
app.post('/api/user/delete-account', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    // Find and delete the user from the database
    const user = await User.findOneAndDelete({ email });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Error deleting account:', error.message);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});
app.post('/api/user/change-role', async (req, res) => {
  const { email, changeRole } = req.body;
  console.log('Received request to change role:', { email, changeRole });

  try {
    const user = await User.findOneAndUpdate(
      { email },
      { $set: { role: changeRole } },  // Ensure this field matches your database schema
      { new: true }
    );

    if (!user) {
      console.log('User not found');
      return res.status(404).send('User not found');
    }

    console.log('Updated user:', user); // Log the updated user to confirm the change
    res.status(200).send('Role change request received');
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).send('Error updating user role');
  }
});
app.post('/api/auth', async (req, res) => {
  const { email, password } = req.body;

  console.log(`Received auth request: ${email} - ${password}`);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log(`User not found: ${email}`);
      return res.status(401).send({ message: 'Invalid Email' });
    }

    console.log(`User found: ${user.email}`);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(`Password comparison result: ${isMatch}`);

    if (!isMatch) {
      console.log(`Invalid password for user: ${email}`);
      return res.status(401).send({ message: 'Invalid Password' });
    }

    const token = user.generateAuthToken();
    res.status(200).send({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
        userType: user.userType
      }
    });
    
  } catch (error) {
    console.error(`Error in auth endpoint: ${error}`);
    res.status(500).send({ message: 'Server Error' });
  }
});



const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});