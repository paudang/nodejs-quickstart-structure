and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.8.1] - 2026-06-29

### Added
- **Multi-Language (i18n) Documentation Parity**: Fully localized all core blueprints, features, guide, and infrastructure pages into 100% Vietnamese and Simplified Chinese.
- **Client-Side Locale Routing Interception**: Overrode `router.go` in VitePress theme configuration to preserve subpage paths when changing languages, ensuring a seamless user experience instead of redirecting to the homepage.
- **Localized Alert Containers**: Localized custom container headings (`[!TIP]`, `[!WARNING]`, `[!IMPORTANT]`, `[!CAUTION]`) into native Vietnamese (`Mẹo`, `Cảnh báo`, `Quan trọng`, `Cẩn trọng`) and Chinese (`提示`, `警告`, `重要`, `注意`).
- **Global Theme Localization**: Added native translation configurations for outline headers ("On this page") and top buttons ("Return to top") for Vietnamese and Chinese locales.
- **Game Localization**: Fully translated titles, hubs, configurations, drag-and-drop labels, and verification logs in `ArcadeHub.vue`, `SkillTreeGame.vue`, and `FactorioGame.vue`.

### Fixed
- **Markdown Rendering Layouts**: Resolved syntax formatting errors where un-escaped code blocks and headers merged on the same line, fixing broken sidebar and page layouts in localized documentation.

## [2.8.0] - 2026-06-16

### Added
- **The Generator Multiverse (Gamification)**: Introduced a revolutionary interactive web configurator experience featuring two distinct "Arcade" modes:
  - **The Architecture Skill Tree**: An RPG-style tech tree that teaches users how to build an enterprise application systematically from the ground up.
  - **Backend Factorio Builder**: A drag-and-drop puzzle game where users build pipelines capable of handling 1000 Req/s load.
- **Dynamic 100% Feature Parity**: The gamified modes map 1:1 with the CLI commands, fully supporting complex options like Cloud IaC (Terraform), CI/CD (GitHub/GitLab), Auth, and ELK Stack.
- **Comprehensive Unit Testing Coverage**: Enforced mathematical correctness between the gamified UI and the core validation engine (`13/13` test scenarios).
- **VitePress UI Polish**: Revamped the `docs/index.md` homepage with a new "Gamified Builder" hero button and a combined 6-grid feature layout. Added a dedicated `/play` interactive route.

### Security
- **0-Vulnerability Baseline (Snyk & NPM Audit)**: 
  - Resolved `High Severity` vulnerabilities by updating `express` to `^4.21.2` in generated templates.
  - Mitigated `eval` vulnerabilities in `elastic-apm-node` by bumping `@elastic/elasticsearch` to `^8.17.0`.
  - Added strict package `overrides` for `vite` (`^6.4.3`), `js-yaml` (`^4.1.2`), `cookie` (`^0.7.2`), `cross-spawn` (`^7.0.6`), and `@opentelemetry/core` (`^1.30.1`) across the main CLI repository and generated project templates to guarantee a pristine `npm audit` and `snyk test` status.

## [2.7.2] - 2026-06-15

### Fixed
- **VitePress & esbuild Dependency Resolution**: Fixed a vulnerability in `esbuild` by updating the `package.json` override to `^0.28.1`. Resolved subsequent Vite build errors ("Transforming destructuring to the configured target environment is not supported yet") by explicitly configuring Vite's `esbuildOptions.target` and `build.target` to `esnext` in `docs/.vitepress/config.mjs`.
## [2.7.1] - 2026-06-11

### Fixed
- **CLI Auto-Gen Execution Halt**: Resolved an issue where the CLI generator inadvertently paused to prompt for Authentication Mode when users executed an auto-generated command using the `--no-advanced-options` flag.
  - Reverted the `authChoice` interactive prompt sequence to its original chronological location to maintain UX familiarity.
  - Patched the VitePress Web Configurator to explicitly output the `--auth None` flag when advanced options are disabled, guaranteeing 100% automated scaffolding without manual blocking.
- **Web UI Cloud Provider Fallback**: Fixed an issue in the Web Configurator where toggling Infrastructure (Terraform) from 'None' to an active state could result in an empty Cloud Provider. It now reliably forces `AWS` as the default provider upon toggle.

## [2.7.0] - 2026-06-11

