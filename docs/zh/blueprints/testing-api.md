# 测试与 API 实战指南

本指南涵盖了测试应用程序以及与其通信层 (REST、GraphQL 和 Kafka) 进行交互的标准方法。

## 代码质量与标准

生成的项目中包含预配置的代码规范与自动化测试工具。

### 1. 代码规范与格式化 (Linting & Formatting)
确保您的代码符合项目标准：
::: code-group
```bash [npm]
# 代码规范检查
npm run lint

# 自动格式化
npm run format
```

```bash [pnpm]
# 代码规范检查
pnpm lint

# 自动格式化
pnpm format
```

```bash [yarn]
# 代码规范检查
yarn lint

# 自动格式化
yarn format
```
:::

### 2. 单元与集成测试
通过自动化测试套件确保应用的高可靠性：
::: code-group
```bash [npm]
# 运行所有测试
npm test

# 运行测试并生成覆盖率报告
npm run test:coverage
```

```bash [pnpm]
# 运行所有测试
pnpm test

# 运行测试并生成覆盖率报告
pnpm test:coverage
```

```bash [yarn]
# 运行所有测试
yarn test

# 运行测试并生成覆盖率报告
yarn test:coverage
```
:::

---

## API 交互

根据您的配置，您的微服务提供了用于浏览和测试 API 的交互式文档。请在下方选择您的配置方案：

::: code-group
```bash [REST API (Swagger)]
# 地址: http://localhost:3000/api-docs

# 标准 API 端点:
- GET /api/users: 获取用户列表。
- POST /api/users: 创建新用户。
- PATCH /api/users/:id: 部分更新用户信息。
- DELETE /api/users/:id: 删除用户 (软删除)。
```

```graphql [GraphQL API (Apollo)]
# 地址: http://localhost:3000/graphql

# 查询示例 (获取用户):
query GetAllUsers {
  getAllUsers {
    id
    name
    email
  }
}

# 变更示例 (创建用户):
mutation CreateUser {
  createUser(name: "John Doe", email: "john@example.com") {
    id
    name
    email
  }
}
```

```bash [Kafka 流程]
# 1. 确保 Kafka 容器已启动
docker-compose up -d kafka

# 2. 启动应用程序
npm run dev (或使用 pnpm / yarn)

# 3. 发送请求触发事件 (使用 Postman 或 curl)
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Kafka Tester", "email": "kafka@example.com"}'

# 4. 观察控制台日志输出:
[Kafka] Producer: Sent USER_CREATED event for 'kafka@example.com'
[Kafka] Consumer: Received USER_CREATED. 
[Kafka] Consumer: Sending welcome email to 'kafka@example.com'... Done!
```

```bash [后台作业监控看板]
# 地址: http://localhost:3000/admin/queues

# 由 Bull-Board 提供，该交互式 UI 允许您：
- 监控活动、延迟和已完成的后台任务。
- 手动重试失败的后台任务。
- 暂停或恢复队列通道。
```
:::

## Kafka 异步事件流

在使用 **Kafka** 时，项目遵循非阻塞的事件驱动模式：

1. **触发 (Trigger)**：用户发送 HTTP 请求 (例如 `POST /api/users`)。
2. **生产 (Produce)**：API 立即向 **Kafka Broker** 发送 `USER_CREATED` 事件，并向用户返回成功。
3. **消费 (Consume)**：**发信工作器 (Consumer)** 从 Kafka 频道中订阅并拉取此事件。
4. **执行 (Execute)**：工作器在后台异步执行邮件发送等耗时操作。

---

## 后台作业 (BullMQ)

在使用 **后台作业** 时，项目实现了一个基于 Redis 的强韧任务队列系统：

1. **队列 (Queue)**：通过 API 端点或内部服务将任务添加到队列 (例如 `emailQueue`) 中。
2. **执行器 (Worker)**：后台工作进程异步处理这些任务，以确保主事件循环不被阻塞。
3. **监控 (Monitoring)**：访问 `http://localhost:3000/admin/queues` 即可进入 **Bull-Board 监控看板**，查看作业状态并重试失败的任务。

---

### 验证步骤：
1. **投递事件**：向 `http://localhost:3000/api/users` 发送 POST 请求。
2. **验证日志**：观察控制台是否输出 `[Kafka] Producer: Sent USER_CREATED event`。
3. **确认执行**：检查 `[Kafka] Consumer: Received USER_CREATED` 的消费日志。

## 下一步

如果您启用了身份验证，请查阅 [身份验证指南](/blueprints/authentication) 了解如何保护您的 API 端点并完成身份请求鉴权。
