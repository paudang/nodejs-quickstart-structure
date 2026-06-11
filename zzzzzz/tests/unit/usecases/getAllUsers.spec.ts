import GetAllUsers from '@/usecases/getAllUsers';
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

describe('GetAllUsers UseCase', () => {
    let getAllUsers: GetAllUsers;
    let mockUserRepository: jest.Mocked<UserRepository>;

    beforeEach(() => {
        mockUserRepository = new UserRepository() as jest.Mocked<UserRepository>;
        getAllUsers = new GetAllUsers(mockUserRepository);
        jest.clearAllMocks();
    });

    it('should retrieve all users', async () => {
        const expectedUsers = [{ id: 1, name: 'Alice', email: 'alice@example.com' }];
        mockUserRepository.getUsers.mockResolvedValue(expectedUsers as any);
        (cacheService.get as jest.Mock).mockResolvedValue(null);

        const result = await getAllUsers.execute();

        expect(mockUserRepository.getUsers).toHaveBeenCalledTimes(1);
        expect(result).toEqual(expectedUsers);
        expect(cacheService.set).toHaveBeenCalled();
    });

    it('should return from cache if available', async () => {
        const cachedUsers = [{ id: 1, name: 'Cached', email: 'cached@example.com' }];
        (cacheService.get as jest.Mock).mockResolvedValue(cachedUsers);

        const result = await getAllUsers.execute();

        expect(mockUserRepository.getUsers).not.toHaveBeenCalled();
        expect(result).toEqual(cachedUsers);
    });

    it('should throw an error if repository fails', async () => {
        const error = new Error('Database error');
        mockUserRepository.getUsers.mockRejectedValue(error);
        (cacheService.get as jest.Mock).mockResolvedValue(null);

        await expect(getAllUsers.execute()).rejects.toThrow(error);
    });
});
