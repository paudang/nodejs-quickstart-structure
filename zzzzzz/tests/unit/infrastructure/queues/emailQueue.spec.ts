import { emailQueue } from '@/infrastructure/queues/emailQueue';

jest.mock('bullmq', () => {
    return {
        Queue: jest.fn().mockImplementation((name) => ({
            name,
            add: jest.fn()
        }))
    };
});

jest.mock('@/infrastructure/caching/redisClient', () => ({}));

describe('Email Queue', () => {
    it('should be initialized', () => {
        expect(emailQueue).toBeDefined();
        expect((emailQueue as any).name).toBe('email-queue');
    });
});
