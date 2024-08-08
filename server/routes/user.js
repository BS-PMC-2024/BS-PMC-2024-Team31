const router = require("express").Router();
const { json } = require("express");
const authenticate = require('../middleware/authenticate'); // Authentication middleware
///
const {User} = require('../models/user'); // Assuming you have a User model

router.get('/profile', authenticate, async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId); // Fetch user from database

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      email: user.email,
      firstName: user.firstName, // Ensure this field exists
      profileImage: user.profileImage,
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get("/email/:email", async (req, res) => {
  try {
    const email = req.params.email;
    console.log(email);
    let user = await User.findOne({ email });
    user = user.toObject();
    delete user.password;
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/id/:id", async (req, res) => {
  try {
    const { firstName, lastName } = req.body;
    const user = await User.findById(req.params.id);
    if (!user)
      return res
        .status(404)
        .send({ message: "User with given ID doesn't exist!" });
    user.firstName = firstName;
    user.lastName = lastName;
    await user.save();
    res.status(200).send({ message: "User updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});
router.post('/saveAll', async (req, res) => {
  try {
    // Clear existing unit tests or handle accordingly
    await UnitTest.deleteMany({}); // Caution: This will delete all existing unit tests

    // Insert new unit tests
    await UnitTest.insertMany(req.body);

    res.status(200).json({ message: 'All unit tests saved successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/toggle-admin", async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    if (user.isAdmin) {
      user.isAdmin = false;
    } else {
      user.isAdmin = true;
    }

    await user.save();

    if (user.isAdmin) {
      res.status(200).send({ message: "Admin added successfully" });
    } else {
      res.status(200).send({ message: "Admin removed successfully" });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
// Middleware to authenticate user (depends on your authentication method)

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }); // Ensure User is properly defined and imported

    if (!user) {
      return res.status(404).send('User not found');
    }

    // Validate password (assuming you have a method or logic for this)
    if (user.password !== password) {
      return res.status(401).send('Invalid password');
    }

    res.send('User authenticated');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});
module.exports = router;
