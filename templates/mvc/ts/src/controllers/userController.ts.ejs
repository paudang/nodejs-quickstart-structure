import { Request, Response } from 'express';
import User from '../models/User';
import { HTTP_STATUS } from '../utils/httpCodes';

export class UserController {
    async getUsers(req: Request, res: Response) {
        try {
            const users = await User.findAll();
            res.json(users);
        } catch (error) {
            if (error instanceof Error) {
                res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: error.message });
            } else {
                res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Unknown error occurred' });
            }
        }
    }

    async createUser(req: Request, res: Response) {
        try {
            const { name, email } = req.body;
            const user = await User.create({ name, email });
            res.status(HTTP_STATUS.CREATED).json(user);
        } catch (error) {
            if (error instanceof Error) {
                res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: error.message });
            } else {
                res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Unknown error occurred' });
            }
        }
    }
}
