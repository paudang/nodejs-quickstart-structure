# Background Jobs & Task Queues (BullMQ)

The Node.js Quickstart Generator provides built-in, out-of-the-box support for **Enterprise <VocabLink category="backend-apis" term="background-job" text="Background Jobs" />** utilizing `BullMQ` and `Redis`. It automatically provisions queues, workers, and a monitoring dashboard (`Bull-Board`) into your project, keeping your architecture decoupled and highly scalable.


## Why Background Jobs?
Handling long-running tasks synchronously blocks the Node.js Event Loop, drastically reducing application throughput.

**Common Use Cases:**
- Sending Emails / Notifications
- Processing Videos or Images
- Generating PDF Reports
- Interacting with rate-limited Third-Party APIs

## Generated Architecture
If you enable Background Jobs (`--background-jobs`), the generator scaffolds the following structure into your `src/utils/queues` (MVC) or `src/infrastructure/queues` (Clean Architecture):

- `emailQueue.ts`: Defines the connection to Redis and the Queue instance.
- `emailWorker.ts`: A consumer that listens to the queue and processes jobs asynchronously.
- `queueBoard.ts`: Automatically sets up `@bull-board/express`, exposing a UI to view job status.

### Architecture Flow

![Background Jobs Flow Diagram](/backgound-job.png)

## Usage Guide

### 1. Enqueue a Job
You can enqueue jobs from your Controllers or Use Cases:
::: code-group

```typescript [TypeScript]
import { emailQueue } from '@/utils/queues/emailQueue';

// Example: POST /api/health/test-job (Dummy test endpoint)
export const sendWelcomeEmail = async (req: unknown, res: unknown) => {
  const { email } = req.body;
  
  // Enqueue job to background queue
  await emailQueue.add('send-welcome-email', { email, template: 'welcome' });
  
  res.status(200).json({ message: 'Email scheduled for delivery' });
};
```

```javascript [JavaScript]
import { emailQueue } from '../utils/queues/emailQueue.js';

// Example: POST /api/health/test-job (Dummy test endpoint)
export const sendWelcomeEmail = async (req, res) => {
  const { email } = req.body;
  
  // Enqueue job to background queue
  await emailQueue.add('send-welcome-email', { email, template: 'welcome' });
  
  res.status(200).json({ message: 'Email scheduled for delivery' });
};
```

:::

### 2. Process the Job
Modify the `emailWorker.ts` file to add your actual business logic:
::: code-group

```typescript [TypeScript]
import { Worker, Job } from 'bullmq';
import redisClient from '@/config/redisClient';

export const emailWorker = new Worker(
  'email-queue',
  async (job: Job) => {
    // Implement your sending logic here (e.g. NodeMailer, SendGrid)
    console.log(`Processing email for: ${job.data.email}`);
  },
  { connection: redisClient }
);
```

```javascript [JavaScript]
import { Worker } from 'bullmq';
import redisClient from '../../config/redisClient.js';

export const emailWorker = new Worker(
  'email-queue',
  async (job) => {
    // Implement your sending logic here (e.g. NodeMailer, SendGrid)
    console.log(`Processing email for: ${job.data.email}`);
  },
  { connection: redisClient }
);
```

:::

### 3. Monitor Jobs via Bull-Board
Start your application and navigate to:
```
http://localhost:<PORT>/admin/queues
```
Here, you can monitor active, delayed, failed, and completed jobs visually.

> [!TIP]
> **Securing Bull-Board in Production**:
> Make sure to secure the `/admin/queues` route with Authentication middleware in production to prevent unauthorized access.

> [!WARNING]
> **Common Pitfalls & Resolutions**:
> 1. **Redis OOM (Out of Memory)**: By default, BullMQ stores all completed/failed jobs forever. **Always** set `{ removeOnComplete: true, removeOnFail: 1000 }` when adding jobs to prevent Redis from running out of memory.
> 2. **Duplicate Jobs**: If your event loop is heavily blocked, BullMQ may think your worker has stalled and will re-assign the job to another worker. Ensure your background tasks are **Idempotent** (can safely be run multiple times) to avoid double-processing (e.g., sending the same email twice).
> 
> *For more details on resolving Queue-related errors, check our [Troubleshooting Guide](../guide/troubleshooting.md).*
