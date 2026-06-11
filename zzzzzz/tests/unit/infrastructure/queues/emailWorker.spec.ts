import { emailWorker } from '@/infrastructure/queues/emailWorker';

jest.mock('bullmq', () => {
    return {
        Worker: jest.fn().mockImplementation((name, processor) => ({
            name,
            processor,
            on: jest.fn()
        }))
    };
});

jest.mock('@/infrastructure/caching/redisClient', () => ({}));

describe('Email Worker', () => {
    it('should be initialized', () => {
        expect(emailWorker).toBeDefined();
        expect((emailWorker as any).name).toBe('email-queue');
    });
});
