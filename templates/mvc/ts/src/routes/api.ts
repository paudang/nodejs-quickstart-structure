import { Router, Request, Response, NextFunction } from 'express';
import { UserController } from '@/controllers/userController';

const router = Router();
const userController = new UserController();

router.get('/users', (req: Request, res: Response, next: NextFunction) => userController.getUsers(req, res, next));
router.post('/users', (req: Request, res: Response, next: NextFunction) => userController.createUser(req, res, next));

export default router;
