// routes/todos.js
const express = require('express');
const router = express.Router();
const { getAllTodos, createTodo, updateTodo, deleteTodo } = require('../controllers/todoController');

// Get all todos
router.get('/todos', getAllTodos);

// Create a new todo
router.post('/todos', createTodo);

// Update a todo
router.put('/todos/:id', updateTodo);

// Delete a todo
router.delete('/todos/:id', deleteTodo);

module.exports = router;
