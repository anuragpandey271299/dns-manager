const express = require('express');
const router = express.Router();
const dnsRecord = require('../Models/dnsRecord'); 

router.put('/:id', async (req, res) => {
  const recordId = req.params.id;

  try {
    const updatedRecord = await dnsRecord.findOneAndUpdate(
      { _id: recordId }, req.body,{ new: true});

    if (!updatedRecord) {
      return res.status(404).json({ message: 'DNS Record not found' });
    }

    res.status(200).json({ message: 'DNS Record updated successfully', data: updatedRecord });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
