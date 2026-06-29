# 测试指南 (单元测试 & E2E测试)

质量不是事后才考虑的。每个生成的项目都带有一个完整配置的测试套件。

## 单元测试 (Jest)

由 **Jest** 和 **ts-jest** (用于 TypeScript 项目) 提供强力支持。

- **位置**：所有单元测试都集中在 `tests/unit/` 目录中，镜像映射了 `src/` 的结构。
- **覆盖率阈值**：代码行和函数的覆盖率限制设置为 **70%**，以确保长期的可维护性。
- **基本命令**：
    - `npm test` (或 `pnpm`, `yarn`): 运行所有测试。
    - `npm run test:watch` (或 `pnpm`, `yarn`): 以 watch 模式运行测试。
    - `npm run test:coverage` (或 `pnpm`, `yarn`): 生成详细的测试覆盖率报告。

## 端到端 (E2E) 测试 (Supertest)

将整个系统视为黑盒进行测试，在真实 (或 mock) 环境中运行测试用例。

- **流**：使用 **Supertest** 向运行中的服务发起真实的 HTTP 请求。
- **基础设施**：E2E 测试目标为 Docker 容器集群，以确保网络和数据库连接正确无误。
- **隔离性**：使用专门的编排脚本 (`scripts/run-e2e.js`) 来管理测试容器的整个生命周期。
- **命令**：`npm run test:e2e` (或 `pnpm`, `yarn`)

## 模拟规范 (Mocking Standards)

- **数据库**：为 Mongoose/Sequelize 预配置的 Model 模拟。
- **消息队列**：包含用于模拟 **Kafka 单例服务 (Kafka Singleton Service)** 的逻辑，使您能够在没有活动 Kafka Broker 的情况下测试控制器。
