const db = require('../config/database');

// Get all users with optional filters
exports.getAllUsers = async (req, res) => {
  const { minFollowers, maxFollowers, name } = req.query;
  let query = `
    SELECT 
      u.user_id, 
      u.user_name, 
      u.email,
      (SELECT COUNT(*) FROM follow f WHERE f.following_id = u.user_id) AS followers_count,
      (SELECT COUNT(*) FROM User_Borrow_Book ubb WHERE ubb.user_id = u.user_id) AS books_borrowed
    FROM 
      User u
    WHERE 1=1
  `;
  const params = [];

  if (name) {
    query += " AND u.user_name LIKE ?";
    params.push(`%${name}%`);
  }
  if (minFollowers) {
    query += " HAVING followers_count >= ?";
    params.push(Number(minFollowers));
  }
  if (maxFollowers) {
    query += " HAVING followers_count <= ?";
    params.push(Number(maxFollowers));
  }

  try {
    const [users] = await db.query(query, params);

    if (users.length === 0) {
      return res.status(404).json({ error: 'No users found' });
    }

    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  const { user_id } = req.params;
  try {
    const userQuery = 'SELECT * FROM User WHERE user_id = ?';
    const followersQuery = `
      SELECT 
        f.follower_id AS user_id, 
        u.user_name, 
        u.email
      FROM 
        follow f
      JOIN 
        User u 
      ON 
        f.follower_id = u.user_id
      WHERE 
        f.following_id = ?
    `;
    const followingQuery = `
      SELECT 
        f.following_id AS user_id, 
        u.user_name, 
        u.email
      FROM 
        follow f
      JOIN 
        User u 
      ON 
        f.following_id = u.user_id
      WHERE 
        f.follower_id = ?
    `;

    const [userRows] = await db.query(userQuery, [user_id]);
    if (userRows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const [followers] = await db.query(followersQuery, [user_id]);
    const [following] = await db.query(followingQuery, [user_id]);

    const user = userRows[0];
    user.followers = followers;
    user.following = following;

    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Get books borrowed by user
exports.getBooksByUserId = async (req, res) => {
  const { user_id } = req.params;
  const query = `
    SELECT 
      b.book_id, 
      b.title, 
      b.author, 
      b.genre, 
      b.year, 
      b.isbn, 
      b.publisher, 
      b.pages,
      ubb.status,
      ubb.borrow_date,
      ubb.return_date
    FROM 
      Book b
    JOIN 
      BookCopy bc ON b.book_id = bc.book_id
    JOIN 
      User_Borrow_Book ubb ON bc.copy_id = ubb.copy_id
    WHERE 
      ubb.user_id = ?
  `;

  try {
    const [books] = await db.query(query, [user_id]);

    if (books.length === 0) {
      return res.status(404).json({ error: 'No books found for this user' });
    }

    res.json(books);
  } catch (error) {
    console.error('Error fetching books for user:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Get active users
exports.getActiveUsers = async (req, res) => {
  const { limit = 20 } = req.query;

  const query = `
    SELECT 
      u.user_id, 
      u.user_name, 
      u.email,
      (SELECT COUNT(*) FROM follow f WHERE f.following_id = u.user_id) AS followers_count,
      COUNT(ubb.user_id) AS books_borrowed
    FROM 
      User u
    JOIN 
      User_Borrow_Book ubb ON u.user_id = ubb.user_id
    GROUP BY 
      u.user_id, u.user_name, u.email
    ORDER BY 
      books_borrowed DESC
    LIMIT ?;
  `;

  try {
    console.log('Executing query:', query);
    console.log('Params:', [Number(limit)]);

    const [activeUsers] = await db.query(query, [Number(limit)]);

    if (activeUsers.length === 0) {
      console.log('No active users found.');
      return res.status(404).json({ error: 'No active users found' });
    }

    res.json(activeUsers);
  } catch (error) {
    console.error('Error fetching active users:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Get users with the most common borrowed genre
exports.getUsersWithMostCommonBorrowedGenre = async (req, res) => {
  const { user_id } = req.params;


  const userGenreQuery = `
    SELECT b.genre, COUNT(*) AS borrow_count
    FROM User_Borrow_Book ubb
    JOIN BookCopy bc ON ubb.copy_id = bc.copy_id
    JOIN Book b ON bc.book_id = b.book_id
    WHERE ubb.user_id = ?
    GROUP BY b.genre
    ORDER BY borrow_count DESC
    LIMIT 1;
  `;

  try {
    const [rows] = await db.query(userGenreQuery, [user_id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'No borrowed genres found for this user' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching most common borrowed genre:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Get users by favorite genre
exports.getUsersByFavoriteGenre = async (req, res) => {
  const { genre } = req.query;

  const favoriteGenreQuery = `
  SELECT 
    u.user_id, 
    u.user_name, 
    u.email, 
    b.genre, 
    COUNT(*) AS borrow_count,
    (SELECT COUNT(*) FROM follow f WHERE f.following_id = u.user_id) AS followers_count,
    COUNT(ubb.user_id) AS books_borrowed
  FROM 
    User u
  JOIN 
    User_Borrow_Book ubb ON u.user_id = ubb.user_id
  JOIN 
    BookCopy bc ON ubb.copy_id = bc.copy_id
  JOIN 
    Book b ON bc.book_id = b.book_id
  WHERE 
    b.genre = ?
  GROUP BY 
    u.user_id, u.user_name, u.email, b.genre
  ORDER BY 
    borrow_count DESC;
`;

  try {
    const [rows] = await db.query(favoriteGenreQuery, [genre]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'No users found for this genre' });
    }
    res.json(rows);
  } catch (error) {
    console.error('Error fetching users by favorite genre:', error);
    res.status(500).send('Internal Server Error');
  }
};