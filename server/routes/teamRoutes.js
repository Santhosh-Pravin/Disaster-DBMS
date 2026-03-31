const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all rescue teams
router.get('/', async (req, res, next) => {
    try {
        const [rows] = await db.query('SELECT * FROM rescue_team_deployment_view');
        res.json(rows);
    } catch (err) {
        next(err);
    }
});

// Create a team
router.post('/', async (req, res, next) => {
    const { name, location_id } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO Rescue_Team (name, location_id) VALUES (?, ?)',
            [name, location_id]
        );
        res.json({ message: 'Team registered.', id: result.insertId });
    } catch (err) {
        next(err);
    }
});

// Assign team to disaster (Stored Procedure)
router.post('/:id/assign', async (req, res, next) => {
    const { disaster_id } = req.body;
    try {
        const [result] = await db.query('CALL sp_assign_rescue_team(?, ?)', [
            req.params.id, disaster_id
        ]);
        res.json({ message: 'Team assigned to disaster.', result: result[0] });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
