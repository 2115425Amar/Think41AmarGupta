const express = require('express');
const router = express.Router();
const db = require('../config');

const mysql = require('mysql2/promise');

router.get('/', async (req, res) => {
  try {
    const connection = await mysql.createConnection(db);
    const [rows] = await connection.execute('SELECT * FROM products LIMIT 10');
    await connection.end();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Database error', details: error.message });
  }
});

module.exports = router;
