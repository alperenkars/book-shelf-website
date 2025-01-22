const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '../.env' });

// Read the user.sql file
const followSql = fs.readFileSync(path.join(__dirname, 'follow.sql'), 'utf-8');

// Create a connection to the database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME, // Ensure you specify the correct database
  multipleStatements: true, // Enable multiple statements to execute the entire user.sql file
});

// Connect to the database and execute the SQL
connection.query(followSql, (err, results) => {
  if (err) {
    console.error('Error executing follow.sql:', err.message);
    connection.end();
    return;
  }
  console.log('Follow data inserted successfully.');

  // Close the connection
  connection.end((err) => {
    if (err) {
      console.error('Error closing the connection:', err.message);
      return;
    }
    console.log('Database connection closed.');
  });
});
