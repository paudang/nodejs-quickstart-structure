import { ERROR_MESSAGES } from '@/utils/errorMessages';
import { UserRepository } from '@/infrastructure/repositories/UserRepository';
import CreateUser from '@/usecases/createUser';
import GetAllUsers from '@/usecases/getAllUsers';
import GetUserById from '@/usecases/getUserById';
import UpdateUser from '@/usecases/updateUser';
import DeleteUser from '@/usecases/deleteUser';
import logger from '@/infrastructure/log/logger';

export class UserController {
    private createUserUseCase: CreateUser;
    private getAllUsersUseCase: GetAllUsers;
    private getUserByIdUseCase: GetUserById;
    private updateUserUseCase: UpdateUser;
    private deleteUserUseCase: DeleteUser;

    constructor() {
        const userRepository = new UserRepository();
        this.createUserUseCase = new CreateUser(userRepository);
        this.getAllUsersUseCase = new GetAllUsers(userRepository);
        this.getUserByIdUseCase = new GetUserById(userRepository);
        this.updateUserUseCase = new UpdateUser(userRepository);
        this.deleteUserUseCase = new DeleteUser(userRepository);
    }

    async createUser(data: { name: string, email: string, password?: string }) {
        try {
            const { name, email, password } = data;
                        const user = await this.createUserUseCase.execute(name, email, password);
            const rawUser = user as unknown as { toJSON?: () => Record<string, unknown> };
            return typeof rawUser.toJSON === 'function' ? rawUser.toJSON() : (user as unknown as Record<string, unknown>);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            logger.error(`${ERROR_MESSAGES.CREATE_USER_ERROR}:`, message);
            throw error;
        }
    }

    async getUserById(id: string) {
        try {
            const user = await this.getUserByIdUseCase.execute(id);
            if (!user) throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);
            return user;
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            logger.error(`${ERROR_MESSAGES.FETCH_USER_ERROR}:`, message);
            throw error;
        }
    }

    async getUsers() {
        try {
            const users = await this.getAllUsersUseCase.execute();
            return users;
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            logger.error(`${ERROR_MESSAGES.FETCH_USERS_ERROR}:`, message);
            throw error;
        }
    }

    async updateUser(id: string, data: { name?: string, email?: string }) {
        try {
            const user = await this.updateUserUseCase.execute(id, data);
            if (!user) throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);
            return user;
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            logger.error(`${ERROR_MESSAGES.UPDATE_USER_ERROR}:`, message);
            throw error;
        }
    }

    async deleteUser(id: string) {
        try {
            const deleted = await this.deleteUserUseCase.execute(id);
            if (!deleted) throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);
            return true;
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            logger.error(`${ERROR_MESSAGES.DELETE_USER_ERROR}:`, message);
            throw error;
        }
    }
}
