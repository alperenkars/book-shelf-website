const db = require('../models/db');

exports.getBooks = async (req, res) => {
  const { title, author, genre, year, minPageCount, maxPageCount } = req.query;
  let query = "SELECT * FROM books WHERE 1=1";
  const params = [];

  if (title) {
    query += " AND title LIKE ?";
    params.push(`%${title}%`);
  }
  if (author) {
    query += " AND author LIKE ?";
    params.push(`%${author}%`);
  }
  if (genre) {
    query += " AND genre = ?";
    params.push(genre);
  }
  if (year) {
    query += " AND year = ?";
    params.push(year);
  }
  if (minPageCount) {
    query += " AND pages >= ?";
    params.push(Number(minPageCount));
  }
  if (maxPageCount) {
    query += " AND pages <= ?";
    params.push(Number(maxPageCount));
  }

  console.log("SQL Query:", query);
  console.log("Query Parameters:", params);
  
  try {
    const [books] = await db.query(query, params);
    res.status(200).json(books);
    
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).json({ error: 'Database error' });
  }
};
