import { Request, Response } from 'express';
import UserRepository from '../../infrastructure/repositories/userRepository';
import CreateUser from '../../usecases/createUser';

const userRepository = new UserRepository();
const createUser = CreateUser(userRepository);

export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email } = req.body;
        const user = await createUser(name, email);
        res.status(201).json(user);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
