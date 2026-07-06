# 身份验证 (Authentication)

本指南提供了一个关于理解和设置生成器搭建的**企业级身份验证系统**的全面指南。

无论您使用的是标准的邮箱/密码注册登录，还是社交账号第三方登录 (Google/GitHub)，本指南都涵盖了从环境变量配置到诸如 Token 轮转和窃取检测等高级安全特性。

---

## 环境变量配置

身份验证是由项目根目录下 `.env` 文件中的环境变量驱动的。

```bash
# 核心 JWT 配置
JWT_SECRET=your_super_secret_key          # 用于对 Access Token 进行签名的私钥
JWT_REFRESH_SECRET=your_refresh_secret    # 用于对 Refresh Token 进行签名的私钥
JWT_EXPIRES_IN=15m                        # Access token 的生命周期 (建议短效)
JWT_REFRESH_EXPIRES_IN=7d                 # Refresh token 的生命周期 (建议长效)

# 社交账号第三方登录 (可选)
GOOGLE_CLIENT_ID=your_id
GOOGLE_CLIENT_SECRET=your_secret
# MVC 项目使用 /auth 路由，其他项目使用 /api/auth
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback 

GITHUB_CLIENT_ID=your_id
GITHUB_CLIENT_SECRET=your_secret
GITHUB_CALLBACK_URL=http://localhost:3000/auth/github/callback
```

---

## 标准身份验证流程 (邮箱/密码)

我们的标准身份验证流程遵循业界最佳安全实践：**无状态的访问令牌 (Stateless Access Tokens)** 结合 **持久化的刷新令牌 (Persistent Refresh Tokens)**。

### 1. 用户注册
用户可以通过发送用户名、邮箱和密码进行注册。系统会在存储前自动使用 `bcryptjs` 对密码进行高强度哈希加密。

::: code-group
```bash [REST API]
POST /api/users
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "securepassword123"
}
```

```graphql [GraphQL]
mutation {
  createUser(name: "Jane Doe", email: "jane@example.com", password: "securepassword123") {
    id
    email
  }
}
```
:::

### 2. 用户登录
登录成功后，服务器会向客户端返回一个 `accessToken` 和一个 `refreshToken`。

```bash
POST /api/auth/login
{
  "email": "jane@example.com",
  "password": "securepassword123"
}
```

**后续步骤？**
- **客户端保管**：建议将 `accessToken` 存储在内存 (如 Pinia/Redux 状态) 中，将 `refreshToken` 存储在安全的 HttpOnly Cookie (MVC 项目的默认选择) 或移动端/SPA 的安全持久化存储中。
- **发送请求鉴权**：在随后的网络请求中带上 Token 标头：`Authorization: Bearer <accessToken>`。

---

## 社交第三方登录集成

生成器支持一个可以适配您特定架构 (MVC、SPA 或移动端) 的“可插拔社交认证”系统。

### 工作原理

生成器自动处理了复杂的 OAuth2 重定向和交换逻辑，提供了一条无缝集成的授权链路。

![Authentication Flow Diagram](/auth-flow-diagram.png)

<details>
<summary>查看详细的序列图 (进阶版)</summary>

![Authentication Flow Diagram](/auth-flow-diagram-sequence.png)

</details>

### 云控制台配置指南

