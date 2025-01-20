const express = require('express');
const cors = require('cors');
const bookRoutes = require('./routes/bookRouter');
const userRoutes = require('./routes/userRouter');
const libraryRoutes = require('./routes/libraryRouter');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);
app.use('/api/libraries', libraryRoutes);

const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));