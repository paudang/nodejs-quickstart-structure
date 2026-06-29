# CI/CD 配置指南

本指南提供了为您生成的 Node.js 微服务设置持续集成和持续部署 (CI/CD) 的分步指南。我们开箱即用地支持 5 大主流托管平台。

::: tip 选项提示
在生成项目时，请在 **"Select CI/CD Provider"** 提示中选择您偏好的提供商。生成器将自动注入所需的配置文件。
:::

---

## 通用前置条件

在配置任何平台之前，请确保已准备好以下内容：
1. **初始化 Git**：在项目根目录运行 `git init`。
2. **Snyk Token**：(可选) 从 [Snyk.io](https://snyk.io/) 获取 API token，用于第三方包安全扫描。
3. **SonarQube/SonarCloud Token**：(可选) 从 [SonarCloud.io](https://sonarcloud.io/) 获取 token，用于静态代码分析。

---

## 1. GitHub Actions

GitHub Actions 直接与您的代码仓库无缝集成。

### 分步配置步骤：
1. **推送代码**：将您的项目推送到 GitHub 仓库。
2. **检查文件**：确保项目根目录下存在 `.github/workflows/ci.yml`。
3. **配置 Secrets 密钥**：
    - 前往仓库的 **Settings**。
    - 在侧边栏选择 **Secrets and variables > Actions**。
    - 点击 **New repository secret**。
    - 添加 `SNYK_TOKEN` (如果开启了安全强化功能)。
    - 添加 `SONAR_TOKEN` (如果开启了安全强化功能)。
4. **触发机制**：每一次对 `main` 分支的 push 操作或 Pull Request 都会自动触发流水线运行。

---

## 2. GitLab CI

GitLab CI 使用单个 `.gitlab-ci.yml` 文件来管理整个流水线的生命周期。

### 分步配置步骤：
1. **推送代码**：将项目推送到 GitLab 仓库。
2. **配置 CI/CD 变量**：
    - 前往 **Settings > CI/CD**。
    - 展开 **Variables** 部分。
    - 添加 `SNYK_TOKEN` 和 `SONAR_TOKEN` 两个密钥。
3. **Runner 配置**：
    - 生成的配置使用 `services: [docker:dind]` 进行端到端 (E2E) 测试。
    - 如果您使用自建的 GitLab Runner，请确保开启了 **Privileged mode (特权模式)**。
4. **自动检测**：GitLab 会自动识别 `.gitlab-ci.yml` 文件并启动流水线。

---

## 3. Jenkins

Jenkins 是一个自托管的自动化服务器。对于 Node.js 项目，我们建议在 Docker 容器内运行 Jenkins，以保证构建环境的可靠性。

### 分步配置步骤：

#### 1. 使用 Docker 运行 Jenkins (推荐)
为了能够在 Jenkins 内部构建 Docker 镜像，请使用安装了 Docker CLI 的定制 Jenkins 镜像：

```bash
# Dockerfile.jenkins
FROM jenkins/jenkins:lts
USER root

# 安装 Docker CLI 和 curl
RUN apt-get update && apt-get install -y docker.io curl

# 直接下载最新版 Docker Compose 脚本
RUN curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose && \
    chmod +x /usr/local/bin/docker-compose

# 确保 jenkins 用户拥有套接字读写权限
RUN usermod -aG docker jenkins

USER jenkins
```

启动容器并挂载宿主机的 Docker 套接字 (使用 `--user root` 权限以避免权限问题)：
```bash
docker run -d -p 8080:8080 -p 50000:50000 \
  --name jenkins \
  --user root \
  -v jenkins_home:/var/jenkins_home \
  -v //var/run/docker.sock:/var/run/docker.sock \
  my-jenkins-with-docker
```

#### 2. 安装必需的插件
进入 **Manage Jenkins > Plugins**，搜索并安装以下插件：
- **NodeJS**：用于支持 `npm` 命令。
- **GitHub Integration**：用于建立与 GitHub App 的连接。
- **Pipeline**：用于读取项目中的 `Jenkinsfile`。

::: tip 遇到故障？
如果您遇到类似 `Invalid tool type "nodejs"` 或 `npm not found` 的错误，请参阅我们的 **[Jenkins 排错常见问题](../guide/troubleshooting#jenkins-invalid-tool-type-nodejs)** 解决它。
:::

#### 3. 配置认证凭据 (GitHub App)
为了建立最安全稳定的连接，建议在您的 GitHub 设置中创建一个 **GitHub App**：
1. **权限设置**：Repository > Contents (R/W), Metadata (R), Commit statuses (R/W)。
2. **App ID 与秘钥**：复制 App ID 并下载私钥 `.pem` 文件。
3. **Jenkins 凭据**：在 Jenkins 中添加一个类型为 **"GitHub App"** 的新全局凭据，粘贴 App ID 与私钥内容。

#### 4. 创建流水线
1. **新建任务 (New Item)**：选择 **Pipeline** (流水线) 类型，以您的项目命名。
2. **Pipeline 设置**：在定义中选择 **Pipeline script from SCM**。
3. **SCM**：选择 **Git**，输入您的仓库克隆地址，并选用上面创建的凭据。
4. **分支**：通常填 `*/main`。
5. **Lightweight Checkout**：**取消勾选** "Lightweight checkout" (轻量级检出) 选项，以避免遭遇 "not in a git directory" 的报错。

#### 5. 监控构建
您可以通过观察每次构建的 **Console Output (控制台输出)** 来跟踪 `Jenkinsfile` 中定义的各个构建阶段。

---

## 4. CircleCI

CircleCI 通过 Orbs 机制和 machine 执行器提供优化的流水线体验。

### 分步配置步骤：
1. **授权登录**：使用您的 GitHub/GitLab 账号登录 [CircleCI](https://circleci.com/)。
2. **关联项目**：点击侧边栏的 **Projects** 并找到您的仓库。
3. **设置项目**：点击仓库名称旁的 **Set Up Project**。
4. **使用既有配置**：选择 **"Fastest: Use the .circleci/config.yml in my repo"**，然后点击 **Let's Go**。
5. **配置环境变量**：
    - 前往 **Project Settings > Environment Variables**。
    - 如果启用了安全强化，请在此处配置 `SNYK_TOKEN` 和 `SONAR_TOKEN`。

---

## 5. Bitbucket Pipelines

Bitbucket Pipelines 直接嵌入在 Bitbucket 云端控制面板中。

### 分步配置步骤：
1. **启用 Pipelines**：在您的 Bitbucket 仓库侧边栏中找到 **Pipelines**。
2. **首次激活**：点击 **"Enable Pipelines"** 按钮。如果您已经推送了代码，Bitbucket 会自动识别并提供 **"Run initial pipeline"** 按钮，点击即可运行。
3. **配置变量**：
    - 前往 **Repository settings > Pipelines > Repository variables**。
    - 添加您的 `SNYK_TOKEN` 和 `SONAR_TOKEN`。
4. **自动触发**：激活后，每一次向仓库提交 `git push` 都会自动触发流水线运行。
5. **监控**：您可以在侧边栏的 **Pipelines** 菜单下实时追踪构建进度。

---

##  各托管平台横向对比

| 功能特性 | GitHub Actions | GitLab CI | Jenkins | CircleCI | Bitbucket |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **配置文件** | `ci.yml` | `.gitlab-ci.yml` | `Jenkinsfile` | `config.yml` | `bitbucket-pipelines.yml` |
| **生态扩展** | Market Actions | DinD / Templates | 插件系统 | Orbs 插件 | Pipes |
| **密钥配置 UI** | Settings > Secrets | Settings > CI/CD | 证书管理器 | Project Settings | Repo Settings |
| **免费额度** | 2,000 分钟/月 | 400 分钟/月 | 个人机器无限用 | 2,500 分钟/月 | **50 分钟/月** |
| **执行器** | 官方云端 Runners | 共享/专用 Runner | 主从模式 Agent | Docker/Machine | Pipelines Runner |

---

## 依然遇到连接超时或问题？

CI/CD 环境往往受宿主机网络的影响。我们整理了专门的 **[排错与 FAQ 指南](../guide/troubleshooting)**，帮助您解决以下常见报错：

- 在 GitLab/Bitbucket 中连接 **Kafka 或 数据库** 发生连接超时。
- **Jenkins** 工具配置与插件缺失报错。
- **安全扫描** (`SNYK_TOKEN`) 授权失败。
- 共享 runner 的 **内存与 CPU 资源限制** (OOM/SIGKILL)。

> [!TIP]
> 出现故障时，**请优先查阅 Pipeline 日志**！如果连接超时，生成的脚本通常会自动把 `docker-compose logs` 打印出来以供分析。
