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
docker-compose up -d

# Install dependencies
npm install

# Run in development mode
npm run dev
```

## License

ISC
