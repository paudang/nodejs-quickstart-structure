import { Server } from 'http';
import logger from '@/infrastructure/log/logger';
import sequelize from '@/infrastructure/database/database';
import redisService from '@/infrastructure/caching/redisClient';

export const setupGracefulShutdown = (server: Server) => {
    const gracefulShutdown = async (signal: string) => {
        logger.info(`Received ${signal}. Shutting down gracefully...`);
        server.close(async (err: Error | undefined) => {
            if (err) {
                logger.error('Error closing HTTP server:', err);
                process.exit(1);
            }
            logger.info('HTTP server closed.');
            try {
                await sequelize.close();
                logger.info('Database connection closed.');
                await redisService.quit();
                logger.info('Redis connection closed.');
                logger.info('Graceful shutdown fully completed.');
                process.exit(0);
            } catch (err) {
                logger.error('Error during shutdown:', err);
                process.exit(1);
            }
        });

        setTimeout(() => {
            logger.error('Could not close connections in time, forcefully shutting down');
            process.exit(1);
        }, 15000);
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
};
