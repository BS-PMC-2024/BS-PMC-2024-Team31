require("dotenv").config();
const axios = require("axios");
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const usersRoutes = require("./routes/users");
const userRoutes = require("./routes/user");

const authRoutes = require('./routes/auth');

const passwordResetRoutes = require("./routes/passwordReset");

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// CORS middleware
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Auth routes
app.use("/api/auth", authRoutes);
app.use("/api/password-reset", passwordResetRoutes);

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
