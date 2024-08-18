//routes/user.js

const router = require("express").Router();
const { json } = require("express");

const authenticate = require('../middleware/authenticate'); // Authentication middleware
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { updateUserProfile } = require('../controllers/userController');

const {User} = require('../models/user'); // Assuming you have a User model
const { getChatGptResponse } = require('../services/chatgptService');

// Define the route for fetching the user profile

// Route to get the current user's profile
const bcrypt = require('bcrypt');

// Multer setup for image upload
router.post('/update', upload.single('profileImage'), updateUserProfile);

router.post('/analyze-code', async (req, res) => {
  const { code } = req.body;
  try {
      const prompt = `حلل هذا الكود وقدم تعليقات أو اقترح تحسينات:\n\n${code}`;
      const analysis = await getChatGptResponse(prompt);
      res.json({ analysis });
  } catch (error) {
      res.status(500).json({ error: 'فشل في تحليل الكود' });
  }
});

router.post('/edit-profile', authenticate, async (req, res) => {
  const { email, password, newPassword } = req.body;

  try {
      const user = await User.findOne({ email: req.user.email });

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // تحقق من كلمة المرور الحالية
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(400).json({ message: 'Invalid current password' });
      }

      // تحديث البريد الإلكتروني إذا كان مختلفًا
      if (email !== user.email) {
          user.email = email;
      }

      // تحديث كلمة المرور إذا تم تقديم كلمة مرور جديدة
      if (newPassword) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(newPassword, salt);
      }

      await user.save();

      res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error); // إضافة سطر لتسجيل تفاصيل الخطأ
    res.status(500).json({ message: 'Server error', error: error.message }); // إرسال تفاصيل الخطأ
  }
});


// Route to get user profile
router.get('/profile', authenticate, async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from the authenticated request
    const user = await User.findById(userId).select('firstName email profileImage'); // Fetch user data

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user); // Send user data as JSON
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});
router.get("/user/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password; // Removing the password before sending the response

    res.status(200).json(userWithoutPassword);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
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
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const user = new User({ firstName, lastName, email, password });
    await user.save();
    res.status(201).json({ message: 'User created successfully!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/api/users', async (req, res) => {
  const { firstName, lastName, email, password, userType } = req.body;
  try {
    const newUser = new User({ firstName, lastName, email, password, userType });
    await newUser.save();
    res.status(201).send({ message: 'User created successfully' });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
})
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
// In routes/user.js


module.exports = router;
