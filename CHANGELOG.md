# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
- Database integration (MongoDB, MySQL, PostgreSQL).
