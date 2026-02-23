# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.9.0] - 2026-02-22
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
