const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const db = require('../db');

// Get user's tasks (protected route)
router.get('/get', verifyToken, async (req, res) => {
    const userId = req.userId;
  
    try {
      const result = await db.query('SELECT * FROM tasks WHERE user_id = $1', [userId]);
      const tasks = result.rows;
  
      res.json(tasks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  // Create a new task (protected route)
  router.post('/create', verifyToken, async (req, res) => {
    const userId = req.userId;
    
    const { id, title } = req.body;
  
    try {
      await db.query('INSERT INTO tasks (id, user_id, title) VALUES ($1, $2, $3)', [id, userId, title]);
  
      res.status(201).json({ message: 'Task created successfully'});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  // Update a task (protected route)
  router.put('/update/:taskId', verifyToken, async (req, res) => {
    const userId = req.userId;
    const taskId = req.params.taskId;
    const { title, completed } = req.body;
  
    try {
      await db.query('UPDATE tasks SET title = $1, completed = $2 WHERE id = $3 AND user_id = $4', [title, completed, taskId, userId]);
  
      res.json({ message: 'Task updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  // Delete a task (protected route)
  router.delete('/delete/:taskId', verifyToken, async (req, res) => {
    const userId = req.userId;
    const taskId = req.params.taskId;
  
    try {
      await db.query('DELETE FROM tasks WHERE id = $1 AND user_id = $2', [taskId, userId]);
  
      res.json({ message: 'Task deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

module.exports = router;