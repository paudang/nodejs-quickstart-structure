import { User as UserEntity } from '@/domain/user';
import UserModel from '@/infrastructure/database/models/User';

export class UserRepository {
    async save(user: UserEntity): Promise<UserEntity> {
        const userData = {
            name: user.name,
            email: user.email,
        };

        const newUser = await UserModel.create(userData);
        return this.mapToEntity(newUser);
    }

    async findById(id: number | string): Promise<UserEntity | null> {
        const user = await UserModel.findByPk(id);
        if (!user) return null;
        return this.mapToEntity(user);
    }

    async findByEmail(email: string): Promise<UserEntity | null> {
        const user = await UserModel.findOne({ where: { email } });
        if (!user) return null;
        return this.mapToEntity(user);
    }

    async getUsers(): Promise<UserEntity[]> {
        const users = await UserModel.findAll();
        return users.map(user => this.mapToEntity(user));
    }

    async update(id: number | string, data: Partial<UserEntity>): Promise<UserEntity | null> {
        const user = await UserModel.findByPk(id);
        if (!user) return null;
        await user.update(data);
        return this.mapToEntity(user);
    }

    async delete(id: number | string): Promise<boolean> {
        const user = await UserModel.findByPk(id);
        if (!user) return false;
        await user.destroy();
        return true;
    }

    private mapToEntity(user: { id?: string | number; _id?: { toString(): string }; name: string; email: string; password?: string | null; googleId?: string | null; githubId?: string | null }): UserEntity {
        return {
            id: user.id || user._id?.toString(),
            name: user.name,
            email: user.email,
            password: user.password,
        } as UserEntity;
    }
}
