const db = require('../config/database');

// Get all libraries
exports.getAllLibraries = async (req, res) => {
  try {
    const librariesQuery = `
      SELECT 
        l.library_id, 
        l.lib_name, 
        l.description, 
        l.create_date, 
        l.built_by, 
        u.user_name AS built_by_name
      FROM 
        Library l
      LEFT JOIN 
        User u ON l.built_by = u.user_id
    `;
    const [libraries] = await db.query(librariesQuery);
    res.json(libraries);
  } catch (error) {
    console.error('Error fetching libraries:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Get library by ID
exports.getLibraryById = async (req, res) => {
  const { library_id } = req.params;
  try {
    const libraryQuery = 'SELECT * FROM Library WHERE library_id = ?';
    const booksQuery = `
      SELECT 
        b.book_id, 
        b.title, 
        b.author, 
        b.genre, 
        b.year, 
        b.isbn, 
        b.publisher, 
        b.pages
      FROM 
        Book b
      JOIN 
        BookCopy bc ON b.book_id = bc.book_id
      JOIN 
        library_includes_book lib ON bc.copy_id = lib.copy_id
      WHERE 
        lib.library_id = ?
    `;
    const builtByQuery = 'SELECT user_name FROM User WHERE user_id = ?';

    const [libraryRows] = await db.query(libraryQuery, [library_id]);
    if (libraryRows.length === 0) {
      return res.status(404).json({ error: 'Library not found' });
    }

    const [books] = await db.query(booksQuery, [library_id]);
    const [builtByRows] = await db.query(builtByQuery, [libraryRows[0].built_by]);

    const library = libraryRows[0];
    library.books = books;
    library.built_by_name = builtByRows.length > 0 ? builtByRows[0].user_name : 'Unknown';

    res.json(library);
  } catch (error) {
    console.error('Error fetching library details:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Get the most common genre in a library
exports.getMostCommonGenre = async (req, res) => {
  const { library_id } = req.params;

  const mostCommonGenreQuery = `
    SELECT 
      b.genre, 
      COUNT(*) AS genre_count
    FROM 
      Book b
    JOIN 
      BookCopy bc ON b.book_id = bc.book_id
    JOIN 
      library_includes_book lib ON bc.copy_id = lib.copy_id
    WHERE 
      lib.library_id = ?
    GROUP BY 
      b.genre
    ORDER BY 
      genre_count DESC
    LIMIT 1;
  `;

  try {
    const [result] = await db.query(mostCommonGenreQuery, [library_id]);

    if (result.length === 0) {
      return res.status(404).json({ error: 'No genres found for this library' });
    }

    res.json(result[0]);
  } catch (error) {
    console.error('Error fetching the most common genre:', error);
    res.status(500).send('Internal Server Error');
  }
};
