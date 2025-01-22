const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '../.env' });

// Read the SQL file for table creation
const initSql = fs.readFileSync(path.join(__dirname, 'init.sql'), 'utf-8');

// Create a connection to the database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  multipleStatements: true, // Enable multiple statements to execute the entire init.sql file
});

// Execute the SQL script to create the database and tables
connection.query(initSql, (err) => {
  if (err) {
    console.error('Error executing init.sql:', err.message);
    connection.end();
    return;
  }
  console.log('Database and tables initialized successfully.');

  // Close the connection
  connection.end((err) => {
    if (err) {
      console.error('Error closing the connection:', err.message);
      return;
    }
    console.log('Database connection closed.');
  });
});
