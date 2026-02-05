const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { connectKafka, sendMessage } = require('./services/kafkaService');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());



// Routes



app.get('/health', (req, res) => {
  res.json({ status: 'UP' });
});

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  
  try {
    await connectKafka();
    console.log('Kafka connected');
    // Demo: Send a test message
    await sendMessage('test-topic', 'Hello Kafka from MVC JS!');
  } catch (err) {
    console.error('Failed to connect to Kafka:', err);
  }
  

  // Database Sync
  const syncDatabase = async () => {
      let retries = 30;
      while (retries) {
          try {
              const sequelize = require('./config/database');
              await sequelize.sync();
              console.log('Database synced');
              break;
          } catch (err) {
              console.error('Database sync failed:', err);
              retries -= 1;
              console.log(`Retries left: ${retries}. Waiting 5s...`);
              await new Promise(res => setTimeout(res, 5000));
          }
      }
  };
  syncDatabase();
});