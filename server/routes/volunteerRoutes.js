const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all volunteers
router.get('/', async (req, res, next) => {
    try {
        const [rows] = await db.query('SELECT * FROM Volunteer');
        res.json(rows);
    } catch (err) {
        next(err);
    }
});

// Register volunteer
router.post('/', async (req, res, next) => {
    const { name, phone, skills } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO Volunteer (name, phone, skills) VALUES (?, ?, ?)',
            [name, phone, skills]
        );
        res.json({ message: 'Volunteer registered.', id: result.insertId });
    } catch (err) {
        next(err);
    }
});

// Assign volunteer (Trigger updates Volunteer status to 'Assigned')
router.post('/:id/assign', async (req, res, next) => {
    const { disaster_id, task_description } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO Volunteer_Assignment (volunteer_id, disaster_id, task_description) VALUES (?, ?, ?)',
            [req.params.id, disaster_id, task_description]
        );
        res.json({ message: 'Volunteer assigned.', id: result.insertId });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
