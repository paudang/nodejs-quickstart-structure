# 可选 API 网关集成

**Node.js Quickstart Generator** 支持在您的 Node.js 应用程序前无缝注入一个安全加固的 **API 网关**，以处理入口流量、限流（rate limiting）和安全规则。

## 概述
当您启用 **Advanced Options**（高级选项）且您的 API 类型为 REST 或 GraphQL 时，您可以选择将微服务部署在企业级 API 网关之后。我们开箱即用地支持两种顶级解决方案：

- **Nginx**：作为反向代理的高性能 Web 服务器，预配置了严格的安全标头和限流功能。
- **Kong (DB-less)**：在声明式（无状态）模式下配置的强大 API 网关，利用插件实现限流和密钥认证 (Key Authentication)。

## 为什么需要 API 网关？
虽然 Node.js 在处理异步 I/O 和业务逻辑方面表现出色，但在生产环境中不应将其直接暴露在公共互联网上。API 网关提供了以下几个关键优势：
- **安全与负载保护**：通过限流 (rate-limiting) 和连接缓冲，保护您的 Node.js 应用免受 DDoS 攻击、暴力破解和恶意请求的侵害。
- **卸载 (Offloading)**：处理 SSL/TLS 终止、Gzip 压缩和静态文件服务，从而释放 Node.js CPU 资源以专注于核心业务逻辑。
- **身份验证**：在请求到达您的服务之前，集中处理 API 密钥验证 (如 Kong) 或 JWT 身份验证。
- **可扩展性 (Scalability)**：充当负载均衡器 (反向代理)，能够将传入的流量平滑地分发到多个后端实例。

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

## 配置详情 (Configuration Details)

### Nginx 配置
- **端口映射 (Port Mapping)**：默认情况下，Nginx 将端口 `80` 暴露给主机。
- **Docker Compose**：`docker-compose.nginx.yml` 使用本地的 `Dockerfile` 构建 Nginx 镜像。它通过内部服务名称 `app` 自动解析 Node.js 应用程序。
- **规则自定义 (Rules Customization)**：您可以直接修改 `nginx.conf` 来调整限流区域、SSL 证书或代理缓冲。

### Kong 配置
- **端口映射 (Port Mapping)**：Kong 将端口 `8000` (Proxy API) 和 `8001` (Admin API) 暴露给主机。安全端口 `8443` 和 `8444` 也被映射。
- **声明式文件 (Declarative File)**：`kong.yml` 作为卷 (volume) 直接挂载到容器中 (`KONG_DECLARATIVE_CONFIG=/kong/declarative/kong.yml`)。对 `kong.yml` 的任何更改都需要重启容器才能生效。
- **日志 (Logs)**：代理和管理日志被路由到 `stdout/stderr`，以便轻松跟踪。

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
