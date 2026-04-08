const { Pool } = require('pg');

// No connection pooling configured — intentional for lab to find
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// N+1 query — fetches category name separately for each expense
async function getExpensesForUser(userId) {
  const result = await pool.query(
    'SELECT * FROM expenses WHERE user_id = $1', [userId]
  );
  const expenses = [];
  for (const row of result.rows) {
    const cat = await pool.query(
      'SELECT name FROM categories WHERE id = $1', [row.category_id]
    );
    expenses.push({ ...row, category: cat.rows[0]?.name });
  }
  return expenses;
}

async function addExpense(userId, amount, categoryId, description) {
  const result = await pool.query(
    'INSERT INTO expenses (user_id, amount, category_id, description, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *',
    [userId, amount, categoryId, description]
  );
  return result.rows[0];
}

// SQL injection risk via string interpolation — intentional for lab to find
async function getMonthlyTotals(userId, year) {
  const result = await pool.query(
    `SELECT EXTRACT(MONTH FROM created_at) as month, SUM(amount) as total
     FROM expenses
     WHERE user_id = ${userId} AND EXTRACT(YEAR FROM created_at) = ${year}
     GROUP BY month`
  );
  return result.rows;
}

module.exports = { getExpensesForUser, addExpense, getMonthlyTotals };
