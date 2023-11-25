const { Client } = require('pg');
const { dbUser, dbPassword } = require('../config');

const db = new Client({
  user: dbUser,
  host: 'localhost',
  database: 'postgres',
  password: dbPassword,
  port: 5432,
});

db.connect();

module.exports = db;