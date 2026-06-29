# 可观测性 (ELK 堆栈)

在构建分布式微服务时，拥有集中的日志记录解决方案对于调试和监控至关重要。我们的生成器开箱即用地提供了可选的 **ELK 堆栈 (Elasticsearch & Kibana)** 集成。

ELK 堆栈模块为您的 Node.js 应用程序提供了一个强大、可搜索且高度可视化的可观测层。

## 工作原理

![ELK 流程图](/flow-elk.png)

如果您在生成器选项中选择启用 ELK 堆栈 (`Advanced Options -> Enable Centralized Logging`)，CLI 将自动为您的项目配置：

1. **自动配置 Winston 传输器 (Transport)**: 自动将 `winston-elasticsearch` 写入核心 `logger` 实用工具中。您只需在应用中正常调用 `logger.info()`、`logger.warn()` 或 `logger.error()`，日志就会在后台自动入缓冲并直接推送到 Elasticsearch，而不会阻塞 Node.js 事件循环。
2. **资源限制的本地设置**: 自动生成 `docker-compose.elk.yml` 文件，并预先配置了严格的 JVM 内存限制 (`ES_JAVA_OPTS=-Xms512m -Xmx512m`)，使其在本地机器 (包括 WSL 2 环境) 上平稳运行，而不会耗尽您的 RAM。
3. **本地开发禁用安全认证**: Docker 容器中默认禁用了安全配置 (`xpack.security.enabled=false`)，以消除本地开发过程中配置证书和密码的阻力。

## 本地启动与验证

要在本地启动 ELK 堆栈并验证日志流是否正常工作：

### 1. 启动 ELK 容器

在生成项目的根目录下，运行专门针对 ELK 的 Docker Compose 文件：

```bash
docker-compose -f docker-compose.elk.yml up -d
```

这将拉起两个容器：
- **Elasticsearch** (端口 `9200`)
- **Kibana** (端口 `5601`)

### 2. 验证 Elasticsearch 状态

您可以通过访问以下地址检查 Elasticsearch 是否正常运行：
`http://localhost:9200`

您应该会看到一个包含集群名称和版本 `8.14.0` 的 JSON 响应。

### 3. 启动您的 Node.js 应用程序

正常启动您的 Node.js 应用程序：

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

默认情况下，Winston 日志记录器会悄悄在内存中缓存并分批发送日志。如果 Elasticsearch 暂时无法连接，传输器已配置为安全捕获错误，以防止应用陷入无限崩溃循环。

### 4. 发送您的第一条日志 (使用示例)

要向 Kibana 发送日志，只需导入标准的 `logger` 并调用它即可。您作为第二个参数传入的任何对象 (元数据) 都将被建立索引：

::: code-group
```javascript [MVC 示例]
import logger from '../utils/logger.js';

// 在您的控制器或服务内
logger.info('用户成功注册', { 
    event: 'user_signup', 
    userId: 123, 
    status: 'success' 
});
```

```typescript [清洁架构示例]
import logger from '@/infrastructure/log/logger';

// 在您的用例 (Use Case) 内
logger.info('用户成功注册', { 
    event: 'user_signup', 
    userId: 123, 
    status: 'success' 
});
```
:::

### 5. 在 Kibana 中查看日志

在浏览器中打开 Kibana：
`http://localhost:5601`

要在 Kibana 中查看刚才发送的日志，您需要配置数据视图来读取您的新索引。

**Kibana 首次设置步骤：**
1. 您会看到欢迎屏幕：**"Welcome to Elastic"**。
2. 点击 **"Explore on my own"** (自主探索)。
3. 如果 Kibana 显示一个页面写着 *"Ready to try Kibana? First, you need data"*，这意味着您还没有执行上面的**步骤4**！您**必须**先从 Node.js 应用中触发一条日志 (例如访问一个调用了 `logger.info()` 的端点)，以便 Elasticsearch 中至少存有一条数据。
4. 发送日志后，点击 **"Check for new data"** (检查新数据)。

**创建 Data View (数据视图)：**
1. 打开左上角的 **“汉堡”** 菜单 (3条横线)，向下滚动到 **Management > Stack Management**。
2. 在左侧侧边栏 (Kibana 栏目下)，点击 **Data Views**。
3. 点击蓝色的 **Create data view** 按钮。
4. 在 **Name** 和 **Index pattern** 两个输入框中，都输入 `my-app-logs*`。(Kibana 将显示绿色的提示 *"Success! Your index pattern matches 1 index."*)
5. 如果系统要求选择时间戳字段，选择 `@timestamp`。
6. 点击 **Save data view to Kibana**。

**查看日志：**
1. 再次打开汉堡菜单，点击 **Analytics > Discover**。
2. 搞定！您现在应该能看到以可视化图表和 JSON 格式展现的日志，顶部配有搜索栏，可让您实时过滤和查询日志事件！

---

## 将 ELK 部署到云端

对于生产环境，部署和管理您自己的原生 ELK 堆栈可能会很复杂。我们建议根据您选择的云厂商采用以下托管日志服务方案：

::: code-group
```text [AWS]
1. 托管服务方案 (推荐)
   Amazon OpenSearch Service (Elasticsearch 的开源分支) 是一个原生的、
   全托管的替代方案，能无缝集成到您的私有网络 (VPC) 中。

2. 如何连接
   更新您的生产环境 `.env` 以将日志终端节点指向您的 OpenSearch。
   如果部署在 ECS/EKS 上，请使用 AWS FireLens 或 Fluent Bit 转发。

3. 自建部署 (EC2)
   至少配置 t3.medium 实例 (4GB+ RAM) 并使用 gp3 SSD 存储卷。
   重要提示：您必须启用 xpack.security 并配置 HTTPS。
   切勿将 9200 端口公网暴露。
```

```text [GCP]
1. 托管服务方案 (推荐)
   GCP 上的 Elastic Cloud。您可以直接从 
   Google Cloud Marketplace 中订阅它，实现统一账单。

2. 如何连接
   获取部署好的 Elasticsearch 端点 URL 和 API Key。
   更新生产环境 `.env` 以指向该托管集群。

3. 自建部署 (Compute Engine)
   至少配置 e2-medium 实例 (4GB+ RAM) 并使用 pd-ssd 存储卷。
   重要提示：您必须启用 xpack.security 并配置 HTTPS。
   切勿将 9200 端口公网暴露。
```

```text [Azure]
1. 托管服务方案 (推荐)
   Microsoft Azure 上的 Elastic Cloud。可直接在 
   Azure Marketplace 中启用以获取集成账单。

2. 如何连接
   获取部署好的 Elasticsearch 端点 URL 和 API Key。
   更新生产环境 `.env` 以指向该托管集群。

3. 自建部署 (虚拟机)
   至少配置 Standard_B2s 虚拟机 (4GB+ RAM) 并使用 Premium SSDs 存储卷。
   重要提示：您必须启用 xpack.security 并配置 HTTPS。
   切勿将 9200 端口公网暴露。
```
:::

> [!TIP] 深度解析 ELK 堆栈
> 想要了解此实现背后的架构细节吗？请查阅我们在 **System Weakness (Medium)** 上发表的深度技术文章：
> 
> **[Weaponizing Logs: How Attackers Crash Apps via Synchronous Logging (And How ELK Fixes It)](https://systemweakness.com/weaponizing-logs-how-attackers-crash-apps-via-synchronous-logging-and-how-elk-fixes-it-373d0bb84729)**