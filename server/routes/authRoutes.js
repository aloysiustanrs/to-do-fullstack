const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');
const { jwtSecret, jwtExpiresIn } = require('../config');


// Register a new user and generate JWT token
router.post('/register', async (req, res) => {
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
router.post('/login', async (req, res) => {
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

module.exports = router;