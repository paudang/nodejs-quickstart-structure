# Generator Flow Documentation

This document outlines the internal flow of the `nodejs-quickstart-structure` generator, including user options, the step-by-step generation process, and the resulting codebase structures.

## 1. Technologies Used

The `nodejs-quickstart-structure` CLI is built using the following key technologies:

*   **[Node.js](https://nodejs.org/)**: The runtime environment.
*   **[Commander.js](https://github.com/tj/commander.js)** (`^13.1.0`): For parsing command-line arguments and options.
*   **[Inquirer.js](https://github.com/SBoudrias/Inquirer.js)** (`^12.4.1`): For interactive command-line user interface (prompts).
*   **[Chalk](https://github.com/chalk/chalk)** (`^5.4.1`): For terminal string styling (color output).
*   **[EJS (Embedded JavaScript templates)](https://github.com/mde/ejs)** (`^3.1.10`): For templating files (dynamic content generation).
*   **[fs-extra](https://github.com/jprichardson/node-fs-extra)** (`^11.3.0`): For enhanced file system methods (copy, ensureDir, etc.).

## 2. User Choices (Cases)

The generator prompts the user for the following configurations. These determine the logic and structure of the generated project.

| Option | Choices | Default | Description |
| :--- | :--- | :--- | :--- |
| **Project Name** | Input String | `nodejs-service` | Name of the project directory. |
| **Language** | `JavaScript`, `TypeScript` | `TypeScript` | The programming language to use. |
| **Architecture** | `MVC`, `Clean Architecture` | `MVC` | The architectural pattern. |
| **View Engine** | `None`, `EJS`, `Pug` | `None` | (MVC Only) Template engine for server-side rendering. |
| **Database** | `None`, `MySQL`, `PostgreSQL`, `MongoDB` | `None` | The primary database. |
| **Database Name** | Input String | `demo` | The name of the database to use/create. |
| **Communication**| `REST APIs`, `GraphQL`, `Kafka` | `REST APIs` | The primary communication method. |
| **Caching Layer**| `None`, `Redis`, `Memory Cache` | `None` | (If DB selected) Caching solution. |
| **CI/CD Provider**| `None`, `GitHub Actions`, `Jenkins`| `None` | Setup for Continuous Integration/Deployment. |

## 3. Main Generator Flow

The `generateProject` function in `lib/generator.js` executes the following steps:

1.  **Create Project Directory**: Ensures the directory does not already exist and creates it.
2.  **Select & Copy Base Structure**:
    *   Based on **Architecture** (`mvc`/`clean-architecture`) and **Language** (`js`/`ts`), it selects the appropriate template from `templates/{arch}/{lang}`.
    *   Copies the entire base template to the target directory.
3.  **Render `package.json`**:
    *   Uses `templates/common/package.json.ejs`.
    *   Injects dependencies based on User Choices (DB drivers, view engines, etc.).
4.  **Render `docker-compose.yml`**:
    *   Uses `templates/common/docker-compose.yml.ejs`.
    *   Configures services (DB, Zookeeper/Kafka) based on selection.
    *   **Note**: If Database is `None`, DB services are excluded.
5.  **Render `README.md`**:
    *   Generates custom documentation specific to the selected stack.
6.  **Render `src/index.{js|ts}`**:
    *   Processes the entry point file to wire up the selected DB, Architecture, and Communication type.
    *   **GraphQL**: Wires up Apollo Server middleware with `formatError` hook for centralized error handling.
    *   **REST APIs / Kafka**: Registers `app.use(errorMiddleware)` at the end of the Express chain.
7.  **Error Middleware setup** (`renderErrorMiddleware`):
    *   Processes `errorMiddleware.{ts|js}.ejs` template from the target directory's `src/utils/` path.
    *   Renders to `src/utils/errorMiddleware.{ts|js}` in the generated project.
    *   **Clean Architecture**: Also handles `src/infrastructure/webserver/middleware/errorMiddleware.{js}` path.
8.  **Dynamic Component Generation**:
    *   **MVC**: Generates `userController` (imports specific DB service, uses `next(error)`).
    *   **Clean Architecture**: Generates `UserRepository` (infrastructure layer implementation).
    *   **Clean Architecture (JS only)**: Generates `server.js` (webserver setup).
9.  **Communication Setup**:
    *   **GraphQL**:
        *   Generates Apollo Server v4 schema (`typeDefs`) and resolvers.
        *   Configures `formatError` hook with `unwrapResolverError` for structured error mapping.
        *   Automatically embeds Apollo Sandbox with local CSP headers (no CDN dependency).
    *   **Kafka**:
        *   Copies Kafka client/service templates.
        *   **Clean Architecture Restructuring**:
            *   Moves service to `src/infrastructure/messaging`.
            *   Moves config to `src/infrastructure/config`.
            *   Removes REST-specific folders (`interfaces/routes`, `interfaces/controllers`).
        *   **MVC Cleanup**:
            *   If no View Engine is selected, removes `src/controllers` and `src/routes` (assumes pure worker).
10. **Common Configuration**:
    *   Copies `.gitignore`, `.dockerignore`, `Dockerfile`.
    *   Copies `tsconfig.json` (if TypeScript).
11. **Database Setup**:
    *   **MongoDB**: Sets up `migrate-mongo-config.js` and initial migration script.
    *   **SQL (MySQL/Postgres)**: Sets up `flyway/sql` directory and copies initial SQL migration files.
    *   **None**: Skips migration setup.
12. **Caching Setup**:
    *   **Redis**:
        *   Injects `ioredis` dependency into `package.json`.
        *   Generates `redisClient.{js|ts}` config.
        *   **MVC**: Injects generic caching logic into `userController`.
        *   **Clean Architecture**: Overwrites UseCases with caching-enabled versions.
    *   **Memory Cache**:
        *   Injects `node-cache` dependency.
        *   Generates `memoryCache.{js|ts}` config.
        *   **MVC/Clean**: Consumes the generic abstraction injected above.
13. **Database Connection Config**:
    *   Renders `database.{js|ts}` or `mongoose.{js|ts}` based on DB selection.
    *   Places it in `src/config` (MVC) or `src/infrastructure/database` (Clean Arch).
    *   **None**: Skips this step.
14. **Model Generation**:
    *   Renders `User` model (Mongoose schema or Sequelize/TypeORM model) in the appropriate directory.
    *   **None**: Generates a simple Mock Entity/Model class with in-memory data for testing.
15. **View Engine Setup (MVC)**:
    *   If selected, copies views (`views/ejs` or `views/pug`) and `public` assets.
16. **Swagger Config** (`renderSwaggerConfig`):
    *   If **REST APIs** is selected, generates `swagger.yml` and `swagger.{ts|js}` config.
    *   Cleans up `.ejs` template copies for non-REST configs (GraphQL, Kafka).
17. **Code Quality Setup**:
    *   Generates `.eslintrc.json`, `.prettierrc`, `.lintstagedrc`.
18. **Test Setup**:
    *   Generates `jest.config.js` and a sample `health.test.{js|ts}`.
19. **CI/CD Setup**:
    *   Helper: `setupCiCd`
    *   Checks `config.ciProvider`:
        *   **GitHub Actions**: Copies `.github/workflows/ci.yml`.
        *   **Jenkins**: Renders `Jenkinsfile`.
        *   **GitLab CI**: Renders `.gitlab-ci.yml` if selected.

## 4. TypeScript vs JavaScript Generation Steps

The logic handles language differences via conditional checks and file extensions (`langExt` variable).

| Step | JavaScript (`js`) | TypeScript (`ts`) |
| :--- | :--- | :--- |
| **Base Template** | `templates/{arch}/js` | `templates/{arch}/ts` |
| **Entry Point** | `src/index.js` | `src/index.ts` |
| **tsconfig.json** | Skipped | Copied from `templates/common/tsconfig.json` |
| **Linting** | Standard JS config | TS-specific parser and plugins in `.eslintrc` |
| **Database Config** | `mongoose.js` / `database.js` | `mongoose.ts` / `database.ts` |
| **Models/Controllers**| `.js` extension | `.ts` extension |
| **Build Step** | No compilation needed | Compilation typically handled by `tsc` or `ts-node` in dev |

## 5. Possible Codebase Structures

The final structure depends heavily on **Architecture**, **Communication**, and **View Engine**.

### Case A: MVC (REST API)
Standard architecture for web APIs.

```text
project-name/
├── src/
│   ├── config/         # Database, Redis, Swagger, etc.
│   ├── controllers/    # Request handlers (use next(error))
│   ├── errors/         # ApiError, NotFoundError, BadRequestError
│   ├── models/         # Database models
│   ├── routes/         # Express routes
│   ├── utils/
│   │   ├── errorMiddleware.{ts|js}  # Global error handler
│   │   ├── logger.{ts|js}
│   │   └── httpCodes.{ts|js}
│   └── index.js|ts     # Entry point (registers errorMiddleware last)
├── tests/              # Jest tests
├── package.json
├── Dockerfile
└── docker-compose.yml
```

### Case A2: MVC (GraphQL)
Apollo Server v4 mounted as Express middleware.

```text
project-name/
├── src/
│   ├── config/         # Database, Redis config
│   ├── controllers/    # GraphQL resolver backing logic (throws errors)
│   ├── errors/         # ApiError, NotFoundError, BadRequestError
│   ├── graphql/
│   │   ├── schema/     # typeDefs
│   │   └── resolvers/  # user.resolvers (calls controllers, throws errors)
│   ├── models/
│   ├── utils/
│   │   ├── errorMiddleware.{ts|js}  # Express-level fallback error handler
│   │   └── logger.{ts|js}
│   └── index.js|ts     # Apollo Server + formatError hook
└── ...
```

### Case B: MVC (Web App with Views)
Includes frontend views rendered on the server.

```text
project-name/
├── public/             # CSS, JS, Images
├── src/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── views/          # EJS or Pug templates
│   └── index.js|ts
└── ...
```

### Case C: Clean Architecture (REST API)
Separation of concerns with Domain, Use Cases, and Infrastructure.

```text
project-name/
├── src/
│   ├── domain/                 # Entities (Enterprise rules)
│   ├── errors/                 # ApiError, NotFoundError, BadRequestError
│   ├── usecases/               # Application business rules
│   ├── interfaces/             # Adapters
│   │   ├── controllers/        # Use next(error) for error propagation
│   │   └── routes/             # Pass NextFunction through handlers
│   ├── infrastructure/         # Frameworks & Drivers
│   │   ├── config/             # Environment config
│   │   ├── caching/            # Redis Client
│   │   ├── database/           # DB connection & models
│   │   ├── repositories/       # Data access implementation
│   │   └── webserver/
│   │       ├── middleware/
│   │       │   └── errorMiddleware.js  # JS only — Express error handler
│   │       └── server.js       # Express app setup
│   ├── utils/
│   │   └── errorMiddleware.ts  # TS — global error handler
│   └── index.js|ts              # Registers errorMiddleware after Apollo/Express
└── ...
```

### Case D: Clean Architecture (Kafka Worker)
Optimized for event-driven microservices. HTTP routes are removed.

```text
project-name/
├── src/
│   ├── domain/
│   ├── usecases/
│   ├── infrastructure/
│   │   ├── config/             # Includes Kafka config
│   │   ├── database/
│   │   ├── messaging/          # Kafka Client/Consumer
│   │   ├── repositories/
│   │   └── webserver/          # (Optional/Minimal)
│   └── index.js|ts
└── ...
```
