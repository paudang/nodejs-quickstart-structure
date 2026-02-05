import { Request, Response } from 'express';
import { UserRepository } from '../../infrastructure/repositories/userRepository';
import CreateUser from '../../usecases/createUser';
import GetAllUsers from '../../usecases/getAllUsers';

const userRepository = new UserRepository();
const createUserUseCase = CreateUser(userRepository);
const getAllUsersUseCase = GetAllUsers(userRepository);

export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email } = req.body;
        const user = await createUserUseCase(name, email);
        res.status(201).json(user);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await getAllUsersUseCase();
        res.json(users);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
