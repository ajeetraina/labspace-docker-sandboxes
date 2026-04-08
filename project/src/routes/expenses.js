const express = require('express');
const router  = express.Router();
const db      = require('../db');
const stripe  = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.get('/', async (req, res) => {
  try {
    const expenses = await db.getExpensesForUser(req.query.userId || 1);
    res.json(expenses);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', async (req, res) => {
  const { amount, category_id, description, userId } = req.body;
  try {
    const expense = await db.addExpense(userId || 1, amount, category_id, description);
    res.status(201).json(expense);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/:id/receipt', async (req, res) => {
  try {
    const file = await stripe.files.create({
      purpose: 'dispute_evidence',
      file: { data: req.body.fileData, name: `receipt-${req.params.id}.pdf`, type: 'application/pdf' },
    });
    res.json({ fileId: file.id });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
