# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.16.0] - 2026-03-14

### Added
- **Robust Kafka Singleton Implementation**: Refactored `KafkaService` to a strict singleton pattern across all architectures with `connectionPromise` and automated retry logic for resilient messaging.
- **BaseConsumer Standards**: Implemented constructor guards in `BaseConsumer` to prevent direct instantiation of abstract messaging classes.
- **Professional Docker Log Hygiene**: Added `NPM_CONFIG_UPDATE_NOTIFIER=false` to both builder and production stages to suppress non-essential npm upgrade notifications.

### Fixed
- **Docker Build & Type Safety**: Resolved a critical build failure in MVC TypeScript projects using EJS/Pug by addressing missing Express `Request` and `Response` type imports.
- **Network Resilience**: Removed redundant `npm install -g npm@latest` from the `Dockerfile` template to fix `ECONNRESET` failures during project verification on unstable networks.
- **Controller Testing Modernization**: Refactored `userController` spec templates (TS and JS) to correctly mock and verify the shared Kafka singleton, fixing persistent unit test failures.
- **Database Mocking Refinement**: Resolved a data flow bug in the "None" database mock where generated IDs were being overwritten, and enhanced TypeScript types to eliminate `any` in repository patterns.

## [1.15.1] - 2026-03-12

### Added
- **Magic AI Scaffolding**: Automated AI context generation ( `.cursorrules`, `prompts/`) by intelligently inferring project goals from the project name, removing the need for manual business domain prompts.
- **Enhanced README**: Added specialized guidance for AI-native development with Cursor and LLMs.

### Fixed
- **GitHub Actions Compliance**: Fully resolved Node.js 20 deprecation warnings by moving `FORCE_JAVASCRIPT_ACTIONS_TO_NODE24` to global workflow scope.
- **CI Modernization**: Upgraded daily audit and GitLab CI runners to Node.js 22.
- **CI Enforcement**: Updated all CI/CD templates (GitHub, GitLab, Jenkins) to strictly enforce the >70% test coverage gate.

## [1.15.0] - 2026-03-12
### Added
- **AI-Native Scaffolding & Agent Skill Templates:**
  - Added a new CLI prompt for `businessDomain` to inject custom domain knowledge into generated templates.
  - Generates a `.cursorrules` file at the root to enforce >70% Test coverage and Architecture patterns automatically for AI Code Editors.
  - Scaffolds a `prompts/` directory with specialized Agent Skill templates (`project-context.md`, `add-feature.md`, `troubleshoot.md`) designed to provide deep structural understanding to LLMs like ChatGPT or Claude.
  - Added an "AI-Native Development" section to the generated `README.md` and prominent print messages in the CLI upon successful completion.

## [1.14.0] - 2026-03-09
### Added
- **Unit test:**
  - Unit Testing Framework: Integrated Jest and ts-jest as the core testing suite.

  - Scaffolding Logic: Automatically generates .spec.ts files in the tests/ directory mirroring the src/ structure during project initialization.

  - Quality Gates: Implemented a mandatory Coverage Threshold (>=70%) for lines and functions to ensure long-term maintainability.

  - Mocking Standards: Included pre-configured mocks for Mongoose (database pings) and Express request/response objects.

  - NPM Scripts: Added npm test, npm run test:watch, and npm run test:coverage for seamless developer workflow.

## [1.13.0] - 2026-03-05
### Added
- **Enhanced Health Check System:**
  - Standardized health logic for both MVC and Clean Architecture.
  - Deep verification: Automatically pings the selected database (MySQL, PostgreSQL, MongoDB) during health checks and returns a `DOWN` status with 500 code if the connection is lost.
  - Structured response including `uptime`, `memoryUsage`, `database` connectivity status, and `timestamp`.
- **Improved Graceful Shutdown:**
  - Standardized signal handling (`SIGINT`, `SIGTERM`) across all architecture types to ensure clean disposal of database and caching resources.
  - Integrated proper shutdown sequences for Redis, MySQL, PostgreSQL, and MongoDB.

