const { Task } = require("../models/Task");

async function getUserTasks(req, res) {
  const userId = req.userId;

  try {
    const tasks = await Task.findAll({ where: { userId } });
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function createTask(req, res) {
  const userId = req.userId;
  const { title } = req.body;

  try {
    await Task.create({ userId, title });
    res.status(201).json({ message: "Task created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function updateTask(req, res) {
  const userId = req.userId;
  const taskId = req.params.taskId;
  const { editedTask } = req.body;

  try {
    await Task.update({ title: editedTask }, { where: { id: taskId, userId } });
    res.json({ message: "Task updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function markTask(req, res) {
  const userId = req.userId;
  const taskId = req.params.taskId;
  const { completed } = req.body;

  try {
    await Task.update({ completed }, { where: { id: taskId, userId } });
    res.json({ message: "Task updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function deleteTask(req, res) {
  const userId = req.userId;
  const taskId = req.params.taskId;

  try {
    await Task.destroy({ where: { id: taskId, userId } });
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  getUserTasks,
  createTask,
  updateTask,
  markTask,
  deleteTask,
};
