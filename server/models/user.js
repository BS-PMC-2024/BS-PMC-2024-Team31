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
  userType: { type: String, enum: ["worker", "student"], required: true },
  unitTests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'unitTest' }] // Reference to UnitTest model
})

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
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Inside your schema methods or pre-save hook
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = { User, validate };
//////////
