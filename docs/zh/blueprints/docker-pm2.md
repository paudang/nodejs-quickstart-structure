# Docker & PM2 部署指南

本指南概述了所生成项目的专业部署工作流程，涵盖使用 Docker 的容器化环境以及通过 PM2 进行的直接进程管理。

###  选择您的部署模式

| 模式 | 策略 | 最适合 | 为什么？ |
| :--- | :--- | :--- | :--- |
| Docker | 容器化 | CI/CD、云端、多云 | 环境一致性。 |
| PM2 | 进程管理 | VPS、物理服务器 | 最低系统开销，原生运行速度。 |

##  Docker 部署

该项目包含一个针对生产环境优化的 **多阶段 Dockerfile**。

### 1. 本地运行 (开发环境)
在本地运行 Node.js 应用程序，同时使用 Docker 运行基础设施 (数据库、Redis、Kafka 等)：

::: code-group
```bash [npm]
# 启动基础设施
docker-compose up -d db redis kafka

# 启动应用程序
npm run dev
```

```bash [pnpm]
# 启动基础设施
docker-compose up -d db redis kafka

# 启动应用程序
pnpm dev
```

```bash [yarn]
# 启动基础设施
docker-compose up -d db redis kafka

# 启动应用程序
yarn dev
```
:::

### 2. 在 Compose 基础设施下运行应用容器
如果您想在 Docker 容器内运行应用程序本身：

::: code-group
```bash [REST + MongoDB + Redis]
# 确保基础设施正在运行
docker-compose up -d

# 构建生产环境 Image
docker build -t your-app-name .

# 运行容器 (连接到 compose 网络)
docker run -p 3000:3000 --network your-app-name_default \
  -e DB_HOST=db \
  -e REDIS_HOST=redis \
  your-app-name
```

```bash [GraphQL + Redis + Kafka]
# 确保基础设施正在运行
docker-compose up -d

# 构建生产环境 Image
docker build -t your-app-name .

# 运行容器 (连接到 compose 网络)
docker run -p 3000:3000 --network your-app-name_default \
  -e REDIS_HOST=redis \
  -e KAFKA_BROKER=kafka:29092 \
  your-app-name
```

```bash [极简 (无数据库)]
# 构建生产环境 Image
docker build -t your-app-name .

# 运行容器
docker run -p 3000:3000 your-app-name
```

```bash [全栈 + ELK (可选)]
# 确保基础设施和 ELK 正在运行
docker-compose up -d db redis kafka
docker-compose -f docker-compose.elk.yml up -d

# 构建生产环境 Image
docker build -t your-app-name .

# 运行容器 (连接到 compose 网络)
docker run -p 3000:3000 --network your-app-name_default \
  -e DB_HOST=db \
  -e REDIS_HOST=redis \
  -e ELASTICSEARCH_URL=http://elasticsearch:9200 \
  your-app-name
```
:::

---

##  PM2 部署 (VPS/EC2)

项目已预先配置，可通过 **PM2** (使用 `ecosystem.config.js`) 直接部署到 VPS/EC2 实例。

### 1. 部署步骤

1.  **安装依赖**：
    ::: code-group
    ```bash [npm]
    npm install
    ```
    ```bash [pnpm]
    pnpm install
    ```
    ```bash [yarn]
    yarn install
    ```
    :::

2.  **启动基础设施 (后台服务)**：
    ```bash
    docker-compose up -d db redis kafka
    # 可选：启动 ELK 堆栈以进行集中日志记录
    docker-compose -f docker-compose.elk.yml up -d
    ```

3.  **等待 5-10 秒** 以便数据库完全初始化。

4.  **在集群模式下使用 PM2 部署应用**：
    **对于 TypeScript 项目：**
    ::: code-group
    ```bash [npm]
    # 构建项目并部署
    npm run build
    npm run deploy
    ```
    ```bash [pnpm]
    pnpm build
    pnpm deploy
    ```
    ```bash [yarn]
    yarn build
    yarn deploy
    ```
    :::
    
    **对于 JavaScript 项目：**
    ::: code-group
    ```bash [npm]
    # 直接部署
    npm run deploy
    ```
    ```bash [pnpm]
    pnpm deploy
    ```
    ```bash [yarn]
    yarn deploy
    ```
    :::

### 2. 进程管理

| 命令 | 操作 |
| :--- | :--- |
| `npx pm2 logs` | 查看实时应用程序日志 |
| `npx pm2 status` | 检查应用程序状态 |
| `npx pm2 stop all` | 停止所有进程 |
| `npx pm2 delete your-app-name` | 从 PM2 中移除应用程序 |

::: warning 收尾工作
关闭时，请记住停止基础设施：
```bash
docker-compose down
# 可选：停止 ELK 堆栈
docker-compose -f docker-compose.elk.yml down
```
:::