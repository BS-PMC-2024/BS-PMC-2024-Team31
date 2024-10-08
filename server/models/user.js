// models/user.js
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const bcrypt = require('bcrypt');
const saltRounds = 10; // Adjust the salt rounds as needed

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  changeRole: { type: Boolean, default: false },
  userType: { type: String, enum: ["worker", "student", ""], default: "" },
  unitTests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'unitTest' }],
  delete: { type: Boolean, default: false },
  language: { type: String, enum: ["Python", "Java"], default: "Python" },

});

// Generate authentication token
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
  return token;
};

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});


// Compare hashed password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};


// Validation schema
const validate = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
    userType: Joi.string().valid("worker", "student", "").label("User Type"),
  });
  return schema.validate(data);
};

const User = mongoose.model("User", userSchema);

module.exports = { User, validate };
