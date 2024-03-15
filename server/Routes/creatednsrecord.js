const express = require('express');
const dnsRecord = require('../Models/dnsRecord');
const isLoggedIn = require('../Middleware/authentication');
const { Route53Client, ChangeResourceRecordSetsCommand } = require("@aws-sdk/client-route-53");
const { fromEnv } = require("@aws-sdk/credential-provider-env");

const router = express.Router();

const route53Client = new Route53Client({
  credentials: fromEnv(),
  region: "ap-south-1",
});

router.post('/', isLoggedIn, async (req, res) => {
  try {
    const USERID = req.user._id;
    const { sourceIP, serverName, recordType, domain, ttl, ipAddress } = req.body;

    if (!sourceIP || !serverName || !recordType || !domain || !ttl || !ipAddress) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const changeParams = {
      HostedZoneId: 'Z0705757ZCZK4PKSGF38',
      ChangeBatch: {
        Changes: [
          {
            Action: 'CREATE',
            ResourceRecordSet: {
              Name: `${serverName}.${domain}`, 
              Type: recordType,
              TTL: ttl,
              ResourceRecords: [
                {
                  Value: ipAddress,
                },
              ],
            },
          },
        ],
      },
    };


    const route53Response = await route53Client.send(new ChangeResourceRecordSetsCommand(changeParams));

    const newRecord = await dnsRecord.create({ USERID, sourceIP, serverName, recordType, domain, ttl, ipAddress });

    res.status(201).json({ newRecord, route53Response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
