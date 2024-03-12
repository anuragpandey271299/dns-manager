const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const bcrypt=require('bcrypt')

router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists.' });
    }
    const encryptedPassword=await bcrypt.hash(password,10)
    const createdUser = await User.create({ firstName, lastName, email, password:encryptedPassword });
    res.status(201).json({ data: createdUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
