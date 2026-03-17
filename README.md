# Node.js Quickstart Generator

[![npm version](https://img.shields.io/npm/v/nodejs-quickstart-structure.svg?style=flat-square)](https://www.npmjs.com/package/nodejs-quickstart-structure)
[![npm total downloads](https://img.shields.io/npm/dt/nodejs-quickstart-structure.svg?style=flat-square)](https://www.npmjs.com/package/nodejs-quickstart-structure)
[![npm monthly downloads](https://img.shields.io/npm/dm/nodejs-quickstart-structure.svg?style=flat-square)](https://www.npmjs.com/package/nodejs-quickstart-structure)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg?style=flat-square)](https://opensource.org/licenses/ISC)

A powerful CLI tool to scaffold production-ready Node.js microservices with built-in best practices, allowing you to choose between **MVC** or **Clean Architecture**, **JavaScript** or **TypeScript**, and your preferred database.

![Demo](docs/demo.gif)

## Features

- **Interactive CLI**: Easy-to-use prompts to configure your project.
- **Multiple Architectures**: Supports both **MVC** (Model-View-Controller) and **Clean Architecture**.
- **Language Support**: Choose between **JavaScript** and **TypeScript**.
- **Database Integration**: Pre-configured setup for **MySQL**, **PostgreSQL**, or **MongoDB**.
- **Communication Flow**: Scaffold APIs using **REST**, **GraphQL** (with Apollo Server), or **Kafka** (event-driven).
- **Caching Layer**: Choose between **Redis** or built-in **Memory Cache** for data caching.
- **Centralized Error Handling**: Every project ships with a global error handler, custom error classes and structured JSON error responses — consistent across REST & GraphQL.
- **Dockerized**: Automatically generates `docker-compose.yml` for DB, Kafka, Redis, and Zookeeper.
- **Database Migrations/Schemas**: Integrated **Flyway** for SQL migrations or **Mongoose** schemas for MongoDB.
- **Professional Standards**: Generated projects come with highly professional, industry-standard tooling.

## 🌟 Why developers love this?

- **Community Trusted**: Over **3,000+** projects bootstrapped within the first month.
- **Actively Maintained**: Constant updates and optimizations (30+ versions released) based on real-world developer feedback.
- **Resilience First**: Unlike basic boilerplates, our generated code focuses on infrastructure stability (Retry logic, Health checks, and Graceful shutdowns).

## 🏆 Professional Standards (New)

We don't just generate boilerplate; we generate **production-ready** foundations. Every project includes:

-   **🔍 Code Quality**: Pre-configured `Eslint` and `Prettier` for consistent coding standards.
-   **🛡️ Security**: Built-in `Helmet`, `HPP`, `CORS`, and Rate-Limiting middleware.
-   **🚨 Error Handling**: Centralized global error middleware with custom error classes and structured JSON responses. GraphQL uses Apollo's `formatError` hook; REST uses Express error middleware.
-   **🧪 Testing Excellence**: Integrated `Jest` and `Supertest`. Every generated project maintains **>70% Unit Test coverage** for controllers, services, and resolvers out of the box.
-   **🔄 CI/CD Integration**: Pre-configured workflows for **GitHub Actions**, **Jenkins**, and **GitLab CI**.
-   **⚓ Git Hooks**: `Husky` and `Lint-Staged` to ensure no bad code is ever committed.
-   **🤝 Reliability**: Health Checks (`/health`) with deep database pings, Infrastructure Retry Logic (handling Docker startup delays), and Graceful Shutdown workflows.
-   **🐳 DevOps**: Highly optimized **Multi-Stage Dockerfile** for small, secure production images.
-   **🚀 Deployment**: Ship confidently with an integrated **PM2 Ecosystem Configuration** for zero-downtime reloads and robust process management.

## 🧩 480+ Project Combinations

The CLI supports a massive number of configurations to fit your exact needs:

-   **240 Core Combinations**:
    -   **MVC Architecture**: 180 variants (Languages × View Engines × Databases × Communication Patterns × Caching)
    -   **Clean Architecture**: 60 variants (Languages × Databases × Communication Patterns × Caching)
-   **480 Total Scenarios**:
    -   Every combination can be generated with or without (**GitHub Actions CI/CD** / **Jenkins** or **GitLab CI**), tripling the possibilities.
    -   Every single one of these 480 scenarios is verified to be compatible with our 70% Coverage Threshold policy.

For a detailed list of all supported cases, check out [docs/generateCase.md](docs/generateCase.md).

## Installation

You can install the tool globally directly from npm:

```bash
npm install -g nodejs-quickstart-structure
```

## Usage

Once installed, simply run the following command in any directory where you want to create a new project:

```bash
nodejs-quickstart init
```

## Quick Start (Recommended)

You can run the generator directly without installing it globally:

```bash
npx nodejs-quickstart-structure@latest init
```

### Configuration Options

The CLI will guide you through the following steps:

1.  **Project Name**: The name of the folder to create.
2.  **Language**: `JavaScript` or `TypeScript`.
3.  **Architecture**: `MVC` or `Clean Architecture`.
4.  **Database**: `MySQL`, `PostgreSQL`, or `MongoDB`.
5.  **Database Name**: The name of the initial database.
6.  **Communication**: `REST APIs` (default), `GraphQL`, or `Kafka`.
7.  **Caching**: `None`, `Redis`, or `Memory Cache`.
8.  **CI/CD**: `GitHub Actions`, `Jenkins`, `GitLab CI` or `None`.

## Generated Project Structure

The generated project will include:

-   `src/`: Source code (controllers, routes, services/use-cases).
-   `src/errors/`: Custom error classes — `ApiError`, `NotFoundError`, `BadRequestError`.
-   `flyway/sql/`: SQL migration scripts (if SQL database selected).
-   `docker-compose.yml`: Services configuration for DB, Flyway, and Kafka.
-   `package.json`: Dependencies and scripts (`start`, `dev`, `build`).
-   `tsconfig.json`: (If TypeScript is selected) Type checking configuration.

### Getting Started with the Generated App

```bash
cd <your-project-name>

# Start infrastructure (DB, etc.)
npm install

docker-compose up
```

## ❤️ Support the Project

We just hit **3,000 downloads**! If this tool helped you save hours of setup time, please consider:
- Giving us a ⭐ on [GitHub](https://github.com/paudang/nodejs-quickstart-structure) to help others find it.
- Following the [Medium Article](https://medium.com/@paudang/nodejs-quickstart-generator-93c276d60e0b) for deep-dive tutorials.

## License

ISC

## 🚀 Roadmap & Upcoming Features

We are constantly working to improve `nodejs-quickstart-structure` and make it the most robust boilerplate generator for Node.js. 

You can track our current progress, see what features are being worked on, and vote for your favorites on our public Trello board:

👉 **[View our Public Roadmap on Trello](https://trello.com/b/TPTo8ylF/nodejs-quickstart-structure-product)**

If you have a feature request or want to contribute, feel free to check the board and open an issue or pull request!
