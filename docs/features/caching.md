# Caching Strategy

Optimized performance with built-in caching support for both local and distributed environments.

## Redis (Distributed Cache)

The standard choice for production microservices.

-   **Client**: Powered by `ioredis`.
-   **Connection**: Pre-configured singleton client with automatic reconnection and retry logic.
-   **Infrastructure**: `docker-compose.yml` includes a ready-to-use Redis service.

## Memory Cache (Local Cache)

Perfect for small services or rapid prototyping.

-   **Client**: Powered by `node-cache`.
-   **Benefit**: Zero-dependency caching that lives directly in the application's RAM.
-   **Interface**: Shares the same internal abstraction as Redis, making it easy to swap later.

## Usage in Architecture

-   **MVC**: Caching logic is injected directly into controllers for rapid development.
-   **Clean Architecture**: Integrated into **UseCases** to keep domain logic clean while benefiting from performance gains.