### Added
- **Background Jobs & Task Queues (BullMQ)**: Implemented BullMQ with Redis backing for asynchronous task processing (`--background-jobs`). Includes an out-of-the-box `Bull-Board` UI endpoint for real-time monitoring of queues.
- **Smart NLP Use-Case Auto-Mapping**: Upgraded the local NLP heuristics engine in the Web Configurator to detect `Movie/Media Streaming`, `Game/Chat App`, and `Admin Dashboard` intents, automatically mapping users to optimal architectural stacks (e.g., MVC + MongoDB + Redis + Background Jobs).
- **NLP Typo Resilience**: Enhanced the NLP regex to gracefully parse common user typos like `backgound job`.
- **Comprehensive Troubleshooting Guide**: Added a dedicated `troubleshooting.md` documentation page detailing Queue behaviors, Idempotency patterns, and Redis `MaxRetriesPerRequestError` handling within Docker containers.

### Changed
- **E2E & Unit Testing Expansion**: Integrated robust `.spec` unit tests for Queue workflows natively into the generated project. Refactored test templates to dynamically utilize absolute path aliases (`@/`) for strict ESLint compliance and `import/no-unresolved` resolution. E2E validation matrix automatically supports `--background-jobs` flags.

## [2.6.0] - 2026-05-31

### Added
- **AI Smart Heuristic Engine (Web UI)**: Completely rewrote the NLP parsing engine for the VitePress Web Configurator to execute locally with 0ms latency.
  - **Multi-Language Mastery**: Full semantic support for English, Vietnamese, Chinese, Japanese, and Hindi.
  - **Backward-Facing Negation**: Precisely handles Japanese (`なし`, `いらない`) and Hindi (`nahi`) backward negations, along with standard forward-facing negations (`without`, `không`, `don't`).
  - **Bulletproof XSS Sanitization**: Automatically sanitizes extracted project boundaries and custom database names against malicious code injection.
  - **79-Case Destruction Testing Suite**: Proven stability against fuzzing, spamming, and double negation inputs.
- **Configurator UI Polish**: Added dynamic "Thinking Logs", elegant layout spacing, and a disclaimer tooltip to better manage NLP parsing expectations.

## [2.5.1] - 2026-05-31

### Changed
- **Dependencies Upgrade**: Upgraded core libraries to their latest versions:
  - `commander`: Upgraded from `^14.0.3` to `^15.0.0`.
  - `ejs`: Upgraded from `^5.0.1` to `^6.0.1`.
  - `inquirer`: Upgraded from `^13.3.2` to `^14.0.1`.

### Fixed
- **CLI Validate Command**: Fixed a blocking issue in `scripts/validate-command.js` where the script hung on the interactive `withELK` prompt when `advancedOptions` was enabled. Passed `--no-with-elk` to bypass the prompt.

## [2.5.0] - 2026-05-29

### Added
- **Multi-Cloud Terraform Scaffolding**: Expanded Terraform support beyond AWS to include fully native, production-ready modules for **Google Cloud (GCP)** and **Microsoft Azure**.
  - **GCP**: Implemented VPCs, Cloud NAT, Compute Engine, and Cloud SQL using Google's best practices.
  - **Azure**: Implemented VNets, NAT Gateways, Virtual Machines (with dynamic SSH key generation via `tls_private_key`), and Flexible Server.
- **Unified Infrastructure Documentation**: Consolidated cloud-specific documentation into a single, cohesive `terraform.md` guide utilizing VitePress code groups for seamless multi-platform tutorials.
- **ELK Native Winston Integration (Big Tech Standard)**: Replaced blocking manual streams with native `winston-elasticsearch` for automatic, background-batched log shipping to Elasticsearch without blocking the main event loop.

### Changed
- **System Design 6-Phase Flow**: Refactored the CLI prompts and Web Configurator (UI) layout to logically follow a 6-phase System Design architecture (Core -> Architecture -> Data -> Auth -> DevOps -> Advanced). Decoupled Authentication and Caching dependencies to unlock **1.41M+ mathematically verified project scenarios** (up from 887K).
- **Cloud-Agnostic Validation Core**: Updated `validation-core.js` to intelligently default Docker E2E testing to AWS to optimize CI pipeline speed while guaranteeing mathematical equivalence across cloud providers.
- **Dynamic Auth Controllers**: Optimized `authController` templates to strip out unused OAuth state cookies (dead code) when social logins are excluded.

