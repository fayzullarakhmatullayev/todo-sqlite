import { Todo } from '../models/todo.js';
import { todoSchema } from '../validations/todo.validate.js';

export const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;

    const { error } = todoSchema.validate({ title, description });

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const todo = await Todo.create({ title, description });
    res.status(201).json({ message: 'Todo created successfully', todo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  const { error } = todoSchema.validate({ title, description, completed });

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const todo = await Todo.findByPk(id);

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    todo.title = title ?? todo.title;
    todo.description = description ?? todo.description;
    todo.completed = completed ?? todo.completed;

    await todo.save();
    res.status(200).json({ message: 'Todo updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    await todo.destroy();
    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
