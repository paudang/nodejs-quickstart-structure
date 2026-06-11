import request from 'supertest';
import express from 'express';
import healthRoute from '@/interfaces/routes/healthRoute';
import { HTTP_STATUS } from '@/utils/httpCodes';
import sequelize from '@/infrastructure/database/database';

jest.mock('@/infrastructure/database/database', () => {
    return {
        __esModule: true,
        default: {
            authenticate: jest.fn()
        }
    };
});

jest.mock('@/infrastructure/queues/emailQueue', () => ({
    emailQueue: {
        add: jest.fn().mockResolvedValue({ id: '1' })
    }
}));

describe('Health Route', () => {
    let app: express.Express;

    beforeEach(() => {
        app = express();
        app.use('/health', healthRoute);
        jest.clearAllMocks();
    });

    it('should return 200 OK with UP status', async () => {
        const res = await request(app).get('/health');
        expect(res.status).toBe(HTTP_STATUS.OK);
        expect(res.body.status).toBe('UP');
        expect(res.body.database).toBe('connected');
    });

    it('should handle database authentication failure and return 500', async () => {
        (sequelize.authenticate as jest.Mock).mockRejectedValueOnce(new Error('DB Error'));

        const res = await request(app).get('/health');
        expect(res.status).toBe(HTTP_STATUS.INTERNAL_SERVER_ERROR);
        expect(res.body.status).toBe('DOWN');
        expect(res.body.database).toBe('error');
    });

    it('should enqueue a test background job and return 200', async () => {
        const res = await request(app).post('/health/test-job');
        expect(res.status).toBe(HTTP_STATUS.OK);
        expect(res.body.message).toBe('Job enqueued. Check /admin/queues');
    });
});
