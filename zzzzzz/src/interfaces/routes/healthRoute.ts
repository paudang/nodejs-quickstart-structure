import { Router, Request, Response } from 'express';
import logger from '@/infrastructure/log/logger';
import { HTTP_STATUS } from '@/utils/httpCodes';
import { ERROR_MESSAGES } from '@/utils/errorMessages';
import sequelize from '@/infrastructure/database/database';

import { emailQueue } from '@/infrastructure/queues/emailQueue';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const healthData: Record<string, unknown> = {
    status: 'UP',
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    database: 'disconnected',
    timestamp: Date.now()
  };
  logger.info('Health Check');

  try {
    await sequelize.authenticate();
    healthData.database = 'connected';
  } catch (err) {
    healthData.database = 'error';
    healthData.status = 'DOWN';
    logger.error(`${ERROR_MESSAGES.DATABASE_PING_FAILED}:`, err);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(healthData);
  }

  res.status(HTTP_STATUS.OK).json(healthData);
});

router.post('/test-job', async (req: Request, res: Response) => {
  await emailQueue.add('test-email', { msg: 'Hello from API' });
  res.status(HTTP_STATUS.OK).json({ message: 'Job enqueued. Check /admin/queues' });
});

export default router;
