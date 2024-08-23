const express = require('express');
const { OpenAI } = require('openai');
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const router = express.Router();
const { UnitTest, unitTestValidationSchema } = require('../models/unitTest');

// Initialize OpenAI client
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

// Route to save generated unit tests to the database
router.post('/saveAll', async (req, res) => {
  try {
    const unitTests = req.body.unitTests;

    // Check if unitTests is an array
    if (!Array.isArray(unitTests)) {
      return res.status(400).send({ message: "unitTests should be an array" });
    }

    // Validate each unit test against the schema
    const errors = [];
    for (const unitTest of unitTests) {
      const { error } = unitTestValidationSchema.validate(unitTest);
      if (error) {
        errors.push({ unitTest, message: error.details[0].message });
      }
    }

    // Return validation errors if any
    if (errors.length > 0) {
      console.log("Validation errors:", errors);
      return res.status(400).send({ message: "Validation errors", errors });
    }

    // Save each valid unit test to the database
    for (const unitTest of unitTests) {
      const newUnitTest = new UnitTest(unitTest);
      await newUnitTest.save();
    }

    res.status(201).send({ message: "All Unit Tests saved successfully" });
  } catch (error) {
    console.log("Internal Server Error:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Function to validate code
const validateCode = (code) => {
  if (!code || code.trim() === '') {
    return { valid: false, message: '"code" is not allowed to be empty' };
  }
  return { valid: true };
};

// Route to generate unit tests
router.post('/generateTests', async (req, res) => {
  const { code } = req.body;

  // Validate code
  const validation = validateCode(code);
  if (!validation.valid) {
    return res.status(400).json({ error: validation.message });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Replace with an available model ID
      messages: [
        { role: "user", content: `Generate unit tests for the following code:\n\n${code}` }
      ],
      max_tokens: 150
    });

    const generatedTests = response.choices[0].message.content.trim().split('\n').filter(line => line.trim() !== '');
    res.json({ tests: generatedTests });
  } catch (error) {
    console.error('Error generating tests:', {
      message: error.message,
      response: error.response ? error.response.data : 'No response data',
      stack: error.stack,
    });

    if (error.response && error.response.status === 429) {
      res.status(429).json({ error: 'You have exceeded your API usage quota. Please try again later or upgrade your plan.' });
    } else {
      res.status(500).json({ error: 'Failed to generate tests' });
    }
  }
});

module.exports = router;