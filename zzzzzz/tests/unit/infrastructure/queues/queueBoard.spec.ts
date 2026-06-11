import serverAdapter from '@/infrastructure/queues/queueBoard';

jest.mock('@bull-board/api', () => ({
    createBullBoard: jest.fn()
}));
jest.mock('@bull-board/api/bullMQAdapter', () => ({
    BullMQAdapter: jest.fn()
}));
jest.mock('@bull-board/express', () => ({
    ExpressAdapter: jest.fn().mockImplementation(() => ({
        setBasePath: jest.fn(),
        getRouter: jest.fn().mockReturnValue({})
    }))
}));

jest.mock('@/infrastructure/queues/emailQueue', () => ({ emailQueue: {} }));
jest.mock('@/infrastructure/queues/emailWorker', () => ({}));

describe('Queue Board Adapter', () => {
    it('should initialize and export serverAdapter', () => {
        expect(serverAdapter).toBeDefined();
    });
});
