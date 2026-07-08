# ArchGuard AI 代码审查

在构建生产就绪的微服务时，维护架构完整性与编写正确的代码同等重要。传统的静态分析工具（如 ESLint 或 SonarQube）在捕获语法错误和代码异味方面非常出色，但它们无法强制执行 **整洁架构 (Clean Architecture)**、**解耦 (Decoupling)** 或 **领域驱动设计 (DDD)** 的原则。

这就是 **[ArchGuard AI Reviewer](https://github.com/marketplace/actions/archguard-ai-reviewer)** 诞生的原因。

ArchGuard AI 是一款 100% 免费、原生集成 AI 的 GitHub Action，由 Cloudflare Workers AI 提供支持。它会自动审查您的 Pull Request，专门发现架构缺陷和安全漏洞。

## 为什么使用 ArchGuard AI？

- **架构护栏**：它确保您的表现层（Controllers）不会泄漏到基础设施层（Databases），强制执行此样板文件提供的整洁架构的严格边界。
- **零配置**：开箱即用，全面支持 Node.js Quickstart Generator。
- **支持 ChatOps**：您可以在 Pull Request 上通过 @ 提及 `@archguard-ai` 直接与 AI 交互。
- **100% 免费**：通过 Cloudflare Gateway 使用 Serverless AI（Llama 3），这意味着您无需提供任何 OpenAI API 密钥。

## 安装指南

将 ArchGuard 添加到您的项目中只需不到一分钟。

1. 创建一个新的 GitHub Actions 工作流文件：`.github/workflows/archguard-audit.yml`
2. 添加以下配置：

```yaml
name: ArchGuard AI Review

on:
  pull_request:
    types: [opened, synchronize]
  issue_comment:
    types: [created]

jobs:
  archguard-review:
    runs-on: ubuntu-latest
    permissions:
      pull-requests: write # 必须：允许 ArchGuard 在 PR 上发表评论
      contents: read       # 必须：读取 PR 的差异代码 (Diff)
      id-token: write      # 必须：用于零信任身份验证 (Zero-Trust Authentication)
    steps:
      - name: Run ArchGuard AI Auditor
        uses: archguard-labs/action@main
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## 如何使用 ChatOps

ArchGuard AI 充当您个人的高级软件架构师。如果您对它在 Pull Request 上提供的反馈有任何疑问，只需在评论中 @ 提及它：

> `@archguard-ai 你能解释一下为什么这违反了紧耦合 (Tight Coupling) 原则吗？`

AI 将根据您 Pull Request 的上下文直接回答您的问题。如果您在推送新代码后需要它重新评估代码，只需说：

> `@archguard-ai pls re-check`

## 强制执行公司特定的规则

如果您的团队有特定的架构约定（例如：“所有 DTO 必须使用 `class-validator` 库”），您可以在存储库的根目录中创建一个 `.archguardrules` 文件。

ArchGuard AI 会自动读取此文件，并在 PR 审查过程中严格执行您的自定义规则！