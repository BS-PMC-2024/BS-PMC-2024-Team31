const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      console.log("Validation error:", error.details[0].message);
      return res.status(400).send({ message: error.details[0].message });
    }

    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      isAdmin: false,
      changeRole: false, // Set changeRole to false by default
      userType: req.body.userType,
    });

    await user.save();

    const token = user.generateAuthToken();
    res.status(200).send({
      token,
      isAdmin: user.isAdmin,
      userType: user.userType,
      changeRole: user.changeRole,
    });

  } catch (error) {
    console.log("Server error:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});


router.get("/all", async (req, res) => {
  try {
    let users = await User.find({});
    users = users.map(user => {
      user = user.toObject();
      delete user.password;
      return user;
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;

