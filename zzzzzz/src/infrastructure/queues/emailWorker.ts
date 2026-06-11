/* eslint-disable no-console */
import redisClient from '@/infrastructure/caching/redisClient';
import { Worker, Job } from 'bullmq';

export const emailWorker = new Worker(
  'email-queue',
  async (job: Job) => {
    console.log(`[Worker] Processing email job ${job.id} for data:`, job.data);

    // Simulate email sending delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log(`[Worker] Successfully processed email job ${job.id}`);
  },
  // @ts-expect-error: BullMQ and IORedis type mismatch
  { connection: redisClient.client }
);

emailWorker.on('failed', (job, err) => {
  console.error(`[Worker] Job ${job?.id} failed with error:`, err.message);
});
