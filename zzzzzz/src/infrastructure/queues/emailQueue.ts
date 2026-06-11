import redisClient from '@/infrastructure/caching/redisClient';
import { Queue } from 'bullmq';

// @ts-expect-error: BullMQ and IORedis type mismatch
export const emailQueue = new Queue('email-queue', { connection: redisClient.client });
