import { Router, Request, Response } from 'express';
import { UserController } from '@/interfaces/controllers/userController';

const router = Router();
const userController = new UserController();

router.post('/', (req: Request, res: Response) => userController.createUser(req, res));
router.get('/', (req: Request, res: Response) => userController.getUsers(req, res));

export default router;
