const express = require('express');
const cors = require('cors');
require('dotenv').config();
const apiRoutes = require('./routes/api');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


// View Engine Setup
const path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// Routes
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.render('index', { 
    projectName: 'NodeJS Service',
    architecture: 'MVC',
    database: 'MySQL',
    communication: 'REST APIs'
  });
});


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