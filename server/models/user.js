const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  profileImage: { type: String, default: '' },
  isAdmin: { type: Boolean, default: false },
  bio: { type: String, default: '' },
  ratedBy: { type: [String], default: [] },
  ratings: { type: [Number], default: [] },
  comments: { type: [String], default: [] },
  // Remove userType
});

// Keep methods and validation logic as is
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
  return token;
};

const User = mongoose.model("User", userSchema);

const validate = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
    // Remove userType validation
  });
  return schema.validate(data);
};

module.exports = { User, validate };
