# 企业级安全配置

该项目允许您开箱即用地搭建具有企业级安全强化功能的 Node.js 微服务。此功能旨在满足一线科技公司的严格安全标准。

## 包含的特性

当您在项目初始化期间为“企业级安全强化 (Enterprise Security Hardening)”选择 "Yes" 时，系统将添加以下工具和配置：

### 1. Snyk (SCA - 软件组成分析)
- **工具**: [Snyk](https://snyk.io/)
- **目的**: 自动扫描您的 `node_modules`，以检测第三方依赖中已知的安全漏洞。
- **集成方式**: 
  - 一个专用的 GitHub Actions 工作流 (`.github/workflows/security.yml`)。
  - 用于自动扫描的 GitLab CI 和 Jenkins 阶段。
  - 故障保护 (Fail-safe)：如果检测到 "High" (高) 或 "Critical" (严重) 级别的漏洞，CI 将自动失败挂起。

### 2. SonarCloud / SonarQube (SAST - 静态应用安全测试)
- **工具**: [SonarCloud](https://sonarcloud.io/)
- **目的**: 深入的静态代码分析，以检测代码异味 (code smells)、Bug 和安全热点 (例如 SQL 注入、XSS 跨站脚本模式)。
- **集成方式**: 
  - 预先配置好的 `sonar-project.properties` 属性文件。
  - 在 CI/CD 管道中强制执行质量门禁 (Quality Gates)。

### 3. Husky (提交前质量守卫)
- **工具**: [Husky](https://typicode.github.io/husky/) & [lint-staged](https://github.com/lint-staged/lint-staged)
- **目的**: 在每次提交前自动对发生修改的文件运行代码格式化和 Lint 校验，以确保代码库整洁。
- **集成方式**: 
  - 在运行 `npm install` (或 `pnpm`, `yarn`) 时自动初始化。
  - 防止不合规或未格式化的代码被意外提交到仓库中。

---

要在生成的项目中完全激活这些功能，请遵循以下详细步骤来获取您的认证 Token 并配置您的 CI/CD 环境变量。

### 1. Snyk 集成 (SCA)

Snyk 监控您的项目依赖是否存在已知漏洞。配置方法如下：

1. **创建账户**：在 [Snyk.io](https://snyk.io/) 注册一个免费账户。
2. **获取您的 Auth Token**：
    - 点击左下角的 **个人头像 (profile avatar)** -> **Account Settings**。
    - 找到 **Auth Token** 部分。
    - 点击 **Click to show** 并复制您的 Token。
    - *或者，如果出于组织使用，可前往 **Settings -> Service Accounts** 创建一个非个人的服务账号 Token。*
3. **配置 GitHub Secrets**：
    - 进入您的 GitHub 仓库 -> **Settings** -> **Secrets and variables** -> **Actions**。
    - 点击 **New repository secret**。
    - 名称: `SNYK_TOKEN`
    - 值: (粘贴您复制的 Token)。

### 2. SonarCloud 集成 (SAST)

SonarCloud 执行深度的静态分析并跟踪代码质量。

1. **注册注册**：使用您的 GitHub 账户登录到 [SonarCloud.io](https://sonarcloud.io/)。
2. **创建/导入项目**：
    > [!IMPORTANT] 重要
    > 在 CI/CD 管道开始扫描之前，您**必须**先在 SonarCloud UI 中手动导入您的项目。
    - 点击右上角的 **"+" 图标** -> **Analyze new project**。
    - 选择您的 GitHub 组织并导入对应的具体仓库。
3. **配置分析方式**：
    - 导入后，转到 **Administration -> Analysis Method**。
    - **关闭 (Turn OFF)** "SonarCloud Automatic Analysis"。
    - 选择 **GitHub Actions** 作为您的主要分析方法，这会为您提供正确的 `sonar-project.properties` 配置模板。
4. **生成 Token**：
    - 点击您的 **个人头像** -> **My Account** -> **Security**。
    - 生成一个新的 Token 并将其复制。
5. **获取项目与组织标识**：
    - 在您的 SonarCloud 项目面板中，在“Information”部分的右下角找到 **Project Key** 和 **Organization Key**。
    - **注意**：Project Key 通常看起来像 `your-org_your-repo`。
    - 更新您项目本地的 `sonar-project.properties`：
        - `sonar.projectKey=sonarcloud界面显示的精确key`
        - `sonar.organization=sonarcloud界面显示的精确组织名`
6. **配置 GitHub Secrets**：
    - 添加 `SONAR_TOKEN`: (粘贴您刚刚生成的 Token)。
    - 添加 `SONAR_HOST_URL`: 
        - **如果是使用云端 SonarCloud**: 设置为 `https://sonarcloud.io`。
        - **如果是自建的 SonarQube**: 设置为您的实例 URL (例如 `http://your-server-ip:9000`)。

> [!TIP] 提示
> 绝大多数用户应该直接使用 `https://sonarcloud.io`，因为这是官方对开源和小型项目免费提供的云端服务！

### 3. Snyk 容器安全性扫描

除了依赖包扫描之外，生成器还包含 **容器安全性** 审计，用以检查您的 `Dockerfile` 和基础镜像 (base image)。

1. **要求**：确保项目根目录下存在 `Dockerfile`。
2. **CI/CD**：`security.yml` (GitHub) 或 `security` 阶段 (GitLab/Jenkins) 会自动构建您的镜像并运行 `snyk container test`。
3. **本地运行检测**：
    ```bash
    docker build -t my-app .
    snyk container test my-app --file=Dockerfile --severity-threshold=high
    ```

### 4. Husky & Lint-Staged
> [!IMPORTANT] 重要
> 在执行 `npm install` (或 `pnpm`, `yarn`) 之前，您**必须**先运行 `git init`，这样 Husky 才能正确挂载 Git 钩子。

1. **初始化 Git**：`git init`
2. **安装安装**：`npm install` (或 `pnpm`, `yarn`) (这会自动触发 `husky install`)。
3. **使用使用**：照常进行 git commit 即可！Husky 会自动运行 `lint-staged` 对修改的文件进行校验。

**排错：**
如果您看到类似 `.husky/pre-commit: line 2: .husky/_/husky.sh: No such file` 的错误，说明 Husky 没有成功初始化 (通常是因为跳过了 `git init` 步骤)。解决方法如下：
::: code-group
```bash [npm]
npx husky install
```
```bash [pnpm]
pnpm husky install
```
```bash [yarn]
yarn husky install
```
:::

### 5. 在本地运行安全扫描
您可以在本地随时使用以下命令手动运行安全审计：

::: code-group
```bash [npm]
npm run security:check
```
```bash [pnpm]
pnpm security:check
```
```bash [yarn]
yarn security:check
```
:::

此命令将按顺序执行 npm/yarn audit 包审计和 `snyk test` 扫描。
