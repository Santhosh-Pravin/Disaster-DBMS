const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all victims
router.get('/', async (req, res, next) => {
    try {
        const [rows] = await db.query(`
            SELECT v.*, d.name AS disaster_name 
            FROM Victim v
            JOIN Disaster d ON v.disaster_id = d.id
        `);
        res.json(rows);
    } catch (err) {
        next(err);
    }
});

// Register a new victim
router.post('/', async (req, res, next) => {
    const { disaster_id, name, age, gender, medical_status } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO Victim (disaster_id, name, age, gender, medical_status) VALUES (?, ?, ?, ?, ?)',
            [disaster_id, name, age, gender, medical_status]
        );
        res.json({ message: 'Victim registered.', id: result.insertId });
    } catch (err) {
        next(err);
    }
});

// Transfer victim to relief camp (Stored Procedure)
router.post('/:id/transfer', async (req, res, next) => {
    const { camp_id } = req.body;
    try {
        const [result] = await db.query('CALL sp_transfer_victim(?, ?)', [req.params.id, camp_id]);
        res.json({ message: 'Transfer procedure executed.', result: result[0] });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