### Fixed
- **0-Vulnerability Baseline (NPM Overrides)**: Enforced strict dependency overrides in templates for `cookie` and `uuid` (fixing nested Snyk vulnerabilities from `elastic-apm-node` and `sequelize`), guaranteeing clean `npm audit` on fresh projects.
- **Jest Mock Robustness**: Fixed a severe test pollution and syntax crash (`printf is not a function`) by correcting the `winston.format` mock execution order and adding missing formatters, restoring 100% stability to CI pipelines.
- **Docker E2E Cleanup**: Fixed validation scripts to gracefully destroy ELK networks and volumes (`docker-compose.elk.yml down -v`) between E2E runs, eliminating hanging `EADDRINUSE` port lockups.

## [2.4.0] - 2026-05-25

### Added
- **Enterprise Application Resilience**: Introduced the "Holy Trinity" of resilience patterns to prevent cascading failures in distributed systems.
  - **Timeout**: Protects against resource exhaustion from hanging downstream calls.
  - **Advanced Retry**: Built-in exponential backoff and Jitter to gracefully handle transient network blips and mitigate Thundering Herd scenarios.
  - **Circuit Breaker**: "Big Tech" standard circuit breaker that fails fast, sheds load during outages, and isolates failing downstream services with strict concurrency guards during the `HALF_OPEN` recovery state.
- **AI-Native Context Upgrade**: Upgraded the internal `.cursorrules` and Agent Skill Prompts (`add-feature.md`, `troubleshoot.md`) to dynamically inject Resilience awareness, empowering AI coding assistants to actively utilize `src/utils/resilience` when building new features.
- **VitePress Resilience Documentation**: Added comprehensive, tabbed (TypeScript/JavaScript) guides explaining the architecture and usage of the new resilience features.
- **Docker Zero-Warning Standard**: Updated all `Dockerfile` templates to enforce modern NPM installation practices (`--omit=dev`) and remove build-time cruft (npm/npx binaries, cache folders), ensuring production images are built with **zero warnings** and significantly reduced attack surfaces.

## [2.3.0] - 2026-05-21

### Added
- **Terraform Infrastructure Integration (IaC)**: Integrated modular, production-ready AWS Terraform templates with Multi-AZ VPC network isolation, WAF, ALB, RDS, and ElastiCache.
- **Expanded Validation Matrix**: Scaled the mathematical validation matrix to **23,760+ unique project scenarios** (representing an 8x expansion for Resilience patterns), ensuring 100% template rendering accuracy across all permutations including the new Infrastructure options.

## [2.2.1] - 2026-05-12

### Added
- **Secure OAuth CSRF Protection**: Implemented robust state-validation using cryptographically secure random tokens and `HttpOnly` cookies to mitigate CSRF attacks in social authentication flows.
- **Improved CLI Robustness**: Enhanced argument parsing to support comma-separated strings for variadic flags like `--social-auth` and `--auth`.

### Fixed
- **Architectural Parity & Type Safety**: Standardized `HTTP_STATUS.FORBIDDEN` across all templates and resolved TypeScript type inference issues (`never` type) in generated Clean Architecture controllers.

## [2.2.0] - 2026-05-05

### Added
- **Social Login Support**: Integrated Google and GitHub authentication into the Clean Architecture and MVC templates.
- **Expanded Validation Matrix**: Scaled the mathematical validation matrix to **7,920+ unique project scenarios**, ensuring 100% template rendering accuracy across all permutations.

### Changed
- **Clean Architecture Restructuring**: Moved use cases from `src/domain/usecases` to `src/usecases` (Application Layer) to strictly follow architectural boundaries.
- **Improved EJS Alignment**: Optimized all templates with whitespace-slurping tags (`<%_`, `_%>`) to eliminate redundant blank lines in generated code.
- **Environment Validation**: Added social authentication credentials to Zod-based environment schemas.
 
## [2.1.2] - 2026-04-27

### Changed
- **Security Hardening**: Updated `postcss` to `^8.5.10` in project overrides to resolve potential security vulnerabilities and improve build stability.

## [2.1.1] - 2026-04-24

### Fixed
- **Template Security Hardening**: Resolved missing buffer bounds check vulnerability in `uuid` (GHSA-w5hq-g745-h8pq) by adding `"uuid": "^14.0.0"` to template `overrides`.
- **Template Formatting**: Fixed an issue in `package.json.ejs` causing unexpected empty lines between generated dependencies.
- **Unit Test Stability**: Resolved persistent `SyntaxError` and `TypeError` in Jest unit tests across all architecture permutations by implementing ESM-compatible transformation patterns for `uuid` and standardizing on `jest.clearAllMocks()` with factory mocks.

