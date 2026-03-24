# Database & Migrations

Robust data management is a core feature of this generator. We support both SQL and NoSQL databases with automated migration pipelines.

## Supported Databases

-   **PostgreSQL**: Using `pg` driver and **Flyway** for SQL migrations.
-   **MySQL**: Using `mysql2` driver and **Flyway** for SQL migrations.
-   **MongoDB**: Using **Mongoose** for schema definition and `migrate-mongo` for schema migrations.

## SQL Migrations (PostgreSQL/MySQL)

Managed via **Flyway** inside the `docker-compose.yml` lifecycle.

-   **Location**: SQL files are saved in `flyway/sql/`.
-   **Auto-run**: Migrations execute automatically when you run `docker-compose up`.
-   **Naming**: `V1__initial_schema.sql`, `V2__add_users_table.sql`.

## MongoDB Migrations

Managed via `migrate-mongo`.

-   **Config**: `migrate-mongo-config.js` in the project root.
-   **Commands**:
    -   `npm run migrate:up`: Apply new migrations.
    -   `npm run migrate:status`: Check migration status.

## "None" Database Mode

If you select **None**, the generator creates a **Mock In-Memory Model**. 

-   **Benefit**: Great for building pure workers (Kafka) or testing logic without needing a running database.
-   **Structure**: Follows the same repository/service pattern as real databases for seamless future migration.
