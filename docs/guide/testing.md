# Testing (Unit & E2E)

Quality is not an afterthought. Every project comes with a fully configured testing suite.

## Unit Testing (Jest)

Powered by **Jest** and **ts-jest** (for TypeScript projects).

-   **Location**: All unit tests are gathered in the `tests/unit/` directory, mirroring the `src/` structure.
-   **Thresholds**: Coverage gates are set to **70%** for lines and functions to ensure maintainability.
-   **Commands**:
    -   `npm test`: Run all tests.
    -   `npm run test:watch`: Run tests in watch mode.
    -   `npm run test:coverage`: Generate a detailed coverage report.

## End-to-End (E2E) Testing (Supertest)

Focuses on the entire system as a black box, running tests against a real (or mocked) environment.

-   **Flow**: Uses **Supertest** to make actual HTTP requests to the running service.
-   **Infrastructure**: E2E tests target the Docker container cluster to ensure networking and DB connectivity are correct.
-   **Isolation**: Uses a dedicated orchestrator script (`scripts/run-e2e.js`) to manage the lifecycle of test containers.
-   **Command**: `npm run test:e2e`

## Mocking Standards

-   **Database**: Pre-configured mocks for Mongoose/Sequelize models.
-   **Messaging**: Includes logic to mock the **Kafka Singleton Service**, allowing you to test controllers without a live Kafka broker.
