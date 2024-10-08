//routes/user.js
// Import necessary modules
const router = require("express").Router();
const { User } = require("../models/user");
const { json } = require("express");

const authenticate = require('../middleware/authenticate'); // Authentication middleware
// Define routes
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
    if (!user) return res.status(404).send({ message: "User with given ID doesn't exist!" });
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

    user.isAdmin = !user.isAdmin;
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

// Route to handle role change request
// routes/user.js
router.post('/change-role', async (req, res) => {
  try {
    const { email, changeRole } = req.body;
    console.log('Received request to change role:', { email, changeRole });

    const user = await User.findOneAndUpdate(
      { email: email },
      { changeRole: changeRole }, 
      { new: true } // Return updated document
    );

    if (user) {
      console.log('Updated user:', user);
      res.status(200).json({ message: 'Role change updated successfully', user });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating role:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

router.put("/delete-account/:email", async (req, res) => {
  try {
    const { email } = req.params;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    user.delete = true;
    await user.save();

    res.status(200).send({ message: "Account deletion in progress" });
  } catch (error) {
    console.error("Error during account deletion:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});


router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

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
module.exports = router;
router.put('/update-language', async (req, res) => {
  try {
    const { email, language } = req.body;

    console.log('Received email and language:', { email, language });

    if (!['Python', 'Java'].includes(language)) {
      return res.status(400).send({ message: 'Invalid language value' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    user.language = language;
    await user.save();

    res.status(200).send({ message: 'Language updated successfully' });
  } catch (error) {
    console.error('Error updating language:', error);
    res.status(500).send({ message: 'Internal Server Error', error });
  }
});



// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = router;
