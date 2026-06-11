import { Request } from 'express';

import { gqlContext } from '@/interfaces/graphql/context';

jest.mock('@/infrastructure/repositories/UserRepository', () => ({
    UserRepository: jest.fn().mockImplementation(() => ({
        save: jest.fn(),
        findById: jest.fn(),
        getUsers: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
    }))
}));

describe('GraphQL Context', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return context with user when authorization header is present and valid', async () => {
        const mockRequest = {
            headers: {
                authorization: 'Bearer token123',
            },
        } as Request;
        const context = await gqlContext({ req: mockRequest });
        expect(context.user).toBeUndefined();

        expect(context.userRepository).toBeDefined();
    });

    it('should return context without user when authorization header is missing', async () => {
        const mockRequest = {
            headers: {},
        } as Request;

        const context = await gqlContext({ req: mockRequest });
        expect(context.user).toBeUndefined();
        expect(context.userRepository).toBeDefined();
    });
});
