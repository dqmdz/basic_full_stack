import Task from '../models/Task.js';

export const getTasks = async (req, res) => {
  const tasks = await Task.findAll();
  res.json(tasks);
};

export const createTask = async (req, res) => {
  const { title } = req.body;
  if (title) {
    const task = await Task.create({ title });
    res.status(201).json(task);
  } else {
    res.status(400).json({ error: 'Title is required' });
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const task = await Task.findByPk(id);
  if (task) {
    task.title = title ?? task.title;
    task.completed = completed ?? task.completed;
    await task.save();
    res.json(task);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findByPk(id);
  if (task) {
    await task.destroy();
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
};
