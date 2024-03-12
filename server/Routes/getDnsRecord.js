const express = require('express');
const dnsRecord=require('../Models/dnsRecord')
const isLoggedIn = require('../Middleware/authentication');

const router = express.Router();

router.get('/', isLoggedIn, async (req, res) => {
  try {
    const user_id = req.user._id;
    const findUser = await dnsRecord.find({USERID:user_id });
    res.json({data:findUser})
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
