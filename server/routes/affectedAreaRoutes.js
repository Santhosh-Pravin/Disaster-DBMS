const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all affected areas
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT aa.*, d.name as disaster_name 
            FROM Affected_Area aa
            JOIN Disaster d ON aa.disaster_id = d.id
        `);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create affected area
router.post('/', async (req, res) => {
    const { disaster_id, region_name, population_affected } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO Affected_Area (disaster_id, region_name, population_affected) VALUES (?, ?, ?)',
            [disaster_id, region_name, population_affected || 0]
        );
        res.status(201).json({ id: result.insertId, message: 'Affected area registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