| 第三方厂商 | 控制台设置地址 | 必填的回调 Redirect URI |
| :--- | :--- | :--- |
| **Google** | [Google Cloud Console](https://console.cloud.google.com/) | `http://localhost:3000/[auth\|api/auth]/google/callback` |
| **GitHub** | [GitHub Developer Settings](https://github.com/settings/developers) | `http://localhost:3000/[auth\|api/auth]/github/callback` |

> [!TIP] 提示
> **Swagger 测试限制**: Swagger UI 中的 "Execute" 运行按钮在遇到跳转至 Google/GitHub 的重定向 (`302`) 指令时会提示 "Failed to fetch"。这是正常的浏览器跨域保护机制。如需测试这些路由，请直接在浏览器地址栏中粘贴 `http://localhost:3000/[auth|api/auth]/google` 打开。

### 如何手动测试 Token 交换流程

测试用于移动端/SPA 前后端分离架构下的 `POST /auth/social/exchange` 端点，需要捕获一个真实的、一次性的第三方授权 code：

1. **构造授权 URL**：
    * **Google**: `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=YOUR_CLIENT_ID&scope=email%20profile&redirect_uri=http://localhost:3000/[auth|api/auth]/google/callback`
    * **GitHub**: `https://github.com/login/oauth/authorize?client_id=YOUR_CLIENT_ID&scope=user:email&redirect_uri=http://localhost:3000/[auth|api/auth]/github/callback`
2. **捕获授权 code (使用“关停服务器”小技巧)**：
    > [!IMPORTANT] 重要
    > 授权 code 是**一次性作废**的。如果您的 Node 服务器处于运行中，它会在浏览器回调重定向的瞬间捕获并把 code 消费掉，导致您无法在 Swagger/Postman 中进行二次测试。
    >
    > **手动捕获方法**：
    > 1. **临时关停您的服务器** (命令行 Ctrl+C)。
    > 2. 点击您刚才在第一步构造的授权 URL，并在浏览器完成账户授权登录。
    > 3. 由于服务器已关闭，浏览器会显示“无法访问此网站”(这正是我们想要的！)。
    > 4. 观察浏览器顶部的地址栏，手动复制其中的 `code=4/0Af...` 的值。
    > 5. **重新开启服务器** (`npm run dev`)，并进入步骤3。
3. **在 Swagger/Postman 中交换 Token**：
    * **URL 解码**: 如果复制的 code 中包含 `%2F`，请先手动替换为斜杠 `/`。
    * **JSON 体**: 将 code 填入 `POST /auth/social/exchange` 的 body 中。
    * **Redirect URI**: 确保 `redirectUri` 与您在第一步中使用的回调地址一致。
    ```json
    {
      "code": "YOUR_COPIED_CODE",
      "provider": "Google",
      "redirectUri": "http://localhost:3000/[auth|api/auth]/google/callback"
    }
    ```
    * **发送执行**: 响应体中会成功返回最终的 JWT Access Token 和 Refresh Token。

> [!CAUTION] 注意
> 授权 code 具有严格的单次有效性。如果在 Swagger 交换过一次，或者回调已经被运行中的浏览器提前捕获消费过，它就会彻底作废。每次测试前都必须重新生成 code。

> [!TIP] 社交登录的安全性设计
> 想要了解这套集成方案背后的安全考虑？我们在 **System Weakness (Medium)** 上发表了两篇深入的安全博文，详细剖析了这些模式：
> - [The OAuth Integration Debt: Why Your Social Login is a CSRF Risk](https://systemweakness.com/the-oauth-integration-debt-why-your-social-login-is-a-csrf-risk-c2008099c05e)
> - [The Social Login Trap: Architecting Defenses Against Account Takeovers](https://systemweakness.com/the-social-login-trap-architecting-defenses-against-account-takeovers-3f34948169c4)

---

## 高级安全特性

生成的授权模块包含大厂通用的高阶安全特性：

### 1. 刷新令牌轮转 (Refresh Token Rotation)
每当客户端使用 `refreshToken` 来兑换新的短效 `accessToken` 时，**旧的 `refreshToken` 会被立即吊销作废**，并同时给客户端颁发一个**全新的 `refreshToken`**。这极大缩短了 Token 暴露泄露时的危险期。

### 2. 令牌窃取检测 (Theft Detection)
如果有黑客窃取了旧的 `refreshToken` 并尝试重复兑换：
1. 服务器检测到已经被消耗过的旧 `jti` (JWT 唯一 ID) 被二次使用。
2. 系统为了确保安全，会立即**强行撤销该用户的所有活动会话 (Nuclear Revoke)**。
3. 用户和黑客手中的全部 Token 瞬间失效，用户被强制退登，必须重新进行多因素认证登录，从而把攻击者锁死在系统之外。

### 3. Token 黑名单机制 (退登支持)
由于 JWT 具有无状态特征，原则上无法主动使其从外网消失。我们通过将已退登的 `jti` 写入 **Redis** 缓存数据库解决此问题，其生命周期 (TTL) 设定为该 Token 的到期时间。

```bash
POST /api/auth/logout
Authorization: Bearer <accessToken>
{
  "refreshToken": "<refreshToken>"
}
```

> [!TIP] **关于 <VocabLink category="auth-security" term="authentication" text="JWT" /> 无状态安全的探索**
> 我们详细剖析了 JWT 撤销难题及 Redis 黑名单的最佳实践。欢迎阅读我们在 **System Weakness** 上发表的推荐长文：
> - 📖 [The Illusion of Stateless Security: Rethinking JWT Revocation at Scale](https://systemweakness.com/the-illusion-of-stateless-security-rethinking-jwt-revocation-at-scale-8426472c5022)

---

## 架构文件分布图

| 模块组件 | 职责分工 | MVC 所在位置 | 整洁架构所在位置 |
| :--- | :--- | :--- | :--- |
| **JwtService** | Token 颁发、黑名单校验等核心逻辑 | `src/services/jwtService.ts` | `src/infrastructure/auth/jwtService.ts` |
| **SocialAuthService** | 社交账号 OAuth2 配置与 profile 兑换 | `src/services/socialAuthService.ts` | `src/infrastructure/auth/socialAuthService.ts` |
| **SocialLoginUseCase** | 社交认证的业务核心逻辑用例 | 无 (在控制器内) | `src/usecases/auth/socialLoginUseCase.ts` |
| **AuthMiddleware** | 拦截并验证 JWT、校验黑名单 | `src/middleware/authMiddleware.ts` | `src/infrastructure/webserver/middleware/authMiddleware.ts` |
| **AuthController** | 路由请求编排与返回分发 | `src/controllers/authController.ts` | `src/interfaces/controllers/auth/authController.ts` |
