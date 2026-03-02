import { Router, Request, Response, NextFunction } from 'express';
import { UserController } from '@/interfaces/controllers/userController';

const router = Router();
const userController = new UserController();

router.post('/', (req: Request, res: Response, next: NextFunction) => userController.createUser(req, res, next));
router.get('/', (req: Request, res: Response, next: NextFunction) => userController.getUsers(req, res, next));

export default router;

