// controllers/unitTestController.js
const UnitTest = require('../models/UnitTest'); // Import the model

// Function to create a new unit test
const createUnitTest = async (req, res) => {
  try {
    const newTest = new UnitTest(req.body);
    await newTest.save();
    res.status(201).json(newTest);
  } catch (error) {
    console.error('Error adding unit test:', error);
    res.status(400).json({ message: 'Error adding unit test', error });
  }
};

// Function to get all unit tests
const getUnitTests = async (req, res) => {
  try {
    const tests = await UnitTest.find();
    res.status(200).json(tests);
  } catch (error) {
    console.error('Error fetching unit tests:', error);
    res.status(400).json({ message: 'Error fetching unit tests', error });
  }
};

module.exports = { createUnitTest, getUnitTests };
