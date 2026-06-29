# MVC 架构

**Model-View-Controller (MVC)** 架构是大多数 Web 应用程序和 API 的默认选择。它在数据、业务逻辑和展示层之间提供了清晰的分离。

## 目录结构

```text
src/
├── config/         # 数据库、Redis 等配置
├── controllers/    # 请求处理程序 (核心逻辑所在)
├── models/         # 数据 Schema 和 Model 定义
├── routes/         # API 路由端点定义
├── utils/          # 中间件和通用工具
└── index.ts        # 应用入口文件
```

## 工作原理

1. **Routes (路由)**: 捕获传入的请求并将其委派给相应的 **Controller**。
2. **Controllers (控制器)**: 包含核心业务逻辑。它们与 **Models** 交互以获取或保存数据，然后发送响应。
3. **Models (模型)**: 代表数据结构 (Mongoose, Sequelize 或 TypeORM)。
4. **错误处理**: 控制器将错误传递给 `next(error)` 函数，由全局错误中间件进行集中处理。

## 使用场景

- 标准 REST API。
- 中小型微服务。
- 服务端渲染 (SSR) 的 Web 应用程序 (使用 EJS 或 Pug)。
