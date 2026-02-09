import { Request, Response } from 'express';
import { UserRepository } from '../../infrastructure/repositories/UserRepository';
import CreateUser from '../../usecases/createUser';
import GetAllUsers from '../../usecases/getAllUsers';
import { HTTP_STATUS } from '../../utils/httpCodes';
import logger from '../../infrastructure/log/logger';

export class UserController {
    private createUserUseCase: CreateUser;
    private getAllUsersUseCase: GetAllUsers;

    constructor() {
        const userRepository = new UserRepository();
        this.createUserUseCase = new CreateUser(userRepository);
        this.getAllUsersUseCase = new GetAllUsers(userRepository);
    }

    async createUser(req: Request, res: Response) {
        try {
            const { name, email } = req.body;
            const user = await this.createUserUseCase.execute(name, email);
            res.status(HTTP_STATUS.CREATED).json(user);
        } catch (error) {
            logger.error('UserController Error:', error);
            if (error instanceof Error) {
                res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: error.message });
            } else {
                res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Unknown error occurred' });
            }
        }
    }

    async getUsers(req: Request, res: Response) {
        try {
            const users = await this.getAllUsersUseCase.execute();
            res.json(users);
        } catch (error) {
            logger.error('UserController Error:', error);
            if (error instanceof Error) {
                res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: error.message });
            } else {
                res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Unknown error occurred' });
            }
        }
    }
}
