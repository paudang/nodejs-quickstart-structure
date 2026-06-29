# 整洁架构 (Clean Architecture)

**整洁架构** (或称六边形架构 Hexagonal Architecture) 旨在将核心业务规则与外部基础设施及 UI 分离开来。这确保了核心领域逻辑独立于诸如 Express、Mongoose 或 Kafka 等外部框架。

## 目录结构

```text
src/
├── domain/                 # 核心业务实体 (Entities)
├── usecases/               # 应用特定的业务规则 (用例)
├── interfaces/             # 控制器、路由、GraphQL 解析器等 (适配器层)
├── infrastructure/         # 外部工具 (数据库、缓存、Kafka、Web服务器)
└── index.ts                # 应用程序入口
```

## 依赖关系层级

1. **Domain (领域层)**: 包含应用程序中通用的实体和业务逻辑。它对其他层有零依赖。
2. **Use Cases (用例层)**: 定义特定于应用的动作 (例如 `CreateUser`、`ProcessPayment`)。它与 **Domain** 交互并定义 **Repository 接口**。
3. **Interfaces (接口适配器层)**: 搭建外部世界 (HTTP、Kafka) 到 **Use Cases** 的桥梁。例如，REST 控制器将请求参数转化为对特定 **Use Case** 的调用。
4. **Infrastructure (基础设施层)**: 实现数据库的 Repository 接口，处理环境配置，并管理 Web 服务器生命周期。

## 为什么选择整洁架构？

- **框架无关**：您可以以极小的代价更换您的数据库或 Web 框架。
- **高测试性**：业务逻辑可以独立进行测试，无需为数据库或 Web 服务器提供 mock。
- **高可维护性**：清晰的职责分离使大型团队可以更轻松地协同开发系统的不同部分。
