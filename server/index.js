const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const elysiumRoutes = require('./routes/elysiumRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const { database } = require('./utils/database');

const app = express();
const PORT = process.env.PORT || 5000;

// Database connection
mongoose.connect(database.uri, database.options)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Middleware
app.use(cors());
app.use(express.json());
app.use(authMiddleware);

// Routes
app.use('/api/elysium', elysiumRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});