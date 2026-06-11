import CreateUser from '@/usecases/createUser';
import { UserRepository } from '@/infrastructure/repositories/UserRepository';
import cacheService from '@/infrastructure/caching/redisClient';

jest.mock('@/infrastructure/repositories/UserRepository', () => ({
    UserRepository: jest.fn().mockImplementation(() => ({
        save: jest.fn(),
        findById: jest.fn(),
        getUsers: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
    }))
}));
jest.mock('@/infrastructure/caching/redisClient', () => ({
    get: jest.fn(),
    set: jest.fn(),
    del: jest.fn()
}));

describe('CreateUser UseCase', () => {
    let createUser: CreateUser;
    let mockUserRepository: jest.Mocked<UserRepository>;

    beforeEach(() => {
        mockUserRepository = new UserRepository() as jest.Mocked<UserRepository>;
        createUser = new CreateUser(mockUserRepository);
        jest.clearAllMocks();
    });

    it('should create and save a new user', async () => {
        const name = 'Test User';
        const email = 'test@example.com';
        const password = 'password123';
        const expectedResult = { id: 1, name, email };

        mockUserRepository.save.mockResolvedValue(expectedResult as any);

        const result = await createUser.execute(name, email, password);

        expect(mockUserRepository.save).toHaveBeenCalledTimes(1);
        const savedUser = mockUserRepository.save.mock.calls[0][0];
        expect(savedUser.name).toBe(name);
        expect(savedUser.email).toBe(email);
        expect(result).toEqual(expectedResult);
        expect(cacheService.del).toHaveBeenCalledWith('users:all');
    });

    it('should throw an error if repository fails', async () => {
        const error = new Error('Database error');
        mockUserRepository.save.mockRejectedValue(error);

        await expect(createUser.execute('Test', 'test@test.com', 'pwd')).rejects.toThrow(error);
    });
});
