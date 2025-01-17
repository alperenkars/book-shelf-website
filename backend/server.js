const express = require('express');
const app = express();
const db = require('./config/database');
const bookRoutes = require('./routes/bookRoutes');


//this means server uses bookRoutes in routes folder to display the books on /api/books endpoint
//also express is a node.js framework to create apis and web applications, routing and middleware mechanisms come from there
app.use(express.json());
app.use('/api/books', bookRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));