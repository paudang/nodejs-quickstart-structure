const express = require('express');
const cors = require('cors');
require('dotenv').config();
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', apiRoutes);

app.get('/health', (req, res) => {
    res.json({ status: 'UP' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
