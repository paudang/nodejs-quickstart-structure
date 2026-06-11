import { ERROR_MESSAGES } from '@/utils/errorMessages';
import { UserController } from '@/interfaces/controllers/userController';
import CreateUser from '@/usecases/createUser';
import GetAllUsers from '@/usecases/getAllUsers';
import UpdateUser from '@/usecases/updateUser';
import DeleteUser from '@/usecases/deleteUser';

// Mock dependencies
jest.mock('@/infrastructure/repositories/UserRepository', () => ({
    UserRepository: jest.fn().mockImplementation(() => ({
        save: jest.fn(),
        findById: jest.fn(),
        getUsers: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
    }))
}));
jest.mock('@/usecases/createUser');
jest.mock('@/usecases/getAllUsers');
jest.mock('@/usecases/updateUser');
jest.mock('@/usecases/deleteUser');
jest.mock('@/usecases/getUserById');
jest.mock('@/infrastructure/log/logger', () => ({
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn()
}));

describe('UserController (Clean Architecture)', () => {
    let userController: UserController;
    let mockCreateUserUseCase: jest.Mocked<CreateUser>;
    let mockGetAllUsersUseCase: jest.Mocked<GetAllUsers>;
    let mockUpdateUserUseCase: jest.Mocked<UpdateUser>;
    let mockDeleteUserUseCase: jest.Mocked<DeleteUser>;

    beforeEach(() => {
        // Clear all mocks
        jest.clearAllMocks();

        userController = new UserController();

        // Retrieve the mocked instances created inside UserController constructor
        mockCreateUserUseCase = (CreateUser as jest.Mock).mock.instances[0] as jest.Mocked<CreateUser>;
        mockGetAllUsersUseCase = (GetAllUsers as jest.Mock).mock.instances[0] as jest.Mocked<GetAllUsers>;
        mockUpdateUserUseCase = (UpdateUser as jest.Mock).mock.instances[0] as jest.Mocked<UpdateUser>;
        mockDeleteUserUseCase = (DeleteUser as jest.Mock).mock.instances[0] as jest.Mocked<DeleteUser>;
    });

    describe('getUsers', () => {
        it('should return successfully (Happy Path)', async () => {
            // Arrange
            const usersMock = [{ id: '1', name: 'Test', email: 'test@example.com' }];
            mockGetAllUsersUseCase.execute.mockResolvedValue(usersMock);

            // Act
            const result = await userController.getUsers();

            // Assert
            expect(result).toEqual(usersMock);
            expect(mockGetAllUsersUseCase.execute).toHaveBeenCalled();
        });

        it('should handle errors correctly (Error Handling)', async () => {
            // Arrange
            const error = new Error('UseCase Error');
            mockGetAllUsersUseCase.execute.mockRejectedValue(error);

            // Act & Assert
            await expect(userController.getUsers()).rejects.toThrow(error);
        });

        it('should handle non-Error objects in catch block', async () => {
            // Arrange
            const error = 'String Error';
            mockGetAllUsersUseCase.execute.mockRejectedValue(error);

            // Act & Assert
            await expect(userController.getUsers()).rejects.toEqual(error);
        });
    });

    describe('createUser', () => {
        it('should successfully create a new user (Happy Path)', async () => {
            // Arrange
            const payload = { name: 'Alice', email: 'alice@example.com' };
            const dataArg = payload;
            const expectedUser = { id: '1', ...payload };

            mockCreateUserUseCase.execute.mockResolvedValue(expectedUser);

            // Act
            const result = await userController.createUser(dataArg);

            // Assert
            expect(result).toEqual(expectedUser);
            expect(mockCreateUserUseCase.execute).toHaveBeenCalledWith(payload.name, payload.email, undefined);
        });

        it('should handle errors when creation fails (Error Handling)', async () => {
            // Arrange
            const error = new Error('Creation Error');
            const payload = { name: 'Bob', email: 'bob@example.com' };
            const dataArg = payload;

            mockCreateUserUseCase.execute.mockRejectedValue(error);

            // Act & Assert
            await expect(userController.createUser(dataArg)).rejects.toThrow(error);
        });

        it('should handle non-Error objects in catch block when creation fails', async () => {
            // Arrange
            const error = 'Creation String Error';
            const payload = { name: 'Bob', email: 'bob@example.com' };
            const dataArg = payload;

            mockCreateUserUseCase.execute.mockRejectedValue(error);

            // Act & Assert
            await expect(userController.createUser(dataArg)).rejects.toEqual(error);
        });
    });

    describe('updateUser', () => {
        it('should successfully update a user (Happy Path)', async () => {
            // Arrange
            const id = '1';
            const payload = { name: 'Alice Updated' };
            const idArg = id;
            const dataArg = payload;
            const expectedUser = { id, name: 'Alice Updated', email: 'alice@example.com' };

            mockUpdateUserUseCase.execute.mockResolvedValue(expectedUser as any);

            // Act
            const result = await userController.updateUser(idArg, dataArg);
            expect(result).toEqual(expectedUser);

            expect(mockUpdateUserUseCase.execute).toHaveBeenCalledWith(id, payload);
        });

        it('should handle 404/errors when user not found or update fails', async () => {
            // Arrange
            const id = '999';
            const idArg = id;
            const dataArg = { name: 'Fail' };
            mockUpdateUserUseCase.execute.mockResolvedValue(null);
            await expect(userController.updateUser(idArg, dataArg)).rejects.toThrow(ERROR_MESSAGES.USER_NOT_FOUND);
        });

        it('should handle database errors during update (Error Handling)', async () => {
            // Arrange
            const id = '1';
            const error = new Error('Database Error');
            mockUpdateUserUseCase.execute.mockRejectedValue(error);
            await expect(userController.updateUser(id, { name: 'Fail' })).rejects.toThrow(error);
        });
    });

    describe('deleteUser', () => {
        it('should successfully delete a user (Happy Path)', async () => {
            // Arrange
            const id = '1';
            const idArg = id;
            mockDeleteUserUseCase.execute.mockResolvedValue(true);

            // Act
            const result = await userController.deleteUser(idArg);
            expect(result).toBe(true);

            expect(mockDeleteUserUseCase.execute).toHaveBeenCalledWith(id);
        });

        it('should throw error if user not found during deletion (Error Handling)', async () => {
            // Arrange
            const id = '999';
            mockDeleteUserUseCase.execute.mockResolvedValue(false);
            await expect(userController.deleteUser(id)).rejects.toThrow(ERROR_MESSAGES.USER_NOT_FOUND);
        });

        it('should handle database errors during deletion (Error Handling)', async () => {
            // Arrange
            const id = '1';
            const error = new Error('Database Error');
            mockDeleteUserUseCase.execute.mockRejectedValue(error);
            await expect(userController.deleteUser(id)).rejects.toThrow(error);
        });
    });

    describe('createUser Error Paths', () => {
        it('should handle database errors during creation (Error Handling)', async () => {
            const error = new Error('Database Error');
            mockCreateUserUseCase.execute.mockRejectedValue(error);
            await expect(userController.createUser({ name: 'Alice', email: 'alice@example.com' })).rejects.toThrow(error);
        });
    });
});
