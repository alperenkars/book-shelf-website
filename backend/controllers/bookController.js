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
    params.push(minOwners);
  }

  try {
    const [rows] = await db.query(query, params);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).send('Internal Server Error');
  }
};

exports.getBookById = async (req, res) => {
  const { bookId } = req.params;
  try {
    const bookQuery = 'SELECT * FROM Book WHERE book_id = ?';
    const borrowersQuery = `
      SELECT 
        u.user_id, 
        u.user_name, 
        u.email, 
        ubb.status, 
        ubb.borrow_date, 
        ubb.return_date
      FROM 
        User u
      JOIN 
        User_Borrow_Book ubb ON u.user_id = ubb.user_id
      JOIN 
        BookCopy bc ON ubb.copy_id = bc.copy_id
      WHERE 
        bc.book_id = ?
    `;

    const [bookRows] = await db.query(bookQuery, [bookId]);
    if (bookRows.length === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }

    const [borrowers] = await db.query(borrowersQuery, [bookId]);

    const book = bookRows[0];
    book.borrowers = borrowers;

    res.json(book);
  } catch (error) {
    console.error('Error fetching book details:', error);
    res.status(500).send('Internal Server Error');
  }
};