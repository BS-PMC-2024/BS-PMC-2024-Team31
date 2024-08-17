const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  //bio: { type: String, default: '' },
  profileImage: { type: String, default: '' }, // إضافة حقل profileImage
  isAdmin: { type: Boolean, default: false },
  bio: { type: String, default: '' },
  ratedBy: { type: [String], default: [] },
  ratings: { type: [Number], default: [] },
  comments: { type: [String], default: [] },

  userType: { type: String, enum: ["worker", "student"], required: true }, // New field
  delete: { type: Boolean, default: false } // إضافة هذا السطر

});
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
  return token;
};
const User = mongoose.model("user", userSchema);
const validate = (data) => {
  const schema = Joi.object({
    firstName: Joi.string()
      .required()
      .label("First Name"),
    lastName: Joi.string()
      .required()
      .label("Last Name"),
    email: Joi.string()
      .email()
      .required()
      .label("Email"),
    password: passwordComplexity()
      .required()
      .label("Password"),
    userType: Joi.string().valid("worker", "student").required().label("User Type"), // Updated validation  
  });
  return schema.validate(data);
};
module.exports = { User, validate };
//////////