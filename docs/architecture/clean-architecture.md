# Clean Architecture

The **Clean Architecture** (or Hexagonal Architecture) is designed to separate business rules from the infrastructure and UI. This ensures that the core domain logic is independent of external frameworks like Express, Mongoose, or Kafka.

## Directory Structure

```text
src/
├── domain/                 # Core business entities
├── usecases/               # Application-specific business rules
├── interfaces/             # Controllers, Routes, GraphQL resolvers (Adapters)
├── infrastructure/         # External tools (DB, Cache, Kafka, Webserver)
└── index.ts                # Application entry point
```

## Layers of Dependency

1.  **Domain**: Contains entities and business logic used across the application. It has zero dependencies on other layers.
2.  **Use Cases**: Defines application-specific actions (e.g., `CreateUser`, `ProcessPayment`). It interacts with **Domain** and defines **Repository Interfaces**.
3.  **Interfaces**: Bridges the external world (HTTP, Kafka) to **Use Cases**. For example, a REST controller transforms a request into a call for a **Use Case**.
4.  **Infrastructure**: Implements database repository interfaces, handles environment configuration, and manages the webserver.

## Why choose Clean Architecture?

-   **Framework Independent**: You can change your DB or web framework with minimal effort.
-   **Testable**: Business logic can be tested in isolation without mocks for the database or webserver.
-   **Maintainable**: Clear separation makes it easier for large teams to work on different parts of the system.
