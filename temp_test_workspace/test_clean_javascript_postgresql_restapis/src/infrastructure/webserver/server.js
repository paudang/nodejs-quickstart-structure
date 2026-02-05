const express = require('express');
const cors = require('cors');
require('dotenv').config();
const apiRoutes = require('../../interfaces/routes/api');

const startServer = (port) => {
    const app = express();

    app.use(cors());
    app.use(express.json());

    app.use('/api', apiRoutes);

    app.get('/health', (req, res) => {
        res.json({ status: 'UP' });
    });

    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
};

module.exports = startServer;