### Changed
- **Documentation Refinement**: Remade `README.md` and removed emojis for a cleaner, more professional, text-only presentation across the VitePress-based site.

## [2.1.0] - 2026-04-20


### Added
- **Pluggable JWT Authentication**: Introduced a robust, production-ready authentication system.
  - Supports **Access & Refresh Token Rotation** for enhanced security.
  - Integrated **Token Revocation (Blacklisting)** via Redis or Memory Cache.
  - Secure logout flows and theft detection for refresh tokens.
  - Seamless integration with both REST and GraphQL protocols across all architectures.
- **VitePress Documentation Upgrade**: Detailed [Authentication Blueprint](https://paudang.github.io/nodejs-quickstart-structure/blueprints/authentication) and cross-feature documentation updates.
- **Security Hardening**: Resolved moderate vulnerabilities in `vite` and `vitepress` by implementing version overrides and dependency upgrades (VitePress v1.6.4+).
- **Interactive README 2.0**: Completely redesigned the project landing page with a "Choose Your Journey" dual-workflow (Web UI vs CLI) and visual action previews.

---

## [2.0.1] - 2026-04-07

### Added
- **Universal CI/CD Support (Phase 8)**: Expanded the generator's CI/CD capabilities to include out-of-the-box support for **Bitbucket Pipelines** and **CircleCI**.
- **Modernized Pipe & Orb Integration**: 
  - Bitbucket templates now utilize official Atlassian Pipes for automated Snyk security scans and SonarCloud analysis.
  - CircleCI configurations (v2.1) are optimized with official Orbs (`circleci/node`, `snyk/snyk`) for advanced dependency caching and security execution.
- **Project Blueprints (CI/CD Guide)**: Launched a comprehensive "CI/CD Setup Guide" in the VitePress documentation, providing step-by-step configuration workflows for all 5 supported platforms (GitHub, GitLab, Jenkins, Bitbucket, CircleCI).
- **CLI Ecosystem Sync**: Updated the interactive prompts and command-line flags to seamlessly integrate the new CI/CD choices while maintaining 100% backward compatibility.
- **Enterprise Readness Documentation**: Updated the generated `README.md` templates to officially include Bitbucket and CircleCI in the supported feature set.


## [2.0.0] - 2026-04-02

### Added
- **Next-Gen Web UI Configurator (v2.0.0)**: Launched a fully interactive, browser-based visual generator featuring real-time architecture visualization. 
- **1,680+ Combinations Automated**: Mapped out the entire 1:1 file logic for the permutations mathematically validated across Clean Architecture, MVC, WebSockets, Kafka, Docker, databases, etc.
- **AI-Native Discovery Protocol**: Integrated `llms.txt` standards across the repository and documentation to provide explicit architectural context for AI coding assistants (Claude, GPT-4, Cursor).
- **Growth-Driven Developer Experience**: Orchestrated a high-conversion "Star on GitHub" funnel within the CLI and Web Configurator to bridge the gap between downloads and community support.
- **Zero-Impact CLI Parity**: Advanced flag generation system in the Web UI allows 1-click clipboard exporting to seamlessly execute the backend `init` command without hanging on any interactive prompts.
- **Exhaustive 1,680 Validation Script**: Introduced automation logic to assert successful output generation spanning every configuration option matrix.
- **Strategic Social Proof**: Re-engineered the project's documentation and landing page to emphasize real-world adoption (4,000+ downloads) and architectural credibility.

## [1.19.1] - 2026-04-01

### Fixed
- **Template Security Hardening**: Resolved moderate Prototype Pollution vulnerability in `lodash` (GHSA-xxjr-mmjv-4gpg) by implementing a targeted `override` to version `^4.17.23` in generated templates.
- **Dependency Modernization**: Updated `jake` override to `^11.9.5` (latest version) across all project templates.
- **E2E Verified**: Validated the fix across multiple scenarios (JS/TS, MVC/Clean, MySQL/MongoDB/GraphQL) via Windows E2E tests with Docker, ensuring 0 vulnerabilities and 100% functional reliability.


## [1.19.0] - 2026-03-28

### Added
- **Security Hardening**: Added `SECURITY.md` file to the project.
- **Git Attributes**: Added `.gitattributes` file to the project.
- **Contributing Guide**: Added `CONTRIBUTING.md` file to the project.

## [1.18.1] - 2026-03-27

### Fixed
- **Template Security Hardening**: Resolved 29 vulnerabilities in `package.json.ejs` by upgrading `Apollo Server`, `Jest`, and `ESLint`.
- **Apollo Server 5 Compatibility**: Migrated GraphQL integration to use `@as-integrations/express4`, resolving breaking changes in the latest Apollo release.
- **Surgical Security Overrides**: Implemented targeted `overrides` for `brace-expansion`, `jake`, and `micromatch`. Removed global `glob/minimatch` overrides to maintain compatibility with Jest's internal APIs while preserving a "Zero-Vulnerability" status.
- **E2E Validated**: Verified the entire "Secure-by-Default" ecosystem via Windows E2E tests, achieving 100% pass rate.
- **Enterprise Standards**: Synchronized all generator templates with the latest secure dependency standards across MVC and Clean Architecture.
### Changed
- **Readme**: Standardize Generated Project README.

## [1.18.0] - 2026-03-25

### Added
- **Enterprise-Grade Security Hardening**: Integrated **Snyk (SCA)** and **SonarQube (SAST)** into the project scaffolding, providing "Big Tech" industry-standard security analysis out of the box.
- **Automated Security Workflows**: Pre-configured CI/CD stages for security scanning across GitHub Actions, GitLab CI, and Jenkins.
- **Pre-commit Security Gates**: Integrated **Husky** and **lint-staged** to automatically enforce code quality and security standards locally before every commit.
- **Security Standard Enforcement**: Added a standardized `SECURITY.md` policy and automated quality gates to ensure code resilience.
- **Comprehensive Security Guide**: Created a new documentation guide detailing the setup and operational workflows for the enterprise security features.

### Changed
- **Matrix Expansion**: Updated the CLI to support over **1,680+ project combinations** by adding a conditional security hardening layer across all CI/CD providers.

### Fixed
- **Docker Node Version**: Updated Docker node version to 22.22.2-trixie-slim

## [1.17.0] - 2026-03-23

### Added
- **Kafka KRaft Mode Integration**: Modernized Kafka setups across all templates (MVC & Clean Architecture) by completely removing the Zookeeper dependency and enabling KRaft mode in `docker-compose.yml`, reducing project orchestration overhead.
- **End-to-End (E2E) Verification Framework**: Implemented dedicated Docker container targeted end-to-end tests (`tests/e2e/`) utilizing Supertest via dynamic `SERVER_URL` mapping to eliminate port collisions and test the fully assembled container cluster directly.
- **Enhanced Validation Pipelines**: Automatically executes the `npm run test:e2e` suite at the conclusion of internal validations across the entire platform matrix for improved CI accountability.

### Refactored
- **Test Directory Strict Isolation**: Restructured internal code generation workflows (`lib/modules/`) to pipe all generated `.spec` files strictly into a dedicated `tests/unit/` subdirectory, cleanly abstracting unit specifications from end-to-end specifications.

## [1.16.2] - 2026-03-19

### Changed
- **Major Dependency Upgrades**: Upgraded core CLI dependencies to their latest stable versions for better performance and security:
  - `commander`: Upgraded from `^13.1.0` to `^14.0.3`.
  - `ejs`: Upgraded from `^3.1.10` to `^5.0.1`.
  - `inquirer`: Upgraded from `^12.4.1` to `^13.3.2`.
- **Verified Compatibility**: Validated the generator across multiple complex project configurations including TypeScript/MVC, JavaScript/Clean Architecture, Kafka messaging, and Redis/PostgreSQL integration.
- **Update jest.config.js**: Update jest.config.js (or your test runner config) with new global thresholds:
```
  globalThreshold: {
    branches: 70,
    functions: 80,
    lines: 80,
    statements: 80,
  },
```

## [1.16.1] - 2026-03-17

### Refactored
- **Top-Level Dynamic Imports**: Moved dynamic `await import()` and `require()` calls to the top-level across all TypeScript and JavaScript templates (MVC & Clean Architecture).
- **Module Loading Standardization**: Standardized database connections (Mongoose/Sequelize), Kafka services, and graceful shutdown logic for better static analysis and ESM/CJS consistency.

### Fixed
- **Kafka Service Scope**: Resolved a potential `ReferenceError` in `kafkaService.ts.ejs` by correcting the instantiation order of dynamic consumers.
- **Health Check Imports**: Optimized `healthRoute.ts.ejs` to use top-level database driver imports.

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
