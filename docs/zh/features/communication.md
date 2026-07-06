# 通信协议 (Communication Protocols)

`nodejs-quickstart-structure` 支持三种主要的通信协议，每种协议都针对不同的业务场景进行了高度优化。

## REST APIs (标准 REST)

由 **Express.js** 提供强力支持的标准 RESTful 接口体系。

-   **在线文档**：启动服务后，会自动在 `http://localhost:3000/api-docs` 挂载并渲染 Swagger UI。
-   **统一错误处理**：核心中间件机制提供标准 HTTP 状态码返回，拒绝脏数据输出。
-   **安全强化**：预配置了速率限制 (Rate-limiting) 中间件与 Helmet 安全响应头。

## GraphQL (现代 API)

由 **Apollo Server v4** 提供强力支持的强类型 API 查询语言。

-   **交互式沙箱**：集成 **Apollo Sandbox**，本地可通过 `http://localhost:3000/graphql` 直接进行调试。
-   **规范约束**：由强类型的 `typeDefs` 和 `resolvers` 驱动。
-   **架构整合**：与 MVC 控制器或整洁架构 (Clean Architecture) 用例完美整合。

## Kafka (事件驱动)

面向异步微服务、高并发吞吐的高性能消息通信协议。

-   **Kafka KRaft 模式**：摒弃复杂的 Zookeeper 外部依赖；在生成的 `docker-compose.yml` 中采用了现代化的 KRaft 极简架构。
-   **单例模式**：使用 **单例 Kafka 服务 (Singleton Kafka Service)** 以确保高弹性连接及优秀的运行性能。
-   **BaseConsumer 抽象类**：提供统一的抽象类，方便创建具有内置错误捕获及重试机制的自定义消费者 (Consumer)。
-   **纯 Worker 运行模式**：如果初始化时仅勾选了 Kafka，生成器将去除多余的 HTTP 路由，生成一个纯粹的任务消费微服务。

## 身份验证与授权鉴权

在所有的通信协议中，<VocabLink category="auth-security" term="authentication" text="身份验证" />及安全性均由生成的 **可插拔 JWT 系统** 统一接管：

- **REST**：基于中间件鉴权模式 (`authMiddleware.ts`)。
- **GraphQL**：基于 context 的全局注入鉴权以及 guarded resolvers 防护。
- **令牌管理**：支持 **Access/Refresh Token 双令牌轮转** 及通过 Redis 进行黑名单撤销。

*要深入了解身份安全体系的实现，请参阅 [身份验证 Blueprint](/zh/blueprints/authentication)。*
