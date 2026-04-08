const express = require('express');
const router  = express.Router();
const db      = require('../db');
const AWS     = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId:     process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

router.get('/monthly', async (req, res) => {
  const year = req.query.year || new Date().getFullYear();
  try {
    const totals = await db.getMonthlyTotals(req.query.userId || 1, year);
    res.json(totals);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/export', async (req, res) => {
  try {
    const params = {
      Bucket:      process.env.AWS_S3_BUCKET,
      Key:         `reports/${Date.now()}.json`,
      Body:        JSON.stringify(req.body),
      ContentType: 'application/json',
    };
    const result = await s3.upload(params).promise();
    res.json({ url: result.Location });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
