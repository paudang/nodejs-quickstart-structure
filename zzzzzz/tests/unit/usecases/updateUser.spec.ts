import UpdateUser from '@/usecases/updateUser';
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

describe('UpdateUser UseCase', () => {
    let updateUser: UpdateUser;
    let mockUserRepository: jest.Mocked<UserRepository>;

    beforeEach(() => {
        mockUserRepository = new UserRepository() as jest.Mocked<UserRepository>;
        updateUser = new UpdateUser(mockUserRepository);
        jest.clearAllMocks();
    });

    it('should update and return the user', async () => {
        const id = 1;
        const data = { name: 'Updated Name' };
        const expectedUser = { id, name: 'Updated Name', email: 'test@test.com' };

        mockUserRepository.update.mockResolvedValue(expectedUser as any);

        const result = await updateUser.execute(id, data);

        expect(mockUserRepository.update).toHaveBeenCalledWith(id, data);
        expect(result).toEqual(expectedUser);
        expect(cacheService.del).toHaveBeenCalledWith('users:all');
        expect(cacheService.del).toHaveBeenCalledWith(`user:${id}`);
    });

    it('should throw an error if repository fails', async () => {
        const error = new Error('Database error');
        mockUserRepository.update.mockRejectedValue(error);

        await expect(updateUser.execute(1, { name: 'Test' })).rejects.toThrow(error);
    });
});
