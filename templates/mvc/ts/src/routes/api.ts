import { Router, Request, Response } from 'express';
import { UserController } from '../controllers/userController';

const router = Router();
const userController = new UserController();

router.get('/users', (req: Request, res: Response) => userController.getUsers(req, res));
router.post('/users', (req: Request, res: Response) => userController.createUser(req, res));

export default router;
