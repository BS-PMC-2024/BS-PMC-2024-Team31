const mongoose = require("mongoose");
const Joi = require("joi");

const unitTestSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: false
  },
  language: {
    type: String,
    required: true
  },
  projectName: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Done'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { discriminatorKey: 'type' });

unitTestSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});
const unitTestValidationSchema = Joi.object({
  type: Joi.string().valid('Boundary Tests', 'Exception Tests', 'Functional Tests').required().label("Type"),
  language: Joi.string().required().label("Language"),
  projectName: Joi.string().required().label("Project Name"),
  status: Joi.string().valid('Pending', 'Done').default('Pending').label("Status"),
  code: Joi.string().optional().allow('').label("Code"), // Allow empty string if needed
  createdAt: Joi.date().default(Date.now).label("Created At"),
  updatedAt: Joi.date().default(Date.now).label("Updated At")
});

const UnitTest = mongoose.model("UnitTest", unitTestSchema);

module.exports = { UnitTest, unitTestSchema, unitTestValidationSchema };
