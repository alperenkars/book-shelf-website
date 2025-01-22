const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '../.env' });

// Read the user.sql file
const librarySql = fs.readFileSync(path.join(__dirname, 'library.sql'), 'utf-8');
console.log(librarySql); // Dosya içeriğini kontrol et

// Create a connection to the database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME, // Ensure you specify the correct database
  multipleStatements: true, // Enable multiple statements to execute the entire file
});

// Connect to the database and execute the SQL
connection.query(librarySql, (err, results) => {
  if (err) {
    console.error('Error executing library.sql:', err.message);
    connection.end();
    return;
  }
  console.log('Library data inserted successfully.');

  // Close the connection
  connection.end((err) => {
    if (err) {
      console.error('Error closing the connection:', err.message);
      return;
    }
    console.log('Database connection closed.');
  });
});
