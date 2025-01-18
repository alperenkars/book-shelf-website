const db = require('../config/database');

exports.getBooks = async (req, res) => {
  const { title, author, genre, year, minPageCount, maxPageCount, minOwners } = req.query;
  
  let query = `
    SELECT b.*, COUNT(bc.copy_id) AS owner_count
    FROM book b
    LEFT JOIN bookcopy bc ON b.book_id = bc.book_id
    WHERE 1=1
  `;
  const params = [];

  if (title) {
    query += " AND b.title LIKE ?";
    params.push(`%${title}%`);
  }
  if (author) {
    query += " AND b.author LIKE ?";
    params.push(`%${author}%`);
  }
  if (genre) {
    query += " AND b.genre = ?";
    params.push(genre);
  }
  if (year) {
    query += " AND b.year = ?";
    params.push(year);
  }
  if (minPageCount) {
    query += " AND b.pages >= ?";
    params.push(Number(minPageCount));
  }
  if (maxPageCount) {
    query += " AND b.pages <= ?";
    params.push(Number(maxPageCount));
  }

  query += `
    GROUP BY b.book_id
  `;

  if (minOwners) {
    query += " HAVING owner_count >= ?";
    params.push(Number(minOwners));
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
  const query = `
    SELECT 
      b.book_id, 
      b.title, 
      b.author, 
      b.genre, 
      b.isbn,
      u.user_id, 
      u.user_name, 
      u.email
    FROM 
      book b
    LEFT JOIN 
      bookcopy bc ON b.book_id = bc.book_id
    LEFT JOIN 
      user u ON bc.owned_by = u.user_id
    WHERE 
      b.book_id = ?
  `;

  try {
    const [rows] = await db.query(query, [book_id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }

    const book = {
      book_id: rows[0].book_id,
      title: rows[0].title,
      author: rows[0].author,
      genre: rows[0].genre,
      isbn: rows[0].isbn,
      owners: rows
        .filter(row => row.user_id)
        .map(row => ({
          user_id: row.user_id,
          user_name: row.user_name,
          email: row.email,
        }))
    };

    res.status(200).json(book);
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).json({ error: 'Database error' });
  }
};

