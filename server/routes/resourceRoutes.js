const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all resources
router.get('/', async (req, res, next) => {
    try {
        const [rows] = await db.query('SELECT * FROM resource_availability_view');
        res.json(rows);
    } catch (err) {
        next(err);
    }
});

// Get resource types
router.get('/types', async (req, res, next) => {
    try {
        const [rows] = await db.query('SELECT * FROM Resource_Type');
        res.json(rows);
    } catch (err) {
        next(err);
    }
});

// Allocate resources (Stored Procedure)
router.post('/allocate', async (req, res, next) => {
    const { camp_id, type_id, quantity } = req.body;
    try {
        const [result] = await db.query('CALL sp_allocate_resources(?, ?, ?)', [
            camp_id, type_id, quantity
        ]);
        res.json({ message: 'Resources allocated successfully.', result: result[0] });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
