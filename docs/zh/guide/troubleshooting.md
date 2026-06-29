# 排错与常见问题 (FAQ) 指南

欢迎来到中央排错服务台！如果您在运行期间遇到了报错，请在下方查找对应的分类。每个排错条目都遵循 **错误表现 → 产生原因 → 解决方案** 的标准格式，方便您快速定位并修复。

---

## 环境与安装设置

### `nodejs-quickstart: command not found`
- **产生原因**: CLI 工具未全局安装，或您的 PATH 环境变量缺失。
- **解决方案**: 使用 `npx nodejs-quickstart-structure@latest init` (or `pnpm dlx` / `yarn dlx`) 运行，或通过您首选的包管理器全局安装 (`npm install -g nodejs-quickstart-structure`)。

### `Invalid Node.js version`
- **产生原因**: 您的本地 Node.js 运行版本可能低于 18.x。
- **解决方案**: 升级您的 Node.js 环境，推荐使用 **Node.js LTS (v22.x)**。

### `EBUSY: resource busy or locked` (Windows)
- **产生原因**: 目标文件当前被另一个系统进程 (例如 IDE、终端或杀毒软件) 独占锁定。
- **解决方案**: 关闭 IDE，以管理员权限重新启动终端窗口，然后再次尝试运行命令。

---

## 安全与质量门禁 (Snyk/Sonar)

### `403 Forbidden` 或 `Unauthorized` (Snyk)
-   **产生原因**: 系统环境变量中缺少 `SNYK_TOKEN` 或其值无效。
-   **解决方案**: 
    -   **本地开发**: 如果本地扫描失败，您需要先登录并验证您的开发机：
        ```bash
        npx snyk auth
        # 这将打开一个浏览器窗口供您执行账户登录。
        ```
    -   **CI/CD**: 确保您的 GitHub/GitLab Secret 中配置的变量名准确为 **`SNYK_TOKEN`**。

### `sonar.organization` is missing
- **产生原因**: SonarCloud 要求在项目根目录的 `sonar-project.properties` 中指定组织 key。
- **解决方案**: 在 SonarCloud 界面找到您的 Org Key，并填入属性文件中。

### `Could not find a default branch` (SonarCloud)
-   **错误表现**: `ERROR Could not find a default branch for project...`
-   **产生原因**: 该项目尚未在 SonarCloud 控制台中导入。
-   **解决方案**: 
    1.  登录 SonarCloud。
    2.  点击 **"+" -> Analyze new project** 导入您的代码仓库。
    3.  **核心步骤**: 前往 **Administration -> Analysis Method**，确保 "Automatic Analysis" 被**关闭 (OFF)**，且勾选了 "GitHub Actions" (或您的其他集成环境)。
    4.  确保 SonarCloud 界面中显示的项目 Project Key (例如 `org_repo-name`) 与您项目根目录中 `sonar-project.properties` 里的配置完全一致。

---

## Husky 与 Git Hooks

### 初始化后提交时没有触发 Hooks
- **产生原因**: `npm install` (或 `pnpm` / `yarn`) 在 `git init` 之前执行，导致 Husky 没能成功挂载钩子。
- **解决方案**: 先运行 `git init`，然后执行 `npx husky install` 手动重装。

---

## Docker 与基础设施

### `port is already allocated` (例如端口 9093)
- **产生原因**: 另一个运行中的 Docker 容器或本地系统服务已经占用了该端口。
- **解决方案**: 运行 `docker compose down` 停止所有的容器；或者在 Mac/Linux 下使用 `lsof -i :9093`、Windows 下使用 `netstat -ano | findstr :9093` 找到占用端口的 PID 并将其杀掉。

### `dial unix /var/run/docker.sock: no such file or directory`
- **产生原因**: Docker 守护进程的 socket 未能成功挂载，或当前系统下的套接字路径不正确。
- **解决方案 (Windows Git Bash)**: 在挂载路径中使用双斜杠：`-v //var/run/docker.sock:/var/run/docker.sock`。

### `permission denied` (Docker API)
- **产生原因**: 执行工具的系统用户当前没有对 Docker 套接字的读写权限。
- **解决方案**: 将您的 CI 容器运行账号指定为 `root` (例如在 docker run 中添加 `--user root`)，或者将当前系统用户加入到宿主机的 `docker` 用户组中。

### Terraform 在 LocalStack 环境下 `aws_ami` 检索失败
- **错误表现**: 在本地使用 LocalStack 进行模拟部署时，运行 `terraform plan` 或 `terraform apply` 遭遇报错：`data.aws_ami.latest: Search returned no results`。
- **产生原因**: 默认配置中，Terraform 会使用名称过滤器 `"amzn2-ami-hvm-*"` 自动去检索最新的 Amazon Linux 2 AMI。然而，本地运行的免费 LocalStack 环境默认不包含或不支持此标准 Amazon 镜像，导致检索结果为空。
- **解决方案**: 
  1. 打开您项目下的 `/terraform/modules/compute/main.tf`。
  2. 找到 `data "aws_ami" "latest"` 数据源声明块 (通常在第27行附近)。
  3. 将 filter 下的 values 值由 `"amzn2-ami-hvm-*"` 修改为 `"*"` 以匹配 LocalStack 中提供的任意模拟映像：
     ```hcl
     data "aws_ami" "latest" {
       most_recent = true
       owners      = ["amazon"]
       filter {
         name   = "name"
         values = ["*"] # 更改为星号以兼容 LocalStack
       }
     }
     ```
  4. 重新执行 `terraform apply`。

