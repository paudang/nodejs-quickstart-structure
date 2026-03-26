# Node.js Quickstart Generator

[![npm version](https://img.shields.io/npm/v/nodejs-quickstart-structure.svg?style=flat-square)](https://www.npmjs.com/package/nodejs-quickstart-structure)
[![npm total downloads](https://img.shields.io/npm/dt/nodejs-quickstart-structure?style=flat-square&color=emerald&label=Downloads)](https://www.npmjs.com/package/nodejs-quickstart-structure)
[![npm monthly downloads](https://img.shields.io/npm/dm/nodejs-quickstart-structure.svg?style=flat-square)](https://www.npmjs.com/package/nodejs-quickstart-structure)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg?style=flat-square)](https://opensource.org/licenses/ISC)

A powerful CLI tool to scaffold production-ready Node.js microservices with built-in best practices, allowing you to choose between **MVC** or **Clean Architecture**, **JavaScript** or **TypeScript**, and your preferred database.

![Demo](docs/demo.gif)

---

## 📌 Table of Contents

- [🚀 Quick Start](#-quick-start)
- [✨ Key Features](#-key-features)
- [🛡️ Professional Standards](#-professional-standards)
- [🧩 1,680+ Project Combinations](#-1680-project-combinations)
- [⚙️ Configuration Options](#-configuration-options)
- [🏗️ Generated Project Structure](#-generated-project-structure)
- [📖 Documentation](#-documentation)
- [🗺️ Roadmap & Support](#️-roadmap--support)

---

## 🚀 Quick Start

Generate your professional Node.js project in seconds without installing anything globally:

```bash
npx nodejs-quickstart-structure@latest init
```

### Installation (Optional)

If you prefer to install it globally:

```bash
npm install -g nodejs-quickstart-structure
# Then run:
nodejs-quickstart init
```

---

## ✨ Key Features

- **Interactive CLI**: Smooth, guided configuration process.
- **Multiple Architectures**: Supports both **MVC** and **Clean Architecture**.
- **Modern Languages**: Choice of **JavaScript** or **TypeScript**.
- **Database Ready**: Pre-configured for **MySQL**, **PostgreSQL**, or **MongoDB**.
- **Communication Patterns**: Supports **REST**, **GraphQL** (Apollo), and **Kafka** (Event-driven).
- **Multi-layer Caching**: Integrated **Redis** or built-in **Memory Cache**.
- **AI-Native Optimized**: specifically designed for **Cursor** and AI agents, including built-in `.cursorrules` and Agent Skill prompts. 🚀

---

## 🛡️ Professional Standards

We don't just generate boilerplate; we generate **production-ready** foundations. Every project includes:

- **🔍 Code Quality**: Pre-configured `Eslint` and `Prettier`.
- **🛡️ Enterprise Security**: Integrated **Snyk (SCA)**, **SonarCloud (SAST)**, `Helmet`, `HPP`, and Rate-Limiting.
- **🚨 Robust Error Handling**: Centralized global error middleware with custom error classes (`ApiError`, `NotFoundError`, etc.) — consistent across REST & GraphQL.
- **🧪 Testing Excellence**: Integrated `Jest` and `Supertest` with **>80% Unit Test coverage** out of the box.
- **🔄 DevOps & CI/CD**: Optimized **Multi-Stage Dockerfiles**, health checks, infrastructure retry logic, and workflows for **GitHub Actions**, **Jenkins**, and **GitLab CI**.
- **🚀 Scalable Deployment**: Integrated **PM2 Ecosystem** config for zero-downtime reloads.

---

## 🧩 1,680+ Project Combinations

The CLI supports a massive number of configurations to fit your exact needs:

- **240 Core Combinations**:
  - **MVC Architecture**: 180 variants (Languages × View Engines × Databases × Communication Patterns × Caching)
  - **Clean Architecture**: 60 variants (Languages × Databases × Communication Patterns × Caching)
- **1,680+ Total Scenarios**:
  - Every combination can be generated across 3 CI/CD providers.
  - Optional **Enterprise-Grade Security Hardening** doubles the scenarios.
  - Every single scenario is verified to be compatible with our **80% Coverage Threshold** policy.

---

## ⚙️ Configuration Options

The CLI will guide you through:
1. **Project Name**
2. **Language**: `JavaScript` | `TypeScript`
3. **Architecture**: `MVC` | `Clean Architecture`
4. **View Engine**: (MVC only) `None` | `EJS` | `Pug`
5. **Database**: `MySQL` | `PostgreSQL` | `MongoDB`
6. **Communication**: `REST` | `GraphQL` | `Kafka`
7. **Caching**: `None` | `Redis` | `Memory Cache`
8. **CI/CD**: `GitHub Actions` | `Jenkins` | `GitLab CI`
9. **Security**: (Optional) Snyk & SonarCloud Hardening

---

## 🏗️ Generated Project Structure

A typical generated project (TypeScript + Clean Architecture) looks like this:

```text
.
├── src/
│   ├── application/     # Use cases & Business logic
│   ├── domain/          # Entities & Repository interfaces
│   ├── infrastructure/  # DB, External services, Repositories
│   ├── interfaces/      # Controllers, Routes, GraphQL, Kafka
│   ├── errors/          # Custom Error Classes
│   └── index.ts         # Entry point
├── flyway/sql/          # SQL migrations (if applicable)
├── docker-compose.yml   # Infrastructure services
├── package.json         # Scripts and dependencies
├── tsconfig.json        # TypeScript config
└── .cursorrules         # AI assistance rules
```

---

## 📖 Documentation

For full guides, architecture deep-dives, and feature references, visit our **[Official Documentation Site](https://paudang.github.io/nodejs-quickstart-structure/)**.

---

## ❤️ Support & 🗺️ Roadmap

### Support the Project
We just hit **3,000+ downloads**! If this tool helped you, please:
- Give us a ⭐ on [GitHub](https://github.com/paudang/nodejs-quickstart-structure).
- Read our [Medium Article](https://medium.com/@paudang/nodejs-quickstart-generator-93c276d60e0b) for tutorials.

### Roadmap
Track our progress and vote for features on our public board:
👉 **[View our Public Roadmap on Trello](https://trello.com/b/TPTo8ylF/nodejs-quickstart-structure-product)**

---

## License

ISC
