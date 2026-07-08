# ArchGuard AI Code Review

When building production-ready microservices, maintaining architectural integrity is just as important as writing correct code. Traditional static analysis tools (like ESLint or SonarQube) are great for catching syntax errors and code smells, but they cannot enforce **Clean Architecture**, **Decoupling**, or **Domain-Driven Design (DDD)** principles.

That's where **[ArchGuard AI Reviewer](https://github.com/marketplace/actions/archguard-ai-reviewer)** comes in.

ArchGuard AI is a 100% Free, AI-native GitHub Action powered by Cloudflare Workers AI. It automatically reviews your Pull Requests specifically for architectural flaws and security vulnerabilities.

## Why use ArchGuard AI?

- **Architectural Guardrails**: It ensures that your Presentation layer (Controllers) does not leak into your Infrastructure layer (Databases), enforcing the strict boundaries of Clean Architecture provided by this boilerplate.
- **Zero Configuration**: Out-of-the-box support for Node.js Quickstart Generator.
- **ChatOps Support**: You can interact with the AI directly on your Pull Request by tagging `@archguard-ai`.
- **100% Free**: Uses Serverless AI (Llama 3) via Cloudflare Gateway, meaning you don't need to provide an OpenAI API key.

## Setup Instructions

Adding ArchGuard to your project takes less than a minute.

1. Create a new GitHub Actions workflow file: `.github/workflows/archguard-audit.yml`
2. Add the following configuration:

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
      pull-requests: write # Required for ArchGuard to publish PR comments
      contents: read       # Required to read the PR diff
      id-token: write      # Required for Zero-Trust Authentication
    steps:
      - name: Run ArchGuard AI Auditor
        uses: archguard-labs/action@main
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## How to use ChatOps

ArchGuard AI acts as your personal Senior Software Architect. If you have questions about the feedback it gave you on a Pull Request, simply tag it in a comment:

> `@archguard-ai Can you explain why this violates the Tight Coupling principle?`

The AI will respond directly to your question based on the context of your Pull Request. If you need it to re-evaluate the code after you push changes, simply say:

> `@archguard-ai pls re-check`

## Enforcing Company-Specific Rules

If your team has specific architectural conventions (e.g., "All DTOs must use the `class-validator` library"), you can create a `.archguardrules` file in the root of your repository. 

ArchGuard AI will automatically read this file and strictly enforce your custom rules during the PR review process!