> [!WARNING] 警告
> **真实 AWS 环境部署**: 通配符 `"*"` 会匹配 *任何* Amazon 拥有的 AMI 映像，这在向真实的 AWS 账户部署时可能会匹配到非 Linux 或不兼容的系统，导致 user data 脚本 (执行 `yum` 和安装 Docker) 运行失败。因此，在真实 AWS 上部署前，请务必将该值还原为标准的 `"amzn2-ami-hvm-*"`！

### 检查 LocalStack 的健康状态
- **问题**: 如何查看 LocalStack 内部哪些 AWS 服务正在运行，或排查连接故障？
- **解决方案**:
  1. 在浏览器或终端中直接 `curl` 访问健康检测端点：
     ```bash
     curl http://localhost:4566/_localstack/health
     ```
  2. 这会返回当前运行服务的 JSON 列表：
     ```json
     {
       "services": {
         "ec2": "running",
         "rds": "running",
         "elasticache": "running",
         "iam": "running",
         "sts": "running",
         "elbv2": "running",
         "wafv2": "running"
       }
     }
     ```
  3. 确认您需要使用的服务均在列表中处于 `"running"` 状态。

---

## 身份验证与 API

### Swagger：访问 `/auth/google` 或 `/auth/github` 返回 `Failed to fetch`
- **问题**: 在 Swagger 交互式文档界面点击 Execute 时返回 CORS 跨域错误。
- **产生原因**: 浏览器的 AJAX 安全同源策略禁止 Swagger UI 在异步请求中跟踪跳转到外部第三方登录域 (Google/GitHub) 的重定向 (`302`) 指令。
- **解决方案**: 
  - **直接测试**: 复制链接 `http://localhost:3000/auth/google` 并直接在浏览器新标签页 of the address bar 中打开，即可正常执行授权登录。
  - **API 接口测试**: 在 Swagger 中改用 `POST /auth/social/exchange` 端点，这是纯 JSON 的 API，不会产生重定向错误。

### Swagger: 在 `/auth/social/exchange` 接口上遭遇 `500 Internal Server Error`
- **问题**: 向 Swagger 发送授权 code 时返回 500 "Failed to authenticate" 报错。
- **产生原因**: 
  1. OAuth2 的 code 是单次使用即作废的，且已被浏览器进行了 URL 编码。
  2. `redirectUri` 不匹配。
- **解决方案**: 
  1. **获取最新 code**: 重新在浏览器访问授权链接获取新鲜的 code (它们一旦使用或超时便会失效)。
  2. **URL 解码**: 如果您在浏览器地址栏复制的 code 中含有 `%2F` 等字符，在粘贴进 Swagger 前必须手动将其替换为斜杠 `/` (例如 `4%2F0Af...` 改为 `4/0Af...`)。
  3. **核对 Redirect URI**: 确保传入的 `redirectUri` 与您在 Google/GitHub OAuth 应用后台配置的授权回调地址绝对一致。

---

## 后台作业与 BullMQ 队列

### Redis 遭遇 `Max retries per request` 错误
- **错误表现**: `MaxRetriesPerRequestError: Reached the max retries per request limit (which is 20)`
- **产生原因**: BullMQ 要求其所连接的 Redis 实例必须显式将 `maxRetriesPerRequest` 配置项指定为 `null`。如果您的 Redis 客户端启用了默认的重试机制，当 BullMQ 阻塞等待队列任务时，便会抛出此错误崩溃。
- **解决方案**: 检查您的 Redis 初始化参数，传入 `maxRetriesPerRequest: null`。生成器默认已如此配置，但如果您改动过，请检查 `src/config/redisClient.ts` (或 `.js`) 文件的配置。

### Redis 内存耗尽 (OOM)
- **问题**: 运行一段时间或处理了海量作业后，Redis 服务崩溃或出现 Key 被逐出的现象。
- **产生原因**: 默认情况下，BullMQ 会永久保存所有成功和失败的任务历史，导致 Redis 的内存随着作业数量呈线性增长。
- **解决方案**: 在往 Queue 中添加任务时，显式配置 `removeOnComplete` 和 `removeOnFail` 参数：
  ```typescript
  await emailQueue.add('send-email', data, {
    removeOnComplete: true, // 成功后立即清除历史；或者填入 100 以保留最近的 100 条
    removeOnFail: 1000      // 失败任务保留最近 1000 条以便排错
  });
  ```

---

## 生成器模板错误

### 配置文件未能如期生成
- **产生原因**: 错误地去修改了 `.yml` 等输出文件，而非 `/templates` 目录下的 `.yml.ejs` 模板。
- **解决方案**: 修改配置时，请务必修改以 `.ejs` 结尾的原始模板文件。

> [!TIP] 提示
> 遇到了新的未录入报错？随时欢迎在 GitHub 上给我们 [新建一个 Issue](https://github.com/paudang/nodejs-quickstart-structure/issues)！
