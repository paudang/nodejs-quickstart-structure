import request from 'supertest';
import express, { Express } from 'express';
import router from '@/interfaces/routes/userRoutes';

const mockGetUsers = jest.fn().mockImplementation((req, res) => res.status(200).json([{ id: '1', name: 'John Doe' }]));
const mockCreateUser = jest.fn().mockImplementation((req, res) => res.status(201).json({ id: '1', name: 'Test' }));

jest.mock('@/interfaces/controllers/userController', () => {
  return {
    UserController: jest.fn().mockImplementation(() => ({
      getUsers: (...args: unknown[]) => mockGetUsers(...args),
      createUser: (...args: unknown[]) => mockCreateUser(...args)
    }))
  };
});

describe('UserRoutes', () => {
    let app: Express;

    beforeEach(() => {
        app = express();
        app.use(express.json());
        app.use('/users', router);
    });

    it('POST /users should call controller.createUser', async () => {
        await request(app)
            .post('/users')
            .send({ name: 'Test', email: 'test@example.com' });

        expect(mockCreateUser).toHaveBeenCalledTimes(1);
    });

    it('GET /users should call controller.getUsers', async () => {
        await request(app)
            .get('/users');

        expect(mockGetUsers).toHaveBeenCalledTimes(1);
    });
});
