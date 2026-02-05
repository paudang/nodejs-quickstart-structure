import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/api';


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


// View Engine Setup
import path from 'path';
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// Routes
app.use('/api', apiRoutes);

app.get('/', (req: Request, res: Response) => {
  res.render('index', { 
    projectName: 'NodeJS Service',
    architecture: 'MVC',
    database: 'MySQL',
    communication: 'REST APIs'
  });
});


app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'UP' });
});

app.listen(port, async () => {
  console.log(`Server running on port ${port}`);

  
  // Database Sync
  try {
      const sequelize = require('./config/database').default;
      await sequelize.sync();
      console.log('Database synced');
  } catch (err) {
      console.error('Database sync failed:', err);
  }
});