const express = require('express');
const path = require('path');
const cors = require('cors'); // Import the cors package
const sequelize = require('./config/database');
const Book = require('./models/Book');
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors()); // Enable CORS

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Serve the books dataset JSON file
app.get('/books', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'books_dataset.json'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Test database connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    return sequelize.sync({ force: true });
  })
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });