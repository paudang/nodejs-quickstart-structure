# Getting Started

Follow these steps to get your first service up and running.

## Prerequisites

-   **Node.js** (v18 or higher)
-   **Docker & Docker Compose** (for infrastructure like databases, Redis, or Kafka)

## Installation

You can run the generator directly using `npx`:

```bash
npx nodejs-quickstart init
```

*Alternatively, install it globally:*

```bash
npm install -g nodejs-quickstart-structure
nodejs-quickstart init
```

## Quick Start (Interactive Setup)

When you run the `init` command, you'll be prompted for:

1.  **Project Name**: The name of your service directory.
2.  **Language**: Choose between **TypeScript** (Recommended) or **JavaScript**.
3.  **Architecture**: Select **MVC** or **Clean Architecture**.
4.  **View Engine**: If MVC is selected, pick **None**, **EJS**, or **Pug**.
5.  **Database**: Pick **MySQL**, **PostgreSQL**, **MongoDB**, or **None**.
6.  **Database Name**: Specify your database name (if a database is selected).
7.  **Communication**: Select **REST APIs**, **GraphQL**, or **Kafka**.
8.  **Caching**: Add **Redis** or **Memory Cache**.
9.  **CI/CD**: Generate config for **GitHub Actions**, **GitLab**, or **Jenkins**.
10. **Security Hardening**: Opt-in for enterprise-grade security tools like **Snyk** and **SonarQube** (if CI/CD is selected).

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
