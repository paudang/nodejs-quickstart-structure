# 生产部署 (Docker & PM2)

`nodejs-quickstart-structure` 确保您的应用程序可以无缝部署到任何现代云端或物理基础设施中。

## Docker 部署 (云原生)

我们使用 **多阶段 Dockerfile** 来最小化构建产物的体积并最大化容器的运行安全性。

### 构建镜像 (Build)
```bash
docker build -t my-microservice .
```

### 与基础设施一同运行
在后台同时拉起整个服务栈 (数据库、缓存等) 以及应用容器：
```bash
docker-compose up --build
```

### 生产环境优化特性
- **非 Root 用户**：应用程序安全地运行在容器内内置的 `node` 用户下。
- **日志净化**：在构建阶段静默不必要的 npm 升级提示，确保 CI 日志清晰整洁。

## PM2 部署 (VPS/EC2)

如果您倾向于将应用直接部署到云主机 VPS/EC2 实例上，我们开箱即用地提供了 **PM2** 的原生支持。

- **Ecosystem.config.js**：自动在项目根目录生成对应的 PM2 配置文件。
- **集群模式 (Cluster Mode)**：预配置以多实例集群模式运行应用，最大程度保证高可用性。
- **运行命令**：
    - `npm run deploy` (或 `pnpm`, `yarn`): 使用 PM2 在后台部署并启动应用。
    - `npx pm2 status`: 查看应用的当前运行状态列表。
    - `npx pm2 logs`: 实时滚动查看应用的输出日志。

## CI/CD 集成

我们为您的集成流水线提供了开箱即用的配置文件：
- **GitHub Actions**: `.github/workflows/ci.yml`
- **GitLab CI**: `.gitlab-ci.yml`
- **Jenkins**: `Jenkinsfile`

这些 CI 流水线会自动在每次部署或推送代码前执行 Lint 规范扫描、单元测试以及端到端 (E2E) 测试。
