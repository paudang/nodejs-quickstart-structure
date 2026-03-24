# MVC Architecture

The **Model-View-Controller (MVC)** architecture is the default choice for the majority of web applications and APIs. It provides a clean separation between data, business logic, and presentation.

## Directory Structure

```text
src/
├── config/         # Configuration for DB, Redis, etc.
├── controllers/    # Request handlers (logic goes here)
├── models/         # Data schemas and models
├── routes/         # API endpoint definitions
├── utils/          # Middleware and utilities
└── index.ts        # App entry point
```

## How it works

1.  **Routes**: Capture incoming requests and delegate them to the appropriate **Controller**.
2.  **Controllers**: Contain the main business logic. They interact with **Models** to fetch or save data and send responses.
3.  **Models**: Represent the data structure (Mongoose, Sequelize, or TypeORM).
4.  **Error Handling**: Controllers pass errors to the `next(error)` function, which is handled centrally by a global error middleware.

## Use Cases

-   Standard REST APIs.
-   Small to medium-sized microservices.
-   Server-side rendered (SSR) web applications (using EJS or Pug).
