# Communication Protocols

`nodejs-quickstart-structure` supports three primary communication methods, each optimized for different use cases.

## REST APIs (Standard)

Standard RESTful endpoints powered by **Express.js**.

-   **Documentation**: Automatically generates a Swagger UI at `http://localhost:3000/api-docs`.
-   **Error Handling**: Centralized middleware with standard HTTP status codes.
-   **Security**: Rate-limiting and Helmet headers pre-configured.

## GraphQL (Modern)

Powerful API query language powered by **Apollo Server v4**.

-   **Playground**: Fully embedded **Apollo Sandbox** available at `http://localhost:3000/graphql`.
-   **Schema**: Strongly typed with `typeDefs` and `resolvers`.
-   **Integration**: Seamlessly maps to MVC or Clean Architecture models.

## Kafka (Event-Driven)

High-performance messaging for asynchronous microservices.

-   **Kafka KRaft Mode**: No Zookeeper dependency; modernized setup in `docker-compose.yml`.
-   **Pattern**: Uses a **Singleton Kafka Service** for resilience and performance.
-   **BaseConsumer**: Standardized abstract class for creating custom consumers with built-in error handling.
-   **Worker-only Mode**: If only Kafka is selected, the generator removes unnecessary HTTP routes, creating a pure worker service.
