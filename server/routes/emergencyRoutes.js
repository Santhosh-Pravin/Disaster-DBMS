const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all emergency requests
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT er.*, l.region, l.city 
            FROM Emergency_Request er
            JOIN Location l ON er.location_id = l.id
            ORDER BY er.date_logged DESC
        `);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Apply an emergency request
router.post('/', async (req, res) => {
    const { location_id, description } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO Emergency_Request (location_id, description) VALUES (?, ?)',
            [location_id, description]
        );
        res.status(201).json({ id: result.insertId, message: 'Emergency request logged' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update an emergency request status
router.put('/:id', async (req, res) => {
    const { status } = req.body;
    try {
        await db.query('UPDATE Emergency_Request SET status = ? WHERE id = ?', [status, req.params.id]);
        res.json({ message: 'Request status updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
