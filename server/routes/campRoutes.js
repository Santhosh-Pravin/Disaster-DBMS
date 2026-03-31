const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all camps
router.get('/', async (req, res, next) => {
    try {
        const [rows] = await db.query('SELECT * FROM relief_camp_capacity_view');
        res.json(rows);
    } catch (err) {
        next(err);
    }
});

// Create a new camp
router.post('/', async (req, res, next) => {
    const { location_id, name, capacity } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO Relief_Camp (location_id, name, capacity, status) VALUES (?, ?, ?, ?)',
            [location_id, name, capacity, 'Open']
        );
        res.json({ message: 'Camp created.', id: result.insertId });
    } catch (err) {
        next(err);
    }
});

// Update camp status
router.put('/:id/status', async (req, res, next) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        await db.query('UPDATE Relief_Camp SET status = ? WHERE id = ?', [status, id]);
        res.json({ message: 'Camp status updated successfully.' });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
