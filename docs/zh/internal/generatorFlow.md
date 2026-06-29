# 生成器运行流程 (Generator Flow)

本文件描述了 `nodejs-quickstart-structure` 生成器如何处理不同的配置流程以及所生成的目录结构。

## 生成阶段

生成器遵循三阶段的工作流程：
1. **收集输入**：通过 CLI 提示用户选择各种配置 (架构、语言、通信协议、数据库等)。
2. **模板编译**：根据用户的配置，使用 EJS 渲染相应的代码模板。
3. **资源处理**：拷贝静态文件，初始化 Git，挂载 Husky 并根据要求安装依赖包。

---

## 各场景目录结构图

### 场景 A：MVC (REST API)
标准 Web API 的传统架构。

```text
project-name/
├── src/
│   ├── config/         # 数据库、Redis、Swagger 等配置
│   ├── controllers/    # 请求处理器 (使用 next(error))
│   ├── errors/         # 自定义异常类: ApiError, NotFoundError...
│   ├── models/         # 数据库 Schema 和 Model
│   ├── routes/         # Express 路由声明
│   ├── utils/
│   │   ├── errorMiddleware.{ts|js}  # 全局异常处理器
│   │   ├── logger.{ts|js}
│   │   └── httpCodes.{ts|js}
│   └── index.js|ts     # 应用入口 (最后注册 errorMiddleware)
├── tests/              # Jest 测试用例
├── package.json
├── Dockerfile
└── docker-compose.yml
```

### 场景 A2：MVC (GraphQL)
Apollo Server v4 作为中间件挂载在 Express 上。

```text
project-name/
├── src/
│   ├── config/         # 数据库、Redis 配置
│   ├── controllers/    # GraphQL 解析器背后的业务逻辑 (抛出异常)
│   ├── errors/         # ApiError, NotFoundError...
│   ├── graphql/
│   │   ├── schema/     # typeDefs 定义
│   │   └── resolvers/  # Resolvers 接收器 (调用 controllers, 抛出异常)
│   ├── models/
│   ├── utils/
│   │   ├── errorMiddleware.{ts|js}  # Express 级别的后备异常处理器
│   │   └── logger.{ts|js}
│   └── index.js|ts     # 启动 Apollo Server + 配置 formatError
└── ...
```

### 场景 B：MVC (带 View 视图的 Web 应用)
包含在服务器端动态渲染的前端视图。

```text
project-name/
├── public/             # 静态 CSS, JS, 图像文件
├── src/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── views/          # EJS 或 Pug 模板
│   └── index.js|ts
└── ...
```

### 场景 C：整洁架构 (REST API)
Domain, Use Cases, 和 Infrastructure 的清晰职责分离。

```text
project-name/
├── src/
│   ├── domain/                 # 核心实体 (企业级规则)
│   ├── errors/                 # 异常类 ApiError, NotFoundError...
│   ├── usecases/               # 应用业务用例逻辑
│   ├── interfaces/             # 接口适配层
│   │   ├── controllers/        # 使用 next(error) 进行异常传递
│   │   └── routes/             # 在处理器中传递 NextFunction
│   ├── infrastructure/         # 外部框架和驱动程序
│   │   ├── config/             # 环境变量配置
│   │   ├── caching/            # Redis 客户端
│   │   ├── database/           # 数据库连接和 models 定义
│   │   ├── repositories/       # 数据访问层具体实现
│   │   └── webserver/
│   │       ├── middleware/
│   │       │   └── errorMiddleware.js  # Express 异常处理器 (仅在 JS 环境下)
│   │       └── server.js       # 初始化 Express
│   ├── utils/
│   │   └── errorMiddleware.ts  # 全局异常处理器 (在 TS 环境下)
│   └── index.js|ts              # 应用启动并注册异常中间件
└── ...
```

### 场景 D：整洁架构 (Kafka 消费者微服务)
专为事件驱动的微服务进行优化。去除了所有 HTTP 路由和 Web 服务器。

```text
project-name/
├── src/
│   ├── domain/
│   ├── usecases/
│   ├── infrastructure/
│   │   ├── config/             # 包含 Kafka 连接配置
│   │   ├── database/
│   │   ├── messaging/          # 实例化 Kafka 客户端与消费者
│   │   ├── repositories/
│   │   └── webserver/          # (极简/可选配置)
│   └── index.js|ts
└── ...
```