# Getting Started

Follow these steps to get your first service up and running.

## Prerequisites

-   **Node.js** (v18 or higher)
-   **Docker & Docker Compose** (for infrastructure like databases, Redis, or Kafka)

## Installation

You can run the generator directly using `npx`:

```bash
npx nodejs-quickstart-structure@latest init
```

*Alternatively, install it globally:*

```bash
npm install -g nodejs-quickstart-structure
nodejs-quickstart init
```

## Quick Start (Interactive Setup)

Our generator supports the complete **6-Phase Lifecycle of a Big Tech App**, ensuring your project is production-ready from day one:

![Main Flow Diagram](/main-flow.png)

When you run the `init` command, you'll be prompted to configure this exact lifecycle:

1.  **Project Name**: The name of your service directory.
2.  **Language**: Choose between **TypeScript** (Recommended) or **JavaScript**.
3.  **Architecture**: Select **MVC** or **Clean Architecture**.
4.  **View Engine**: If MVC is selected, pick **None**, **EJS**, or **Pug**.
5.  **Communication**: Select **REST APIs**, **GraphQL**, or **Kafka**.
6.  **Database**: Pick **MySQL**, **PostgreSQL**, **MongoDB**, or **None**.
7.  **Database Name**: Specify your database name (if a database is selected).
8.  **Caching**: Add **Redis** or **Memory Cache**.
9.  **Authentication**: Pluggable **JWT** and **(OAuth2 - Google/GitHub)** support.
10. **CI/CD**: Generate config for **GitHub Actions**, **GitLab**, or **Jenkins**.
11. **Security Hardening**: Opt-in for enterprise-grade security tools like **Snyk** and **SonarQube** (if CI/CD is selected).
12. **Advanced Options**: Choose to unlock Resilience, Background Jobs, Observability (ELK), and Terraform.
13. **Resilience**: Select from **Timeout**, **Retry**, and **Circuit Breaker** patterns.
14. **Background Jobs**: Optional **BullMQ** + **Bull-Board** Task Queues (Requires Redis).
15. **Terraform (IaC)**: Scaffold AWS/GCP/Azure infrastructure files (**Standard** or **Production**).
16. **ELK Stack**: Optional **Elasticsearch & Kibana** integration for centralized logging.

## First Project Setup

Once generated, navigate to your project and install dependencies:

```bash
cd my-new-service
npm install
```

### Start Infrastructure
If you selected a database, Redis, or Kafka, start them using Docker Compose:

```bash
docker-compose up -d
```

### Run the App
Start the development server with hot-reload:

```bash
npm run dev
```