## [1.12.0] - 2026-03-04
### Added
- **Zod Environment Validation:** Replaced manual `dotenv` process calls in server entry points with a centralized schema parser.
  - Automatically generates `src/config/env.ts` (or `.js`) evaluating `NODE_ENV`, `PORT`, and strictly mapping database, cache, and Kafka connection definitions gracefully crashing the app at startup if missing.
- **PM2 Deployment Configuration:** Natively supports PM2 ecosystem clustering for VPS and EC2 configurations out-of-the-box.
  - Generates `ecosystem.config.js` intelligently mapping dynamic environments for Redis, Databases, and Kafka without user prompts.
  - Modifies `package.json` with an out-of-the-box `npm run deploy` script bound to `pm2 start ecosystem.config.js --env production`.
  - Upgraded generated README deployment guides for transparent CLI instruction workflows outlining the contrast between running Docker vs PM2.

## [1.11.1] - 2026-03-03
### Fixed
- Fixed relative import paths in Clean Architecture JS `errorMiddleware.js` — changed to correct 3-level relative paths (`../../../`).

## [1.11.0] - 2026-03-02
### Added
- **Centralized Error Handling Mechanism:** All generated projects now include a standardized, predictable error response structure for both REST APIs and GraphQL communication types.
  - New `src/errors/` directory with custom error classes: `ApiError`, `NotFoundError`, `BadRequestError`.
  - New `error.middleware.{ts|js}` global error handler placed at the end of the Express middleware chain in `src/utils/` (MVC) and `src/utils/` + `src/infrastructure/webserver/middleware/` (Clean Architecture).
  - Integrates `winston` logger to automatically log 500-level errors to persistent log files.
  - All controllers updated to pass errors via `next(error)` instead of manually sending responses.
  - **GraphQL:** Apollo Server `formatError` hook configured with `unwrapResolverError` to intercept resolver errors and map `ApiError` instances to structured GraphQL extension codes.
  - **REST APIs:** Express error middleware returns a consistent `{ statusCode, message, stack? }` JSON body.
- **Error Response Standardization:** All error responses follow the same schema regardless of database, caching, or communication type selected.

### Fixed
- Fixed `swagger.js` / `swagger.yml` being incorrectly generated for non-REST API configurations (GraphQL, Kafka). Converted static `swagger.js` to `swagger.js.ejs` in MVC JS and Clean Architecture JS templates so `renderSwaggerConfig` can conditionally control its generation.
- Fixed `userRoutes.ts` in Clean Architecture TypeScript template not passing `NextFunction` to controller methods, causing `TypeScript TS2554: Expected 3 arguments` compile errors during Docker builds.
- Fixed incorrect relative import paths (`../../../../`) in Clean Architecture JS `errorMiddleware.js` — changed to correct 3-level relative paths (`../../../`).
- Fixed `HTTP_STATUS` being imported without destructuring from `httpCodes.js` (which uses a plain `module.exports = HTTP_STATUS` default export), causing `Cannot read properties of undefined` runtime errors.
- Fixed `renderErrorMiddleware` in `app-setup.js` deleting from the **template source directory** instead of the generated project's target directory. This caused error middleware templates to disappear from disk after the first test run, breaking all subsequent generations.

