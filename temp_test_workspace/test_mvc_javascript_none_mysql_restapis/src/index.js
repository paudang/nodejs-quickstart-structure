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

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  

  // Database Sync
  try {
      const sequelize = require('./config/database');
      await sequelize.sync();
      console.log('Database synced');
  } catch (err) {
      console.error('Database sync failed:', err);
  }
});