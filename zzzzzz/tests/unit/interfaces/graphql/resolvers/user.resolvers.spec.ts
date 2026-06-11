import { userResolvers } from '@/interfaces/graphql/resolvers/user.resolvers';

const mockGetUsers = jest.fn().mockResolvedValue([{ id: '1', name: 'John Doe', email: 'john@example.com' }]);
const mockCreateUser = jest.fn().mockResolvedValue({ id: '1', name: 'Jane', email: 'jane@example.com' });

jest.mock('@/interfaces/controllers/userController', () => {
  return {
    UserController: jest.fn().mockImplementation(() => ({
      getUsers: (...args: unknown[]) => mockGetUsers(...args),
      createUser: (...args: unknown[]) => mockCreateUser(...args),
      updateUser: jest.fn().mockImplementation((id, data) => Promise.resolve({ id, ...data })),
      deleteUser: jest.fn().mockImplementation(() => Promise.resolve(true))
    }))
  };
});

describe('User Resolvers', () => {
  const mockContext = {
    userRepository: {} as any,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Query.getAllUsers', () => {
    it('should return all users when authorized', async () => {
      const result = await userResolvers.Query.getAllUsers(null, null, mockContext as any);
      expect(result).toEqual([{ id: '1', name: 'John Doe', email: 'john@example.com' }]);
      expect(mockGetUsers).toHaveBeenCalledTimes(1);
    });
  });

  describe('Mutation.createUser', () => {
    it('should create and return a new user (Public)', async () => {
      const payload = { name: 'Jane', email: 'jane@example.com' };
      const result = await userResolvers.Mutation.createUser(null, payload);
      expect(result).toEqual({ id: '1', name: 'Jane', email: 'jane@example.com' });
      expect(mockCreateUser).toHaveBeenCalledWith(payload);
    });
  });

  describe('Mutation.updateUser', () => {
    it('should update and return the user when authorized', async () => {
      const payload = { name: 'Updated' };
      const result = await userResolvers.Mutation.updateUser(null, { id: '1', ...payload }, mockContext as any);
      expect(result).toMatchObject(payload);
    });
  });

  describe('Mutation.deleteUser', () => {
    it('should delete and return true when authorized', async () => {
      const result = await userResolvers.Mutation.deleteUser(null, { id: '1' }, mockContext as any);
      expect(result).toBe(true);
    });
  });
});