## [1.10.1] - 2026-03-02
### Added
-  Roadmap & Upcoming Features. **[View our Public Roadmap on Trello](https://trello.com/b/TPTo8ylF/nodejs-quickstart-structure-product)**
-  Update start app with npx command.

## [1.10.0] - 2026-02-27
### Added
- **GraphQL Support:** The generator now supports scaffolding GraphQL APIs using Apollo Server (v4) alongside standard REST APIs. This feature includes built-in integrations for both MVC and Clean Architecture designs across TypeScript and JavaScript.
  - Generates strongly-typed schemas (`typeDefs`) and structured `resolvers`.
  - Automatically provisions Apollo Sandbox for local development.
  - Integrates smoothly with existing databases (MySQL, PostgreSQL, MongoDB) and caching (Redis, Memory Cache) layouts.
- Automatically configures Content Security Policy (Helmet) to allow embeddable Apollo Sandbox UI out of the box.

## [1.9.4] - 2026-02-26
### Fixed
- Fixed intermittent "Health check timeout" errors in concurrent (concurrency > 1) E2E validation scripts. Increased the total verification timeout window to 120s to accommodate heavy Docker image cluster instantiations (Kafka/MySQL/Redis), and enhanced the Node.js `fetch` client to use `127.0.0.1` IPv4 loopback resolution alongside strict 5-second `AbortSignal` timeouts to mitigate dangling TCP connections resulting from overloaded internal Docker proxy bridges.
- Fixed an `EBADENGINE` compatibility issue during Docker builds by upgrading the default template `Dockerfile` base image from `node:18-alpine` to `node:22-alpine`, supporting modern dependencies like `eslint@9` and `cpx2`.
- Fixed a port collision bug (`Bind for 0.0.0.0:6379 failed: port is already allocated`) during parallel E2E testing. The `validation-core.js` script now dynamically assigns random network ports for `REDIS_PORT` when running concurrent testing matrices.

## [1.9.3] - 2026-02-26
### Added
- Refactored Swagger documentation to use a standalone `swagger.yml` file instead of inline JSDoc comments across all templates (MVC, Clean Architecture, TS, and JS).
- Integrated `yamljs` to parse the `swagger.yml` file and removed the `swagger-jsdoc` dependency, significantly reducing boilerplate in route files.

### Fixed
- Fixed an issue in `package.json.ejs` where `jest` configuration had malformed JSON due to whitespace stripping.
- Fixed a Docker build crash for non-REST API projects caused by the build script unconditionally attempting to copy `swagger.yml` using `cpx2`.

## [1.9.2] - 2026-02-23
### Fixed
- Fixed an issue where the generator output misleading instructions (`DATABASE_URL`) for standalone `docker run` executions. The CLI success commands and `README.md` now conditionally include dynamic compose network bindings (`--network`) and accurate environment variables matching the user's selected DB stack.
- Fixed a bug where `DB_PASSWORD` in `database.ts.ejs` and `database.js.ejs` defaulted to `postgres` instead of `root` for PostgreSQL configurations, causing standalone Node local servers (`npm run dev`) to fail connection handshakes with default `docker-compose` clusters. 

## [1.9.1] - 2026-02-22
### Added
- Implemented **Daily Template Vulnerability Audit** via GitHub Actions (`.github/workflows/daily-audit.yml`). A custom script now parses `package.json.ejs` daily to proactively scan for high-severity vulnerabilities in generated dependencies, ensuring generated projects are eternally secure.
- Added built-in **Memory Cache** (`node-cache`) integration as an alternative caching layer alongside Redis.
- Scaled up the generator matrix, now supporting over **160 Core Combinations** and **320 Total Scenarios** (including CI/CD pipelines).
- Configured dynamic cache service imports across both MVC and Clean Architecture controllers/usecases.

### Fixed
- Fixed an ESLint TypeScript parsing error (`Type expected`) caused by unescaped EJS template variables in Clean Architecture usecases.
- Fixed a CLI execution bug where unquoted caching parameters (like `"Memory Cache"`) caused test validation failures.
- Updated the E2E Windows Validation test core to evaluate ESLint flat config files (`eslint.config.mjs`) instead of `.eslintrc.json`.

## [1.8.2] - 2026-02-22
### Fixed
- Hotfix: Changed `cpx2` command to its actual executable binary `cpx` in the build script. This resolves `sh: cpx2: not found` failures when running `npm run build` or `docker-compose up --build`.

## [1.8.1] - 2026-02-22
### Security
- Resolved all high-severity npm vulnerabilities (0 vulnerabilities detected on install).
- Upgraded ESLint to v9 and `typescript-eslint` to v8, migrating generated templates from `.eslintrc.json` to Flat Config (`eslint.config.mjs`) to eliminate deprecated `eslint@8` transitive dependencies.
- Upgraded `supertest` to v7, `rimraf` to v6, and `ejs` to v3.1.10.
- Replaced vulnerable `copyfiles` dependency with `cpx2` for view template orchestration.
- Configured npm `overrides` for `minimatch@^10.2.1` to patch outdated `jest` sub-dependencies without breaking the test runner.

### Fixed
- Fixed `npm install` crashing due to `husky install` expecting an initialized `.git` directory by adding a graceful fallback wrapper.

## [1.8.0] - 2026-02-18
### Added
- Introduced **GitLab CI/CD pipeline support**:
  - Preconfigured `.gitlab-ci.yml` for automated build, test, and deploy steps.
  - End-to-end (e2e) test job included to ensure project reliability.
  - Aligns with existing GitHub Actions and Jenkins workflows for consistent CI/CD coverage.

### Improved
- Documentation updated to highlight GitLab CI/CD as a supported option.
- Enhanced CI/CD setup instructions in `README.md` for multi-platform pipelines.

## [1.7.5] - 2026-02-17
> Happy Lunar New Year! This release coincides with Tet Vietnam. 🎆
### Fixed
- Optimized `scripts/validate-windows.js` to use `--no-audit --no-fund --loglevel=error` during `npm install`, resolving intermittent CI failures on Windows.
- Fixed 7 failing test cases involving Kafka and Redis combinations.

## [1.7.4] - 2026-02-17
### Fixed
- Resolved `JSON.parse` error and incorrect Redis arguments in `getAllUsers` usecase for Clean Architecture templates.
- Fixed `SyntaxError` in `lib/modules/caching-setup.js` preventing project generation.

### Added
- Implemented automatic cache invalidation in `createUser` usecase (Clean Architecture) to ensure data consistency.

## [1.7.0]

### Added
- Added support for Redis caching in both MVC and Clean Architecture.

## [1.6.1] - 2026-02-11

### Fixed
- Included `CHANGELOG.md` in the published npm package so users can see version history.
- Updated `README.md` with details on 64+ supported project combinations.

## [1.6.0] - 2026-02-10

### Refactored
- Modularized `lib/generator.js` into distinct modules (`lib/modules/`) for better maintainability.
- Extracted logic for project setup, config files, database, app setup, and Kafka.

### Fixed
- Resolved syntax error in `UserRepository.js` for Clean Architecture projects with 'None' database.
- Increased health check timeout to 60s in validation scripts to prevent false positives in heavy environments (MySQL + Kafka).
- Fixed missing `src/views` copy logic for MVC projects, resolving Docker build errors.
- Corrected CLI argument parsing to properly exclude undefined flags (e.g., `--db-name`).
- Removed obsolete `version: '3.8'` from `docker-compose.yml`.

## [1.5.0] - 2026-02-10

### Added
- Implemented structured logging with `winston-daily-rotate-file` (14-day retention, daily rotation).
- Added HTTP request logging using `morgan` middleware.

### Fixed
- Resolved `EACCES` permission errors for log directories in Docker.

## [1.4.5] - 2026-02-10

### Changed
- Bumped version to 1.4.5.

## [1.4.4] - 2026-02-10

### Added
- Created `CHANGELOG.md` to track release history.

## [1.4.3] - 2026-02-10

### Fixed
- Updated CLI help text description to include MongoDB support.
- Fixed unexpected character issues in npm scripts.
- General bug fixes and improvements.

## [1.0.0] - 2026-02-03

### Added
- Initial release of `nodejs-quickstart-structure`.
- Scaffolding for MVC and Clean Architecture.
- Support for Express.js.
- Database integration (MongoDB, MySQL, PostgreSQL)
