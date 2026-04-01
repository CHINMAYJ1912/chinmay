/**
 * setup_db.js — Run once to create the chinmay_db database and seed menu items.
 * Usage: node setup_db.js
 */
require('dotenv').config();
const mysql = require('mysql2/promise');
const fs    = require('fs');
const path  = require('path');

(async () => {
  // Connect to the database specified in the environment variables
  const conn = await mysql.createConnection({
    host:     process.env.MYSQLHOST     || process.env.DB_HOST     || 'localhost',
    user:     process.env.MYSQLUSER     || process.env.DB_USER     || 'root',
    password: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD || 'tiger',
    database: process.env.MYSQLDATABASE || process.env.DB_NAME     || 'chinmay_db',
    port:     process.env.MYSQLPORT     || 3306,
    multipleStatements: true
  });

  try {
    console.log('✅  Connected to MySQL server: ' + (process.env.MYSQLHOST || 'localhost'));
    console.log('📦  Using database: ' + (process.env.MYSQLDATABASE || process.env.DB_NAME || 'chinmay_db'));
    const sql = fs.readFileSync(path.join(__dirname, 'database', 'schema.sql'), 'utf8');
    await conn.query(sql);
    console.log('✅  Database and tables created, menu items seeded!');
    console.log('🚀  You can now run:  node server.js');
  } catch (err) {
    console.error('❌  Setup failed:', err.message);
  } finally {
    await conn.end();
  }
})();
