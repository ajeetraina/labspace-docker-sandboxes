const express = require('express');
const app = express();
const expensesRouter = require('./routes/expenses');
const reportsRouter  = require('./routes/reports');

app.use(express.json());
app.use('/expenses', expensesRouter);
app.use('/reports',  reportsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`ExpenseFlow running on port ${PORT}`));

module.exports = app;
