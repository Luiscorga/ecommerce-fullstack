const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

const database = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PASS,
  database: 'ecommerce',
});

module.exports = database;
