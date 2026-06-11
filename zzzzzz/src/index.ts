import { env } from '@/config/env';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import logger from '@/infrastructure/log/logger';
import morgan from 'morgan';
import { errorMiddleware } from '@/utils/errorMiddleware';
import { setupGracefulShutdown } from '@/utils/gracefulShutdown';
import healthRoutes from '@/interfaces/routes/healthRoute';

import queueBoard from '@/infrastructure/queues/queueBoard';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express4';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { unwrapResolverError } from '@apollo/server/errors';
import { ApiError } from '@/errors/ApiError';
import { typeDefs, resolvers } from '@/interfaces/graphql';
import { gqlContext, MyContext } from '@/interfaces/graphql/context';

const app = express();
const port = env.PORT;

// Security Middleware
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: {
    directives: {
      imgSrc: [`'self'`, 'data:', 'apollo-server-landing-page.cdn.apollographql.com'],
      scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
      manifestSrc: [`'self'`, 'apollo-server-landing-page.cdn.apollographql.com'],
      frameSrc: [`'self'`, 'sandbox.embed.apollographql.com'],
    },
  },
}));
app.use(hpp());
app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE'] }));
const limiter = rateLimit({ windowMs: 10 * 60 * 1000, max: 100 });
app.use(limiter);

app.use(cookieParser());
app.use(express.json());
app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }));

// Background Jobs Dashboard
app.use('/admin/queues', queueBoard.getRouter());

app.use('/health', healthRoutes);

// Start Server Logic
const startServer = async () => {
    // GraphQL Setup
    const apolloServer = new ApolloServer<MyContext>({
      typeDefs,
      resolvers,
      plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
      formatError: (formattedError, error) => {
        const originalError = unwrapResolverError(error);
        if (originalError instanceof ApiError) {
          return {
            ...formattedError,
            message: originalError.message,
            extensions: {
              ...formattedError.extensions,
              code: originalError.statusCode.toString(),
            }
          };
        }

        logger.error(`GraphQL Error: ${formattedError.message}`);
        if (originalError instanceof Error && originalError.stack && process.env.NODE_ENV === 'development') {
           logger.error(originalError.stack);
        }
        return formattedError;
      },
    });
    await apolloServer.start();
    app.use('/graphql', expressMiddleware(apolloServer, { context: gqlContext }));
    app.use(errorMiddleware);
    const server = app.listen(port, () => {
        logger.info(`Server running on port ${port}`);
    });

    setupGracefulShutdown(server);
};

// Database Sync
import sequelize from '@/infrastructure/database/database';

const syncDatabase = async () => {
    let retries = 30;
    while (retries) {
        try {
            await sequelize.sync();
            logger.info('Database synced');
            await startServer();
            break;
        } catch (error) {
            logger.error('Error syncing database:', error);
            retries -= 1;
            logger.info(`Retries left: ${retries}`);
            await new Promise(res => setTimeout(res, 5000));
        }
    }
};

syncDatabase();
