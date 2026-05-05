# Node.js Quickstart Generator

[![npm version](https://img.shields.io/npm/v/nodejs-quickstart-structure.svg?style=flat-square)](https://www.npmjs.com/package/nodejs-quickstart-structure)
![Total Clones](https://img.shields.io/badge/dynamic/json?color=brightgreen&label=total%20clones&query=total_clones&url=https%3A%2F%2Fraw.githubusercontent.com%2Fpaudang%2Fnodejs-quickstart-structure%2Foutput%2Ftotal_stats.json&style=flat-square)
[![npm total downloads](https://img.shields.io/npm/dt/nodejs-quickstart-structure?style=flat-square&color=emerald&label=Downloads)](https://www.npmjs.com/package/nodejs-quickstart-structure)
[![npm monthly downloads](https://img.shields.io/npm/dm/nodejs-quickstart-structure.svg?style=flat-square)](https://www.npmjs.com/package/nodejs-quickstart-structure)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg?style=flat-square)](https://opensource.org/licenses/ISC)


---

A powerful ecosystem to scaffold production-ready Node.js microservices with built-in best practices. Choose between **MVC** or **Clean Architecture**, **JavaScript** or **TypeScript**, and your preferred tech stack in seconds.

## Table of Contents

- [Quick Start](#choose-your-journey)
- [What's New](#whats-new-in-v21-the-authentication-release)
- [Key Features](#key-features)
- [Professional Standards](#professional-standards)
- [7,920+ Project Combinations](#7920-project-combinations)
- [Configuration Options](#configuration-options)
- [Generated Project Structure](#generated-project-structure)
- [Documentation](#documentation)
- [Support & Roadmap](#support--roadmap)

## Choose Your Journey
 
| **Path A: Next-Gen Web UI** (Recommended) | **Path B: Interactive CLI** |
| :--- | :--- |
| <a href="https://paudang.github.io/nodejs-quickstart-structure/#configurator"><img src="docs/public/v2-preview.png" width="100%" alt="UI Preview"></a> | <img src="docs/demo.gif" width="100%" alt="CLI Demo"> |
| [Try Visual Configurator →](https://paudang.github.io/nodejs-quickstart-structure/#configurator) | [See CLI Commands ↓](#path-b-interactive-cli) |
| **Visual Preview**: Real-time folder simulation. | **Fast & Direct**: Quickly scaffold in terminal. |
| **Zero-Prompt**: Paste a tailored command. | **AI-Ready**: Generates `.cursorrules`. |

---

### Path B: Interactive CLI
**Scaffold your project directly from your terminal in seconds.**

```bash
npx nodejs-quickstart-structure@latest init
```

*Or install globally:*
```bash
npm install -g nodejs-quickstart-structure
# Then run:
nodejs-quickstart init
```

---

## What's New in v2.2 (The Social Auth Release)
 
 The v2.2.0 release brings enterprise-grade identity management to your microservices:
 
- **OAuth2 Social Login**: Seamlessly integrate **Google** and **GitHub** authentication with automatic user provisioning and JWT session linking.
- **Massive Matrix Expansion**: Now supporting **7,920+ unique project scenarios**, mathematically validated for template consistency.

---

## Key Features

- **Interactive CLI**: Smooth, guided configuration process.
- **Multiple Architectures**: Supports both **MVC** and **Clean Architecture**.
- **Modern Languages**: Choice of **JavaScript** or **TypeScript**.
- **Database Ready**: Pre-configured for **MySQL**, **PostgreSQL**, or **MongoDB**.
- **Communication Patterns**: Supports **REST**, **GraphQL** (Apollo), and **Kafka** (Event-driven).
- **Multi-layer Caching**: Integrated **Redis** or built-in **Memory Cache**.
- **Pluggable Authentication**: Built-in **JWT** and **OAuth2 (Google/GitHub)** support with Access/Refresh token rotation.
- **AI-Native Optimized**: specifically designed for **Cursor** and AI agents, including built-in `.cursorrules` and Agent Skill prompts.

---

## Professional Standards

We don't just generate boilerplate; we generate **production-ready** foundations. Every project includes:

- **Code Quality**: Pre-configured `Eslint` and `Prettier`.
- **Enterprise Security**: Integrated **Snyk (SCA)**, **SonarCloud (SAST)**, `Helmet`, `HPP`, and Rate-Limiting.
- **Robust Error Handling**: Centralized global error middleware with custom error classes (`ApiError`, `NotFoundError`, etc.) — consistent across REST & GraphQL.
- **Testing Excellence**: Integrated `Jest` and `Supertest` with **>80% Unit Test coverage** out of the box.
- **DevOps & CI/CD**: Optimized **Multi-Stage Dockerfiles**, health checks, infrastructure retry logic, and workflows for **GitHub Actions**, **Jenkins**, **GitLab CI**, **CircleCI**, and **Bitbucket Pipelines**.
- **Scalable Deployment**: Integrated **PM2 Ecosystem** config for zero-downtime reloads.

---

## 7,920+ Project Combinations

The CLI supports a massive number of configurations to fit your exact needs:

- **720 Core Combinations**:
  - **MVC Architecture**: 540 variants (Languages × View Engines × Databases × Communication Patterns × Caching × Auth)
  - **Clean Architecture**: 180 variants (Languages × Databases × Communication Patterns × Caching × Auth)
- **7,920+ Total Scenarios**:
  - Every combination can be generated across 5 CI/CD providers.
  - Optional **Enterprise-Grade Security Hardening** doubles the scenarios.
  - Every single scenario is verified to be compatible with our **80% Coverage Threshold** policy.

---

## Configuration Options

The CLI will guide you through:
1. **Project Name**
2. **Language**: `JavaScript` | `TypeScript`
3. **Architecture**: `MVC` | `Clean Architecture`
4. **View Engine**: (MVC only) `None` | `EJS` | `Pug`
5. **Database**: `MySQL` | `PostgreSQL` | `MongoDB`
6. **Communication**: `REST` | `GraphQL` | `Kafka`
7. **Caching**: `None` | `Redis` | `Memory Cache`
8. **Auth**: `None` | `JWT` | `OAuth2 (Google/GitHub) + JWT`
9. **CI/CD**: `GitHub Actions` | `Jenkins` | `GitLab CI` | `CircleCI` | `Bitbucket Pipelines`
10. **Security**: (Optional) Snyk & SonarCloud Hardening

---

## Generated Project Structure
Depending on your choices, the structure adapts. Here is a **TypeScript + Clean Architecture** preview:

```text
.
├── src/
│   ├── application/     # Use cases & Business logic
│   ├── domain/          # Entities & Repository interfaces
│   ├── infrastructure/  # DB, External services, Repositories
│   ├── interfaces/      # Controllers, Routes, GraphQL, Kafka
│   ├── errors/          # Custom Error Classes
│   ├── config/          # Environment & Global settings
│   └── index.ts         # Server entry point
├── flyway/sql/          # SQL migrations (if applicable)
├── docker-compose.yml   # Infrastructure services
├── package.json         # Scripts and dependencies
├── .cursorrules         # AI assistance rules (The "AI Brain")
└── .env.example         # Environment template
```

---

## Documentation

For full guides, architecture deep-dives, and feature references, visit our **[Official Documentation Site](https://paudang.github.io/nodejs-quickstart-structure/guide/getting-started.html)**.

---

## Support & Roadmap

### Support the Project
If this tool helped you build your project faster, please support us:
- Give us a ⭐ on [GitHub](https://github.com/paudang/nodejs-quickstart-structure) to help us reach our next milestone!
- Read our [Medium Series](https://medium.com/@paudang/nodejs-quickstart-generator-93c276d60e0b) for architecture deep-dives.

### Roadmap
Track our progress and vote for features on our public board:
**[View our Public Roadmap on Trello](https://trello.com/b/TPTo8ylF/nodejs-quickstart-structure-product)**

---

## Why Star us?

We are on a mission to build the best AI-Native Node.js scaffolding experience. Your star is not just a "like"—it's a vote of confidence that helps us:

1. **Attract Contributors**: More stars attract professional maintainers to keep this project secure and up-to-date.
2. **AI Model Awareness**: Popular repositories are weighted higher by AI coding assistants (Cursor, Copilot, etc.), making the generated code even better.
3. **Open Source Sustainability**: It motivates us to keep building and shipping "Enterprise-Grade" features for free.

If this tool saved you hours of work, **[please give us a Star!](https://github.com/paudang/nodejs-quickstart-structure)**

---

## License

ISC
