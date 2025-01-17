const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '../.env' });

const initSql = fs.readFileSync(path.join(__dirname, 'init.sql'), 'utf-8');

// First try with one book.
// const books = JSON.parse(fs.readFileSync('books.json', 'utf-8'));
const books = JSON.parse(fs.readFileSync('books_dataset.json', 'utf-8'));

// Create a connection to the database
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    multipleStatements: true,
  });

// Connect to the database
connection.query(initSql, (err) => {
    if (err) {
      console.error('Error executing init.sql:', err.message);
      connection.end();
      return;
    }
    console.log('Database and table initialized.');
  
    // Insert books into the database
    const query = `
      INSERT INTO Books (title, author, genre, year, isbn, publisher, pages)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
  
    books.forEach((book) => {
      const { title, author, genre, year, isbn, publisher, pages } = book;
  
      connection.query(query, [title, author, genre, year, isbn, publisher, pages], (err, results) => {
        if (err) {
          return;
        }
      });
    });
  
    // Close the connection after inserting
    connection.end((err) => {
      if (err) {
        console.error('Error closing the connection:', err.message);
        return;
      }
      console.log('Database connection closed.');
    });
  });