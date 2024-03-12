const express = require('express');
const isLoggedIn = require('../Middleware/authentication');
const User = require('../Models/User'); // Import your User model

const router = express.Router();

router.get('/', isLoggedIn, async (req, res) => {
  try {
    const { email } = req.user;

    if (!email) {
      return res.status(400).json({ message: 'User email not available' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
