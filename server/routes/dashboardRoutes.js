const express = require('express');
const router = express.Router();
const db = require('../db');

// Get active disasters from View
router.get('/active-disasters', async (req, res, next) => {
    try {
        const [rows] = await db.query('SELECT * FROM active_disasters_view');
        res.json(rows);
    } catch (err) {
        next(err);
    }
});

// Get victim statistics from View
router.get('/victim-stats', async (req, res, next) => {
    try {
        const [rows] = await db.query('SELECT * FROM victim_statistics_view');
        res.json(rows);
    } catch (err) {
        next(err);
    }
});

// Get resource availability from View
router.get('/resources', async (req, res, next) => {
    try {
        const [rows] = await db.query('SELECT * FROM resource_availability_view');
        res.json(rows);
    } catch (err) {
        next(err);
    }
});

// Get rescue team deployment from View
router.get('/teams', async (req, res, next) => {
    try {
        const [rows] = await db.query('SELECT * FROM rescue_team_deployment_view');
        res.json(rows);
    } catch (err) {
        next(err);
    }
});

// Get relief camp capacity from View
router.get('/camps', async (req, res, next) => {
    try {
        const [rows] = await db.query('SELECT * FROM relief_camp_capacity_view');
        res.json(rows);
    } catch (err) {
        next(err);
    }
});

// Get most affected areas from View
router.get('/most-affected-areas', async (req, res, next) => {
    try {
        const [rows] = await db.query('SELECT * FROM most_affected_areas_view');
        res.json(rows);
    } catch (err) {
        next(err);
    }
});

// Get resource shortages from View
router.get('/resource-shortages', async (req, res, next) => {
    try {
        const [rows] = await db.query('SELECT * FROM resource_shortages_view');
        res.json(rows);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
