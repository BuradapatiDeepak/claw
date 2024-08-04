const { Sequelize } = require('sequelize');
require('dotenv').config();

// Create a new Sequelize instance with SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DB_PATH // Ensure this is correctly set in your .env file
});

module.exports = sequelize;
