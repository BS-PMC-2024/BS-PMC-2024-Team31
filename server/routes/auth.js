const router = require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken"); // Assuming you're using JWT for authentication
const auth = require("../middleware/auth"); // Middleware to verify JWT
const nodemailer = require('nodemailer');

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

function generateRandomPassword() {
  const length = 8;
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  let hasNumber = false;
  let hasUpperCase = false;

  while (password.length < length || !hasNumber || !hasUpperCase) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    const char = charset[randomIndex];
    
    if (/\d/.test(char)) hasNumber = true;
    if (/[A-Z]/.test(char)) hasUpperCase = true;

    password += char;
  }

  return password;
}

router.post('/forgetpassword', async (req, res) => {
  const { email } = req.body;

  try {
    // Generate a random password
    const newPassword = generateRandomPassword();

    // Hash the new password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Find the user and update the password in the database
    const user = await User.findOneAndUpdate({ email }, { password: hashedPassword });

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    // Create a transporter object using SMTP
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'Aisrael@ac.sce.ac.il', // Replace with your email
        pass: 'gxrc pfle owpn padf',  // Replace with your email password or app-specific password
      },
    });

    // Send the email with the new password
    let info = await transporter.sendMail({
      from: '"Testify web" <Aisrael@ac.sce.ac.il>', // Sender address
      to: email, // Receiver's email address
      subject: 'Password Reset', // Subject line
      text: `Your new password is: ${newPassword}`, // Plain text body
      html: `<b>Your new password is: ${newPassword}</b>`, // HTML body
    });

    console.log('Message sent: %s', info.messageId);
    res.send({ message: "A new password has been sent to your email." });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send({ message: "Error sending email. Please try again later." });
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
