import { setupGracefulShutdown } from '@/utils/gracefulShutdown';
import { Server } from 'http';
import sequelize from '@/infrastructure/database/database';
import redisService from '@/infrastructure/caching/redisClient';

jest.mock('@/infrastructure/database/database', () => {
    return {
        __esModule: true,
        default: {
            close: jest.fn().mockResolvedValue(true)
        }
    };
});

jest.mock('@/infrastructure/caching/redisClient', () => {
    return {
        __esModule: true,
        default: {
            quit: jest.fn().mockResolvedValue(true)
        }
    };
});

const flushPromises = () => new Promise((resolve) => setImmediate(resolve));

describe('Graceful Shutdown', () => {
    let mockServer: Partial<Server>;
    let mockExit: jest.SpyInstance;
    let processListeners: Record<string, (...args: any[]) => void>;

    beforeEach(() => {
        jest.useFakeTimers({ legacyFakeTimers: true });
        jest.clearAllMocks();
        processListeners = {};

        mockServer = {
            close: jest.fn().mockImplementation((cb?: (err?: Error) => void) => {
                if (cb) Promise.resolve().then(() => cb());
                return mockServer;
            })
        };

        mockExit = jest.spyOn(process, 'exit').mockImplementation((() => {}) as any);
        jest.spyOn(process, 'on').mockImplementation(((event: string, handler: (...args: any[]) => void) => {
            processListeners[event] = handler;
            return process;
        }) as any);
    });

    afterEach(() => {
        jest.restoreAllMocks();
        jest.useRealTimers();
    });

    it('should register SIGTERM and SIGINT events', () => {
        setupGracefulShutdown(mockServer as Server);
        expect(processListeners['SIGTERM']).toBeDefined();
        expect(processListeners['SIGINT']).toBeDefined();
    });

    it('should cleanly shutdown all connections and exit 0 on SIGTERM', async () => {
        setupGracefulShutdown(mockServer as Server);

        processListeners['SIGTERM']();

        // Flush microtask queue multiple times for nested async operations
        await flushPromises();
        await flushPromises();
        await flushPromises();

        expect(mockServer.close).toHaveBeenCalled();

        expect(sequelize.close).toHaveBeenCalled();

        expect(redisService.quit).toHaveBeenCalled();

        expect(mockExit).toHaveBeenCalledWith(0);
    });

    it('should exit 0 on SIGINT', async () => {
        setupGracefulShutdown(mockServer as Server);
        processListeners['SIGINT']();
        await flushPromises();
        await flushPromises();
        expect(mockExit).toHaveBeenCalledWith(0);
    });

    it('should handle errors during shutdown and exit 1', async () => {
        (sequelize.close as jest.Mock).mockRejectedValueOnce(new Error('Shutdown Error'));

        setupGracefulShutdown(mockServer as Server);
        processListeners['SIGTERM']();

        await flushPromises();
        await flushPromises();
        await flushPromises();

        expect(mockExit).toHaveBeenCalledWith(1);
    });

    it('should handle server close errors', async () => {
        const serverError = new Error('Server Close Error');
        mockServer.close = jest.fn().mockImplementation((cb?: (err?: Error) => void) => {
            if (cb) Promise.resolve().then(() => cb(serverError));
            return mockServer;
        });

        setupGracefulShutdown(mockServer as Server);
        processListeners['SIGTERM']();

        await flushPromises();
        // Since it's inside server.close callback, we need to wait
        await flushPromises();

        expect(mockExit).toHaveBeenCalledWith(1);
    });

    it('should forcefully shutdown if cleanup takes too long', async () => {
        setupGracefulShutdown(mockServer as Server);
        processListeners['SIGTERM']();

        jest.advanceTimersByTime(15000);

        expect(mockExit).toHaveBeenCalledWith(1);
    });
});
