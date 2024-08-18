const express = require('express');
const router = express.Router();
const { UnitTest, unitTestValidationSchema } = require('../models/unitTest');

router.post('/saveAll', async (req, res) => {
  try {
    const unitTests = req.body.unitTests;

    if (!Array.isArray(unitTests)) {
      return res.status(400).send({ message: "unitTests should be an array" });
    }

    const errors = [];
    for (const unitTest of unitTests) {
      const { error } = unitTestValidationSchema.validate(unitTest);
      if (error) {
        errors.push({ unitTest, message: error.details[0].message });
      }
    }

    if (errors.length > 0) {
      console.log("Validation errors:", errors);
      return res.status(400).send({ message: "Validation errors", errors });
    }

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

module.exports = router;
