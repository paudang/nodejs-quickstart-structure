# 快速入门

按照以下步骤启动并运行您的第一个服务。

## 前置条件

- **Node.js** (v18 或更高版本)
- **Docker & Docker Compose** (用于运行数据库、Redis 或 Kafka 等基础设施)

## 安装

您可以直接使用首选的包管理器运行生成器：

::: code-group

```bash [npm]
npx nodejs-quickstart-structure@latest init
```

```bash [pnpm]
pnpm dlx nodejs-quickstart-structure@latest init
```

```bash [yarn]
yarn dlx nodejs-quickstart-structure@latest init
```

:::

*或者进行全局安装：*

::: code-group

```bash [npm]
npm install -g nodejs-quickstart-structure
nodejs-quickstart init
```

```bash [pnpm]
pnpm add -g nodejs-quickstart-structure
nodejs-quickstart init
```

```bash [yarn]
yarn global add nodejs-quickstart-structure
nodejs-quickstart init
```

:::

## 快速启动 (交互式配置)

我们的生成器支持大厂应用的完整 **6阶段生命周期**，确保您的项目从第一天起就具备生产就绪的特性：

![Main Flow Diagram](/main-flow.png)

当您运行 `init` 命令时，系统会提示您配置此生命周期的各个环节：

1. **Project Name (项目名称)**: 服务目录的名称。
2. **Language (语言)**: 选择 **TypeScript** (推荐) 或 **JavaScript**。
3. **Architecture (架构)**: 选择 **MVC** 或 **清洁架构 (Clean Architecture)**。
4. **View Engine (模板引擎)**: 如果选择了 MVC，请选择 **None** (纯 API)、**EJS** 或 **Pug**。
5. **Communication (通信)**: 选择 **REST APIs**、**GraphQL** 或 **Kafka**。
6. **Database (数据库)**: 选择 **MySQL**、**PostgreSQL**、**MongoDB** 或 **None**。
7. **Database Name (数据库名)**: 指定数据库名称 (如果选择了数据库)。
8. **Caching (缓存)**: 添加 **Redis** 或 **内存缓存 (Memory Cache)**。
9. **Authentication (身份验证)**: 可插拔的 **JWT** 和 **(OAuth2 - Google/GitHub)** 支持。
10. **CI/CD**: 生成 **GitHub Actions**、**GitLab** 或 **Jenkins** 配置。
11. **Security Hardening (安全强化)**: 选择加入企业级安全工具，如 **Snyk** 和 **SonarQube** (如果启用了 CI/CD)。
12. **Advanced Options (高级选项)**: 解锁弹性、后台作业、可观测性 (ELK) 以及 Terraform。
13. **Resilience (弹性)**: 选择 **超时 (Timeout)**、**重试 (Retry)** 和 **熔断器 (Circuit Breaker)** 模式。
14. **Background Jobs (后台任务)**: 可选 **BullMQ** + **Bull-Board** 任务队列 (需要 Redis)。
15. **Terraform (IaC)**: 生成 AWS/GCP/Azure 基础设施文件 (**标准版** 或 **生产版**)。
16. **ELK Stack**: 可选的 **Elasticsearch & Kibana** 集中式日志集成。

## 首个项目设置

项目生成后，进入目录并安装依赖：

::: code-group

```bash [npm]
cd my-new-service
npm install
npm run prepare
```

```bash [pnpm]
cd my-new-service
pnpm install
pnpm prepare
```

```bash [yarn]
cd my-new-service
yarn install
yarn prepare
```

:::

### 启动基础设施
如果您选择了数据库、Redis 或 Kafka，请使用 Docker Compose 启动它们：

```bash
docker-compose up -d
```

### 运行应用
启动具有热重载功能的开发服务器：

::: code-group

```bash [npm]
npm run dev
```

```bash [pnpm]
pnpm dev
```

```bash [yarn]
yarn dev
```

:::
