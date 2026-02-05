import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { connectKafka, sendMessage } from './infrastructure/messaging/kafkaClient';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());



app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'UP' });
});

app.listen(port, async () => {
  console.log(`Server running on port ${port}`);
  
  try {
    await connectKafka();
    console.log('Kafka connected');
    // Demo
    await sendMessage('test-topic', 'Hello Kafka from Clean Arch TS!');
  } catch (err) {
    console.error('Failed to connect to Kafka:', err);
  }
  
  
  // Database Sync
  // Database Sync
  const syncDatabase = async () => {
      let retries = 30;
      while (retries) {
          try {
              const sequelize = require('./infrastructure/database/database').default;
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