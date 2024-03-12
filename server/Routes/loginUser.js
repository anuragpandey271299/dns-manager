const express = require('express');
const User = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken')

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(user){
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(passwordMatch){
            const token=jwt.sign(user.toJSON(),process.env.JWT_SECRET_KEY,{expiresIn:2000*2000})
            return res.json({ message: 'User logged in successfully',token:token });
        }else{
            return res.status(401).json({ error: 'Incorrect password.' });
        }
    }else{
        res.status(404).send('User not found')
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
