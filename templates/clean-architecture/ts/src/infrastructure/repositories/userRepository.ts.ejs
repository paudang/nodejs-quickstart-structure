import { User as UserEntity } from '../../domain/user';
import UserModel from '../database/models/User';

export class UserRepository {
    async createUser(name: string, email: string): Promise<UserEntity> {
        const user = await UserModel.create({ name, email });
        return { id: user.id, name: user.name, email: user.email };
    }

    async getUsers(): Promise<UserEntity[]> {
        const users = await UserModel.findAll();
        return users.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email
        }));
    }
}
