# test_mvc_typescript_none_postgresql_kafka

This project was generated using `nodejs-quickstart-structure`.

## Prerequisites

- Node.js (v18+)
- Docker & Docker Compose

## Getting Started

1.  **Start Infrastructure** (Database, Kafka, Zookeeper):
    ```bash
    docker-compose up -d db flyway zookeeper kafka
    ```
    *Note: We only start the infrastructure (database, etc.) so we can run the API locally.*

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Run Application**:
    ```bash
    npm run dev
    ```

## Project Structure

The project uses **MVC** with **PostgreSQL**.

Microservices communication handled via **Kafka**.


## Demo & Testing

### Health Check

```bash
curl http://localhost:3000/health
# Output: {"status":"UP"}
```




### Kafka Demo

The application connects to Kafka on startup and acts as both a **Producer** and a **Consumer**.

1.  **Check Output**:
    When the server starts, it will automatically send a demo message to the `test-topic`.
    Check your terminal logs:
    ```
    Kafka connected
    { value: 'Hello Kafka from ...!' }
    ```

2.  **Manual Test**:
    You can manually send messages using the configured `kafkajs` client in `src/services/kafkaService.ts`.

- **Zookeeper**: Port `2181`
- **Kafka Broker**: Port `9092`


## Database Migrations

**Flyway** is running in Docker and will automatically apply SQL migrations from `flyway/sql/` on startup.