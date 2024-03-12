const express = require('express');
const dnsRecord = require('../Models/dnsRecord');
const isLoggedIn = require('../Middleware/authentication');

const router = express.Router();

router.post('/', isLoggedIn, async (req, res) => {
  try {
    const USERID = req.user._id;
    const { sourceIP, serverName, recordType, domain, ttl, ipAddress } = req.body;

    if (!sourceIP || !serverName || !recordType || !domain || !ttl || !ipAddress) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const newRecord = await dnsRecord.create({ USERID, sourceIP, serverName, recordType, domain, ttl, ipAddress });
    res.status(201).json(newRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
