import { User as UserEntity } from '@/domain/user';
import UserModel from '@/infrastructure/database/models/User';

export class UserRepository {
    async save(user: UserEntity): Promise<UserEntity> {
        const newUser = await UserModel.create({ name: user.name, email: user.email });
        return { id: newUser.id, name: newUser.name, email: newUser.email };
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
