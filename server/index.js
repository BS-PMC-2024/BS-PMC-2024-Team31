require("dotenv").config();

const axios = require("axios");
const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const connection = require("./db");
const usersRoutes = require("./routes/users");
const userRoutes = require("./routes/user");
const authRoutes = require('./routes/auth');
const unitTestRoutes = require('./routes/unitTests');
const path = require('path');
const bcrypt = require('bcrypt');
const adminRoutes = require('./routes/admins');
const mongoose = require('mongoose');
const app = express();
console.log('OpenAI API Key:', process.env.OPENAI_API_KEY); // Add this line to check the API key

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
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Import routes
//const updateProfileRoute = require('./routes/updateProfile');


// Use routes
app.use("/api/admins", adminRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/unitTests', unitTestRoutes);
app.use('/api/user', userRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/users', usersRoutes);

//const openai=new OpenAIApi(Configuration):

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





const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
