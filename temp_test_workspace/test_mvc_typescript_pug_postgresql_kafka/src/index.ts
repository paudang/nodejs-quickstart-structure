import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/api';
import { connectKafka, sendMessage } from './services/kafkaService';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


// View Engine Setup
import path from 'path';
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// Routes
app.use('/api', apiRoutes);

app.get('/', (req: Request, res: Response) => {
  res.render('index', { 
    projectName: 'NodeJS Service',
    architecture: 'MVC',
    database: 'PostgreSQL',
    communication: 'Kafka'
  });
});


app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'UP' });
});

app.listen(port, async () => {
  console.log(`Server running on port ${port}`);

  try {
    await connectKafka();
    console.log('Kafka connected');
    await sendMessage('test-topic', 'Hello Kafka from MVC TS!');
  } catch (err) {
    console.error('Failed to connect to Kafka:', err);
  }
  
  
  // Database Sync
  try {
      const sequelize = require('./config/database').default;
      await sequelize.sync();
      console.log('Database synced');
  } catch (err) {
      console.error('Database sync failed:', err);
  }
});