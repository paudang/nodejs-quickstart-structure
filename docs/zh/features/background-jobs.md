# 后台作业与任务队列 (BullMQ)

Node.js Quickstart Generator 提供了对**企业级<VocabLink category="backend-apis" term="background-job" text="后台任务" />**的内置开箱即用支持，这得益于 `BullMQ` 和 `Redis` 的结合。它会自动为您的项目搭建任务队列、任务执行器 (Workers) 以及直观的监控看板 (`Bull-Board`)，确保您的微服务架构处于松耦合且具备极高的水平扩展性。


## 为什么需要后台任务？
在 Node.js 中同步执行耗时较长的操作会阻塞单线程的事件循环 (Event Loop)，导致应用吞吐量急剧下降。

**常见应用场景：**
- 发送邮件 / 手机验证码通知
- 处理或压缩音视频、图像
- 生成大体积的 PDF/Excel 数据报表
- 对接具有频次限制 (rate-limited) 的第三方 API 接口

## 生成的架构

当您在创建时启用了后台任务时，生成器将会在 `src/utils/queues` (MVC) 或 `src/infrastructure/queues` (清洁架构) 下生成如下代码：

- `emailQueue.ts`：定义与 Redis 的连接配置及队列实例。
- `emailWorker.ts`：在后台异步监听并消费队列任务的执行器。
- `queueBoard.ts`：自动配置并初始化 `@bull-board/express` 看板，暴露监控 UI 路由。

### 架构流程图

![Background Jobs Flow Diagram](/backgound-job.png)

## 使用指南

### 1. 投递任务 (Enqueue)
您可以在您的控制器 (Controllers) 或用例 (Use Cases) 中投递任务到后台队列：
::: code-group

```typescript [TypeScript]
import { emailQueue } from '@/utils/queues/emailQueue';

// 示例: POST /api/health/test-job
export const sendWelcomeEmail = async (req: unknown, res: unknown) => {
  const { email } = req.body;
  
  // 投递任务到后台队列
  await emailQueue.add('send-welcome-email', { email, template: 'welcome' });
  
  res.status(200).json({ message: '邮件已加入投递队列' });
};
```

```javascript [JavaScript]
import { emailQueue } from '../utils/queues/emailQueue.js';

// 示例: POST /api/health/test-job
export const sendWelcomeEmail = async (req, res) => {
  const { email } = req.body;
  
  // 投递任务到后台队列
  await emailQueue.add('send-welcome-email', { email, template: 'welcome' });
  
  res.status(200).json({ message: '邮件已加入投递队列' });
};
```

:::

### 2. 消费任务 (Process)
编辑 `emailWorker.ts` 来编写您的真实消费逻辑 (如使用 NodeMailer/SendGrid 等)：
::: code-group

```typescript [TypeScript]
import { Worker, Job } from 'bullmq';
import redisClient from '@/config/redisClient';

export const emailWorker = new Worker(
  'email-queue',
  async (job: Job) => {
    // 编写您的发信逻辑
    console.log(`正在为以下地址发送邮件: ${job.data.email}`);
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
    // 编写您的发信逻辑
    console.log(`正在为以下地址发送邮件: ${job.data.email}`);
  },
  { connection: redisClient }
);
```

:::

### 3. 使用 Bull-Board 进行任务监控
启动应用，然后导航至：
```
http://localhost:<PORT>/admin/queues
```
在这里，您可以可视化的查看等待中 (active)、延迟 (delayed)、失败 (failed) 以及已成功 (completed) 的全部队列任务。

> [!TIP] 提示
> **生产环境下保护监控看板**：
> 请务必在生产环境下为 `/admin/queues` 路由添加严格的鉴权中间件，避免监控面板被未经授权的外网用户直接访问。

> [!WARNING] 警告
> **开发避坑指南**：
> 1. **Redis OOM (内存溢出)**：BullMQ 默认会永久存储任务日志。往队列添加任务时，**务必**带上参数配置 `{ removeOnComplete: true, removeOnFail: 1000 }` 避免 Redis 内存爆掉。
> 2. **重复任务执行 (幂等性)**：如果事件循环被重度阻塞，BullMQ 可能会判定当前 Worker 已死而将任务重新分配给其他 Worker 运行。确保您的任务符合 **幂等性** (即同一条任务被多次执行不会产生脏数据，例如避免重复向用户发送多封相同邮件)。
> 
> *要了解关于队列问题排查的更多信息，请查阅我们的 [排错指南](../guide/troubleshooting.md)。*
