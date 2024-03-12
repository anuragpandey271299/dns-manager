const express = require('express');
const router = express.Router();
const dnsRecord = require('../Models/dnsRecord');

router.delete('/:id', async (req, res) => {
  const recordId = req.params.id;

  try {
    const deletedRecord = await dnsRecord.findOneAndDelete({ _id: recordId });

    if (!deletedRecord) {
      return res.status(404).json({ message: 'DNS Record not found' });
    }

    res.status(200).json({ message: 'DNS Record deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
