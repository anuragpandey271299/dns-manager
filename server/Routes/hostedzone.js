const express = require('express');
const { Route53Client, CreateHostedZoneCommand } = require("@aws-sdk/client-route-53");
const { fromIni } = require("@aws-sdk/credential-provider-node");

const router = express.Router();

const route53Client = new Route53Client({
  credentials: fromIni({}),
});

router.post('/hostedzone', async (req, res) => {
  try {
    const { domainName } = req.body;

    if (!domainName) {
      return res.status(400).json({ error: 'Domain name is required.' });
    }

    const params = {
      Name: domainName, 
      CallerReference: `${Date.now()}`,
      HostedZoneConfig: {
        Comment: 'My hosted zone', 
        PrivateZone: false, 
      },
    };

    const command = new CreateHostedZoneCommand(params);
    const response = await route53Client.send(command);

    res.status(201).json({ message: 'Hosted zone created successfully.', hostedZone: response.HostedZone });
  } catch (error) {
    console.error("Error creating hosted zone:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;