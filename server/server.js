const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const disasterRoutes = require('./routes/disasterRoutes');
const victimRoutes = require('./routes/victimRoutes');
const campRoutes = require('./routes/campRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
const teamRoutes = require('./routes/teamRoutes');
const volunteerRoutes = require('./routes/volunteerRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const affectedAreaRoutes = require('./routes/affectedAreaRoutes');
const emergencyRoutes = require('./routes/emergencyRoutes');

app.use('/api/disasters', disasterRoutes);
app.use('/api/victims', victimRoutes);
app.use('/api/camps', campRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/volunteers', volunteerRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/affected-areas', affectedAreaRoutes);
app.use('/api/emergencies', emergencyRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Disaster Management API is running.' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!', details: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
