const mysql = require('mysql2');
const fs = require('fs');
require('dotenv').config({ path: '../.env' });

// Read the dataset file
const books = JSON.parse(fs.readFileSync('books_dataset.json', 'utf-8'));

// Create a connection to the database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Insert books into the database
const query = `
  INSERT INTO Book (title, author, genre, year, isbn, publisher, pages)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`;

books.forEach((book) => {
  const { title, author, genre, year, isbn, publisher, pages } = book;

  connection.query(query, [title, author, genre, year, isbn, publisher, pages], (err) => {
    if (err) {
      return;
    }
  });
});

// Close the connection after insertion
connection.end((err) => {
  if (err) {
    console.error('Error closing the connection:', err.message);
    return;
  }
  console.log('Books inserted successfully.');
  console.log('Database connection closed.');
});
