const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all disasters
router.get('/', async (req, res, next) => {
    try {
        const [rows] = await db.query(`
            SELECT d.*, dt.type_name, l.city, l.region 
            FROM Disaster d
            JOIN Disaster_Type dt ON d.type_id = dt.id
            JOIN Location l ON d.location_id = l.id
            ORDER BY d.date_reported DESC
        `);
        res.json(rows);
    } catch (err) {
        next(err);
    }
});

// Get disaster types
router.get('/types', async (req, res, next) => {
    try {
        const [rows] = await db.query('SELECT * FROM Disaster_Type');
        res.json(rows);
    } catch (err) {
        next(err);
    }
});

// Get locations
router.get('/locations', async (req, res, next) => {
    try {
        const [rows] = await db.query('SELECT * FROM Location');
        res.json(rows);
    } catch (err) {
        next(err);
    }
});

// Register a new disaster using stored procedure
router.post('/', async (req, res, next) => {
    const { name, type_id, location_id, severity, description } = req.body;
    try {
        const [result] = await db.query('CALL sp_register_disaster(?, ?, ?, ?, ?)', [
            name, type_id, location_id, severity, description
        ]);
        res.json({ message: 'Disaster registered successfully.', data: result[0] });
    } catch (err) {
        next(err);
    }
});

// Update disaster status
router.put('/:id/status', async (req, res, next) => {
    const { status } = req.body;
    try {
        await db.query('UPDATE Disaster SET status = ? WHERE id = ?', [status, req.params.id]);
        res.json({ message: 'Status updated.' });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
