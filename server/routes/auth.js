const router = require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken"); // Assuming you're using JWT for authentication
const auth = require("../middleware/auth"); // Middleware to verify JWT

// Login Route
router.post("/", async (req, res) => {
  try {
    const { error } = validateLogin(req.body);
    if (error) {
      console.log("Validation error:", error.details[0].message);
      return res.status(400).send({ message: error.details[0].message });
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      console.log("User not found for email:", req.body.email);
      return res.status(401).send({ message: "Invalid Email" });
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      console.log("Invalid password for email:", req.body.email);
      return res.status(401).send({ message: "Invalid Password" });
    }

    const token = user.generateAuthToken();
    res.status(200).send({
      token,
      isAdmin: user.isAdmin,
      userType: user.userType,
    });
  } catch (error) {
    console.log("Server error:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});


// Change Password Route
router.post('/change-password', async (req, res) => {
  try {
    const { email, oldPassword, newPassword, confirmNewPassword } = req.body;

    if (!email || !oldPassword || !newPassword || !confirmNewPassword) {
      return res.status(400).send({ message: 'All fields are required' });
    }

    if (newPassword !== confirmNewPassword) {
      return res.status(400).send({ message: 'New password and confirm new password do not match' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Old password is incorrect' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password without triggering full validation
    await User.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { runValidators: false } // Bypass validation
    );

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error("Error in change-password route:", error);
    res.status(500).send({ message: 'Internal server error' });
  }
});

// Forgot-Password Route
router.post("/forgot-password", async (req, res) => {
  try {
    const { email, newPassword, confirmNewPassword } = req.body;

    if (!email || !newPassword || !confirmNewPassword) {
      return res.status(400).send({ message: "All fields are required" });
    }

    if (newPassword !== confirmNewPassword) {
      return res.status(400).send({ message: "New password and confirm new password do not match" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).send({ message: "Password updated successfully in MongoDB" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

// Validation schemas
const validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = router;
