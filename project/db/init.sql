CREATE TABLE IF NOT EXISTS categories (
  id   SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS expenses (
  id          SERIAL PRIMARY KEY,
  user_id     INTEGER NOT NULL,
  amount      DECIMAL(10,2) NOT NULL,
  category_id INTEGER REFERENCES categories(id),
  description TEXT,
  created_at  TIMESTAMP DEFAULT NOW()
);

INSERT INTO categories (name) VALUES
  ('Travel'), ('Food'), ('Software'), ('Office'), ('Other');

INSERT INTO expenses (user_id, amount, category_id, description) VALUES
  (1, 49.99,  3, 'GitHub Pro subscription'),
  (1, 120.00, 1, 'Flight to conference'),
  (1,  25.50, 2, 'Team lunch'),
  (1, 299.00, 3, 'AWS usage - October'),
  (1,  15.00, 2, 'Coffee meetings');
