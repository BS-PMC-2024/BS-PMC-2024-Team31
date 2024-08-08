//routes/user.js
const router = require("express").Router();
const { json } = require("express");
const authenticate = require('../middleware/authenticate'); // Authentication middleware
///
const {User} = require('../models/user'); // Assuming you have a User model

// Define the route for fetching the user profile
router.get('/profile', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('firstName email profileImage');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/email/:email", async (req, res) => {
  try {
    const email = req.params.email;
    console.log("Fetching user with email:", email); // تسجيل البريد الإلكتروني
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
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
    console.log("Updating user with ID:", req.params.id); // تسجيل المعرف
    const user = await User.findById(req.params.id);
    if (!user)
      return res.status(404).send({ message: "User with given ID doesn't exist!" });
    user.firstName = firstName;
    user.lastName = lastName;
    await user.save();
    res.status(200).send({ message: "User updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
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
router.get('/', async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

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
  }});
router.put('/update-name', async (req, res) => {
    const { userId, firstName, lastName } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.firstName = firstName;
        user.lastName = lastName;

        await user.save();
        res.status(200).json({ message: 'User information updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
// In routes/user.js
router.get('/user/:email', authenticate, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }).select('firstName email profileImage');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
