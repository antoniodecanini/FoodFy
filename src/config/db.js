const { Pool } = require('pg');

module.exports = new Pool({
  user: 'decanini',
  password: 'decanini',
  host: 'localhost',
  port: 5432,
  database: 'foodfy'
});