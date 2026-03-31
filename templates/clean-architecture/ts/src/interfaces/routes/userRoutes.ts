import { Router, Request, Response, NextFunction } from 'express';
import { UserController } from '@/interfaces/controllers/userController';

const router = Router();
const userController = new UserController();

router.post('/', (req: Request, res: Response, next: NextFunction) => userController.createUser(req, res, next));
router.get('/', (req: Request, res: Response, next: NextFunction) => userController.getUsers(req, res, next));
router.patch('/:id', (req: Request, res: Response, next: NextFunction) => userController.updateUser(req, res, next));
router.delete('/:id', (req: Request, res: Response, next: NextFunction) => userController.deleteUser(req, res, next));

export default router;

