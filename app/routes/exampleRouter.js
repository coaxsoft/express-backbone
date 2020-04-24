const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');
const awsS3 = require('../functions/awsS3');

router.post('/upload', upload.single('test'), async (req, res) => {
  const uploadResults = await awsS3.upload(req.file);
  res.json(uploadResults);
});

module.exports = router;
