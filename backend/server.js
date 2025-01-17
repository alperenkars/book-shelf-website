const express = require('express');
const app = express();
const db = require('./config/db');
const bookRoutes = require('./routes/bookRoutes');

app.use(express.json());
app.use('/api/books', bookRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));