# Development Rules & Conventions

## General Standards

### File Naming
- **Controllers**: Use camelCase (e.g., `kafkaController.ts`, `userController.ts`).
- **Services**: Use camelCase (e.g., `kafkaService.ts`, `userService.ts`) or PascalCase depending on export type. Class-based services should generally match class name.
- **Routes**: Use camelCase (e.g., `userRoutes.ts`, `kafkaRoutes.ts`).
- **Utilities**: Use camelCase (e.g., `httpCodes.ts`).

### Code Style
- **Status Codes**: ALWAYS use `HTTP_STATUS` constants from `@/utils/httpCodes` (TS) or `../../utils/httpCodes.js` (JS) instead of hardcoded numbers.
  - Good: `res.status(HTTP_STATUS.OK).json(...)`
  - Bad: `res.status(200).json(...)`
- **Imports**: 
  - **TypeScript**: Use path aliases (e.g., `@/services/...`, `@/utils/...`) instead of relative paths (e.g., `../../utils/...`).
  - **JavaScript**: Use relative paths as configured by the project structure.

### API Response Structure
- Success: `{ status: string, data: any }` or direct JSON object.
- Error: `{ error: string }`

## Git Workflow
- Commit messages should be descriptive.
- Ensure all tests pass before pushing.

## Verify function before commit
- npm run test:e2e