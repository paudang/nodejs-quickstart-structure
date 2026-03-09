import { gqlContext } from '@/graphql/context';
import { Request } from 'express';
import { resolvers } from '@/graphql/resolvers';
import { typeDefs } from '@/graphql/typeDefs';

describe('GraphQL Context', () => {
  it('should exercise GraphQL index entry points', () => {
    expect(resolvers).toBeDefined();
    expect(typeDefs).toBeDefined();
  });
  it('should return context with token when authorization header is present', async () => {
    const mockRequest = {
      headers: {
        authorization: 'Bearer token123',
      },
    } as Request;

    const context = await gqlContext({ req: mockRequest });
    expect(context).toEqual({ token: 'Bearer token123' });
  });

  it('should return context with empty token when authorization header is missing', async () => {
    const mockRequest = {
      headers: {},
    } as Request;

    const context = await gqlContext({ req: mockRequest });
    expect(context).toEqual({ token: '' });
  });
});
