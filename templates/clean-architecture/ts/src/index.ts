import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './interfaces/routes/userRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);

app.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'UP' });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
