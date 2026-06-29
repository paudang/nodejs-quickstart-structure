# 本地开发指南

本指南提供了本地启动和运行生成项目的“最佳实践”。每个配置都与生成的 `README.md` 中的说明相匹配。

::: tip 前置条件
开始之前，请确保已安装以下软件：
- **Node.js (v18+)**
- **Docker & Docker Compose** (用于运行数据库、Redis 和 Kafka 等基础设施)
:::

## 7步开发流程

为了确保您的微服务生产就绪，请遵循以下标准步骤：

| 步骤 | 目标 | 命令 | 为什么？ |
| :--- | :--- | :--- | :--- |
| **步骤 1** | **初始化 Git** | `git init` | 启用 Husky 钩子和安全门禁。 |
| **步骤 2** | **安装依赖** | `npm install` (或 `pnpm`, `yarn`) | 下载核心项目依赖。 |
| **步骤 3** | **设置环境变量** | `cp .env.example .env` | 配置本地环境变量。 |
| **步骤 4** | **启动基础设施** | `docker-compose up -d` | 在后台启动数据库、Redis 和 Kafka。 |
| **步骤 5** | **运行开发服务** | `npm run dev` (或 `pnpm`, `yarn`) | 在热重载模式下启动应用。 |
| **步骤 6** | **质量门禁** | `npm test` | 验证代码质量并运行单元测试。 |
| **步骤 7** | **部署项目** | `npm run deploy` | 通过 PM2/集群模式构建并部署。 |

---

## 详细步骤

### 1. 环境变量配置
复制示例环境变量文件并调整值：
```bash
cp .env.example .env
```

### 2. 基础设施和应用启动
选择与您生成的项目匹配的基础设施设置：

### 全栈 (数据库 + Redis + Kafka)

::: code-group
```bash [npm]
# 初始化仓库
git init && npm install

# 启动所有基础设施
docker-compose up -d db redis kafka

# 启动应用程序
npm run dev
```

```bash [pnpm]
git init && pnpm install
docker-compose up -d db redis kafka
pnpm dev
```

```bash [yarn]
git init && yarn install
docker-compose up -d db redis kafka
yarn dev
```
:::

### 全栈 + ELK (可选)

::: code-group
```bash [npm]
git init && npm install
docker-compose up -d db redis kafka
docker-compose -f docker-compose.elk.yml up -d
npm run dev
```

```bash [pnpm]
git init && pnpm install
docker-compose up -d db redis kafka
docker-compose -f docker-compose.elk.yml up -d
pnpm dev
```

```bash [yarn]
git init && yarn install
docker-compose up -d db redis kafka
docker-compose -f docker-compose.elk.yml up -d
yarn dev
```
:::

### REST + MongoDB

::: code-group
```bash [npm]
git init && npm install
docker-compose up -d db
npm run dev
```

```bash [pnpm]
git init && pnpm install
docker-compose up -d db
pnpm dev
```

```bash [yarn]
git init && yarn install
docker-compose up -d db
yarn dev
```
:::

### GraphQL + Redis

::: code-group
```bash [npm]
git init && npm install
docker-compose up -d db redis
npm run dev
```

```bash [pnpm]
git init && pnpm install
docker-compose up -d db redis
pnpm dev
```

```bash [yarn]
git init && yarn install
docker-compose up -d db redis
yarn dev
```
:::

### 极简 (无数据库)

::: code-group
```bash [npm]
git init && npm install
npm run dev
```

```bash [pnpm]
git init && pnpm install
pnpm dev
```

```bash [yarn]
git init && yarn install
yarn dev
```
:::

::: info 提示
运行 `docker-compose up -d` 而不指定服务将启动 `docker-compose.yml` 中定义的所有基础设施。
:::