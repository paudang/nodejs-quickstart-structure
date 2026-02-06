# Node.js Quickstart Generator

A powerful CLI tool to scaffold production-ready Node.js microservices with built-in best practices, allowing you to choose between **MVC** or **Clean Architecture**, **JavaScript** or **TypeScript**, and your preferred database.

## Features

- **Interactive CLI**: Easy-to-use prompts to configure your project.
- **Multiple Architectures**: Supports both **MVC** (Model-View-Controller) and **Clean Architecture**.
- **Language Support**: Choose between **JavaScript** and **TypeScript**.
- **Database Integration**: Pre-configured setup for **MySQL** or **PostgreSQL**.
- **Microservices Ready**: Optional **Kafka** integration for event-driven communication.
- **Dockerized**: Automatically generates `docker-compose.yml` for DB, Kafka, and Zookeeper.
- **Database Migrations**: Integrated **Flyway** support for SQL migrations.
- **Professional Standards**: Generated projects come with highly professional, industry-standard tooling.

## 🏆 Professional Standards (New)

We don't just generate boilerplate; we generate **production-ready** foundations. Every project includes:

-   **🔍 Code Quality**: Pre-configured `Eslint` and `Prettier` for consistent coding standards.
-   **🛡️ Security**: Built-in `Helmet`, `HPP`, `CORS`, and Rate-Limiting middleware.
-   **🧪 Testing Strategy**: Integrated `Jest` and `Supertest` setup for Unit and Integration testing.
-   **🔄 CI/CD Support**: Optional **GitHub Actions** workflow integration.
-   **⚓ Git Hooks**: `Husky` and `Lint-Staged` to ensure no bad code is ever committed.
-   **🐳 DevOps**: Highly optimized **Multi-Stage Dockerfile** for small, secure production images.

## Installation

You can install the tool globally directly from GitHub:

```bash
npm install -g paudang/nodejs-quickstart-structure
```

### Manual Installation (For Development)

If you want to modify the CLI itself:

1.  Clone this repository:
    ```bash
    git clone https://github.com/paudang/nodejs-quickstart-structure.git
    cd nodejs-quickstart-structure
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Link globally:
    ```bash
    npm link
    ```

## Usage

Once installed, simply run the following command in any directory where you want to create a new project:

```bash
nodejs-quickstart init
```

### Configuration Options

The CLI will guide you through the following steps:

1.  **Project Name**: The name of the folder to create.
2.  **Language**: `JavaScript` or `TypeScript`.
3.  **Architecture**: `MVC` or `Clean Architecture`.
4.  **Database**: `MySQL` or `PostgreSQL`.
5.  **Database Name**: The name of the initial database.
6.  **Communication**: `REST APIs` (default) or `Kafka`.
7.  **CI/CD**: `Include GitHub Actions Workflow` (Optional).

## Generated Project Structure

The generated project will include:

-   `src/`: Source code (controllers, routes, services/use-cases).
-   `flyway/sql/`: SQL migration scripts.
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

## License

ISC
