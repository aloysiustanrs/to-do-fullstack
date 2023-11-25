const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const jwtExpiresIn = process.env.JWT_EXPIRES_IN;


const app = express();
const PORT = process.env.PORT || 3001;

const db = new Client({
  user: dbUser,
  host: 'localhost',
  database: 'postgres',
  password: dbPassword,
  port: 5432,
});

db.connect();

app.use(bodyParser.json());
app.use(cors());

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Failed to authenticate token' });
    }

    req.userId = decoded.userId;
    next();
  });
};

// Register a new user
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await db.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id', [username, hashedPassword]);

    
    const userId = result.rows[0].id;

    const token = jwt.sign({ userId }, 'your-secret-key', { expiresIn: jwtExpiresIn });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login and generate JWT token
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, 'your-secret-key', { expiresIn: jwtExpiresIn });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get user's tasks (protected route)
app.get('/tasks', verifyToken, async (req, res) => {
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
app.post('/tasks', verifyToken, async (req, res) => {
  const userId = req.userId;
  
  const { title } = req.body;

  try {
    await db.query('INSERT INTO tasks (user_id, title) VALUES ($1, $2)', [userId, title]);

    res.status(201).json({ message: 'Task created successfully'});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update a task (protected route)
app.put('/tasks/:taskId', verifyToken, async (req, res) => {
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
app.delete('/tasks/:taskId', verifyToken, async (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});