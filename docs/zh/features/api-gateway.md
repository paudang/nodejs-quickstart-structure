# 可选 API 网关集成

**Node.js Quickstart Generator** 支持在您的 Node.js 应用程序前无缝注入一个安全加固的 **API 网关**，以处理入口流量、限流（rate limiting）和安全规则。

## 概述
当您启用 **Advanced Options**（高级选项）且您的 API 类型为 REST 或 GraphQL 时，您可以选择将微服务部署在企业级 API 网关之后。我们开箱即用地支持两种顶级解决方案：

- **Nginx**：作为反向代理的高性能 Web 服务器，预配置了严格的安全标头和限流功能。
- **Kong (DB-less)**：在声明式（无状态）模式下配置的强大 API 网关，利用插件实现限流和密钥认证 (Key Authentication)。

## 架构设计

当选择 API 网关时，生成器会输出一个专用的 `deploy/gateway/` 目录，其中包含网关配置文件。

```text
project-root/
├── src/
├── docker-compose.yml
└── deploy/
    └── gateway/
        ├── nginx.conf (或 kong.yml)
        └── docker-compose.nginx.yml (或 docker-compose.kong.yml)
```

## 支持的网关

### 1. Nginx
Nginx 充当快速且安全的反向代理。我们的安全蓝图包括：
- **限流 (Rate Limiting)**：开箱即用地限制暴力破解尝试 (`10r/s`)。
- **安全标头 (Security Headers)**：注入 `X-Frame-Options`、`Content-Security-Policy` 等等以保护您的下游 Node.js 应用。
- **代理传递 (Proxy Pass)**：将流量透明地转发到 `app:3000` 内部网络别名。

### 2. Kong (DB-less)
Kong 在无数据库 (DB-less) 模式下使用声明式的 `kong.yml` 文件，消除了对外部 PostgreSQL 数据库的需求。
- **Rate-Limiting 插件**：执行流量控制策略。
- **Key-Auth 插件**：使用 `apikey` 验证保护路由，要求消费者传递有效的密钥。

## 部署说明

使用 API 网关部署您的应用程序：

1. 启动 Node.js 应用程序及其基础设施（在项目根目录下）：
   ```bash
   docker-compose up -d
   ```
2. 导航到网关目录：
   ```bash
   cd deploy/gateway
   ```
3. 启动网关容器：
   ```bash
   docker-compose -f docker-compose.nginx.yml up -d
   # 或 docker-compose.kong.yml
   ```
