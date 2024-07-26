// data base connection 
const mongoose = require('mongoose');

const connection = async () => {
  try {
    await mongoose.connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = connection;

//
/*const mongoose = require("mongoose");

module.exports = () => {
  const connectionParams = {};

  mongoose.connect(process.env.DB, connectionParams)
    .then(() => {
      console.log("Connected to database successfully");
    })
    .catch((error) => {
      console.error("Could not connect to database!", error);
    });
};
*/