const db = require('../config/database');

exports.getBooks = async (req, res) => {
  const { title, author, genre, year, minPageCount, maxPageCount } = req.query;
  let query = "SELECT * FROM book WHERE 1=1";
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

exports.getBookById = async (req, res) => {
  const { book_id } = req.params;
  const query = "SELECT * FROM book WHERE book_id = ?";
  
  try {
    const [book] = await db.query(query, [book_id]);
    if (book.length === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(200).json(book[0]);
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).json({ error: 'Database error' });
  }
};

