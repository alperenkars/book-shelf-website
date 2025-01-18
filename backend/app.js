const express = require('express');
const cors = require('cors');
const bookRoutes = require('./routes/bookRouter');
const userRoutes = require('./routes/userRouter');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', bookRoutes);
app.use('/api', userRoutes);

const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));