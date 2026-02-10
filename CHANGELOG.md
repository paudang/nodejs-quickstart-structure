# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
