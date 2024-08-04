const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/database');
const User = require('./User'); // Ensure this path is correct

const Todo = sequelize.define('Todo', {
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending'
  }
}, {
  timestamps: true
});

// Define associations
Todo.belongsTo(User, { onDelete: 'SET NULL', onUpdate: 'CASCADE' });

module.exports = Todo;
