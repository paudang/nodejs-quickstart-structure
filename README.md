# Node.js Quickstart Generator

[![npm version](https://img.shields.io/npm/v/nodejs-quickstart-structure.svg?style=flat-square)](https://www.npmjs.com/package/nodejs-quickstart-structure)
[![npm total downloads](https://img.shields.io/npm/dt/nodejs-quickstart-structure?style=flat-square&color=emerald&label=Downloads)](https://www.npmjs.com/package/nodejs-quickstart-structure)
[![npm monthly downloads](https://img.shields.io/npm/dm/nodejs-quickstart-structure.svg?style=flat-square)](https://www.npmjs.com/package/nodejs-quickstart-structure)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg?style=flat-square)](https://opensource.org/licenses/ISC)

A powerful CLI tool to scaffold production-ready Node.js microservices with built-in best practices. Choose between **MVC** or **Clean Architecture**, **JavaScript** or **TypeScript**, and your preferred tech stack in seconds.

🎯 **[Try the Next-Gen Web UI Configurator!](https://bit.ly/nodejs-quickstart)**
*Generate your exact architecture in the browser with real-time folder simulation.*

![Demo](docs/demo.gif)

---

## 🆕 What's New in v2.0.0

The v2.0.0 release is a major leap forward, turning the generator into a **Community Standard** for Node.js development:

- **🌐 Visual Web UI**: Real-time folder hierarchy simulation. "What you see is what you get" scaffolding. [Try it here](https://bit.ly/nodejs-quickstart).
- **🦾 AI-Native Foundation**: Built-in `.cursorrules` and Agent skills optimized for **Cursor** & AI coding assistants.
- **🏗️ Enterprise Clean Architecture**: High-fidelity structure for professional Microservices (TS/JS).
- **🛡️ Hardened Security**: Integrated Snyk & SonarCloud logic in the core templates.
- **⚡ Zero-Prompt Workflow**: Generate projects with a single CLI command—no more answering prompts manually.

---

## 📌 Table of Contents

- [🚀 Quick Start](#-quick-start)
- [✨ Key Features](#-key-features)
- [🛡️ Professional Standards](#-professional-standards)
- [🧩 1,680+ Project Combinations](#-1680-project-combinations)
- [⚙️ Configuration Options](#-configuration-options)
- [🏗️ Generated Project Structure](#-generated-project-structure)
- [📖 Documentation](#-documentation)
- [🗺️ Support & Roadmap](#️-roadmap--support)

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
- **Next-Gen Web UI Configurator**: A modern, browser-based visual project simulator. Click your stack and copy the generated zero-prompt CLI command instantly! [Try it here](https://bit.ly/nodejs-quickstart).

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

## 📖 Documentation

For full guides, architecture deep-dives, and feature references, visit our **[Official Documentation Site](https://bit.ly/nodejs-quickstart)**.

---

## ❤️ Support & 🗺️ Roadmap

### Support the Project
We just hit **4,000+ downloads**! If this tool helped you, please:
- Give us a ⭐ on [GitHub](https://github.com/paudang/nodejs-quickstart-structure).
- Read our [Medium Series](https://medium.com/@paudang/nodejs-quickstart-generator-93c276d60e0b) for architecture deep-dives.

### Roadmap
Track our progress and vote for features on our public board:
👉 **[View our Public Roadmap on Trello](https://trello.com/b/TPTo8ylF/nodejs-quickstart-structure-product)**

---

## License

ISC
