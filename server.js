const express = require('express');
const app = express();
const cors = require('cors');
const { Sequelize } = require('sequelize');
require('dotenv').config();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies
app.use(express.static('public')); // Serve static files from 'public'

// Routes
app.use('/api', require('./routes/auth')); // Authentication routes
app.use('/api', require('./routes/todos')); // Todo routes

// Connect to database
const sequelize = require('./db/database'); // Database configuration
sequelize.sync().then(() => {
  console.log('Database connected');
}).catch((error) => {
  console.error('Unable to connect to the database:', error);
});

// Start server
const PORT = process.env.PORT || 5000; // Port from environment variable or default to 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
