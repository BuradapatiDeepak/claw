const Todo = require('../models/Todo'); // Ensure this path is correct

// Get all todos
exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ message: 'Error fetching todos' });
  }
};

// Create a new todo
exports.createTodo = async (req, res) => {
  try {
    const { description, status, UserId } = req.body;
    const newTodo = await Todo.create({ description, status, UserId });
    res.status(201).json(newTodo);
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({ message: 'Error creating todo' });
  }
};

// Update an existing todo
exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, status } = req.body;
    const [updated] = await Todo.update({ description, status }, { where: { id } });

    if (updated) {
      const updatedTodo = await Todo.findByPk(id);
      res.json(updatedTodo);
    } else {
      res.status(404).json({ message: 'Todo not found' });
    }
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ message: 'Error updating todo' });
  }
};

// Delete a todo
exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Todo.destroy({ where: { id } });

    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Todo not found' });
    }
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ message: 'Error deleting todo' });
  }
};
