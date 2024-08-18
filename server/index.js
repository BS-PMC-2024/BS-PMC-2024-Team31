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

//app.use('/api/profile', profileRoutes);
app.use('/api/unitTests', unitTestRoutes);
app.use('/api/user', userRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/users', usersRoutes);

//const openai=new OpenAIApi(Configuration):

/*app.post('/api/unitTests', async (req, res) => {
  try {
    const UnitTestModel = require('./models/unitTest'); // تأكد من أن المسار صحيح هنا
    const UnitTest = new UnitTestModel(req.body);
    await UnitTest.save();
    res.status(201).json(UnitTest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});*/

// Products routes

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
