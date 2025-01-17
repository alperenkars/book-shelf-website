
//here we create the express (find explanation about express in server.js file)
const express = require('express');
const path = require('path');
const cors = require('cors'); //require = import

// we should add the part below to update it to mysql2/promise
const pool = require('./config/database'); // Import the MySQL connection pool
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors()); // Enable CORS (security feature)

// this part serves only to static files from the public directory (books_dataset.json file). if we dynamically want to get the data we produce from queries from the database, we can remove this part
app.use(express.static(path.join(__dirname, 'public')));

//these are routes. they handle specific requests. for example, when we go to localhost:3001/ we will see "Hello World!" message. 
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// again this directly displays the books_dataset.json file. if we want to display the books from the database, we can remove this part
app.get('/books', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'books_dataset.json'));
});

/* example function for fetching books with mysql2/promise 
app.get('/books', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Books');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).send('Internal Server Error');
  }
}); */




// hre we test database connection using mysql2/promise (updated from sequelize to promise)
async function testDatabaseConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Connection has been established successfully.');
    connection.release();
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
}

testDatabaseConnection();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});