import { Request, Response } from 'express';
import { UserRepository } from '../../infrastructure/repositories/userRepository';
import CreateUser from '../../usecases/createUser';
import GetAllUsers from '../../usecases/getAllUsers';

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
            res.status(201).json(user);
        } catch (error: any) {
            console.error('UserController Error:', error);
            res.status(500).json({ error: error.message });
        }
    }

    async getUsers(req: Request, res: Response) {
        try {
            const users = await this.getAllUsersUseCase.execute();
            res.json(users);
        } catch (error: any) {
            console.error('UserController Error:', error);
            res.status(500).json({ error: error.message });
        }
    }
}
