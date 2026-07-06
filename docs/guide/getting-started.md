# Getting Started

Follow these steps to get your first service up and running.

## Prerequisites

-   **Node.js** (v18 or higher)
-   **Docker & Docker Compose** (for infrastructure like databases, Redis, or Kafka)

## Installation

You can run the generator directly using your preferred package manager:

::: code-group

```bash [npm]
npx nodejs-quickstart-structure@latest init
```

```bash [pnpm]
pnpm dlx nodejs-quickstart-structure@latest init
```

```bash [yarn]
yarn dlx nodejs-quickstart-structure@latest init
```

:::

*Alternatively, install it globally:*

::: code-group

```bash [npm]
npm install -g nodejs-quickstart-structure
nodejs-quickstart init
```

```bash [pnpm]
pnpm add -g nodejs-quickstart-structure
nodejs-quickstart init
```

```bash [yarn]
yarn global add nodejs-quickstart-structure
nodejs-quickstart init
```

:::

## Quick Start (Interactive Setup)

Our generator supports the complete **6-Phase Lifecycle of a Big Tech App**, ensuring your project is production-ready from day one:

![Main Flow Diagram](/main-flow.png)

When you run the `init` command, you'll be prompted to configure this exact lifecycle:

1.  **Project Name**: The name of your service directory.
2.  **Language**: Choose between **TypeScript** (Recommended) or **JavaScript**.
3.  **Architecture**: Select **MVC** or **Clean Architecture**.
4.  **View Engine**: If MVC is selected, pick **None**, **EJS**, or **Pug**.
5.  **Communication**: Select **REST APIs**, **GraphQL**, or **Kafka**.
6.  **Database**: Pick **MySQL**, **PostgreSQL**, **MongoDB** (<VocabLink category="database" term="database" text="Databases" />), or **None**.
7.  **Database Name**: Specify your database name (if a database is selected).
8.  **Caching**: Add **Redis** or **Memory <VocabLink category="backend-apis" term="caching" text="Cache" />**.
9.  **Authentication**: Pluggable **<VocabLink category="auth-security" term="authentication" text="JWT" />** and **(OAuth2 - Google/GitHub)** support.
10. **CI/CD**: Generate config for **GitHub Actions**, **GitLab**, or **Jenkins**.
11. **Security Hardening**: Opt-in for enterprise-grade security tools like **Snyk** and **SonarQube** (if CI/CD is selected).
12. **Advanced Options**: Choose to unlock Resilience, Background Jobs, Observability (ELK), and Terraform.
13. **Resilience**: Select from **Timeout**, **Retry**, and **Circuit Breaker** patterns.
14. **Background Jobs**: Optional **BullMQ** + **Bull-Board** Task <VocabLink category="backend-apis" term="background-job" text="Queues" /> (Requires Redis).
15. **Terraform (IaC)**: Scaffold AWS/GCP/Azure infrastructure files (**Standard** or **Production**).
16. **ELK Stack**: Optional **Elasticsearch & Kibana** integration for centralized logging.

## First Project Setup

Once generated, navigate to your project and install dependencies:

::: code-group

```bash [npm]
cd my-new-service
npm install
npm run prepare
```

```bash [pnpm]
cd my-new-service
pnpm install
pnpm prepare
```

```bash [yarn]
cd my-new-service
yarn install
yarn prepare
```

:::

### Start Infrastructure
If you selected a database, Redis, or Kafka, start them using Docker Compose:

```bash
docker-compose up -d
```

### Run the App
Start the development server with hot-reload:

::: code-group

```bash [npm]
npm run dev
```

```bash [pnpm]
pnpm dev
```

```bash [yarn]
yarn dev
```

:::
