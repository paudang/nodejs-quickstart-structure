# Testing & API Blueprint

This blueprint covers the standardized methods for testing your application and interacting with its communication layers (REST, GraphQL, and Kafka).

##  Quality & Standards

Your generated project includes pre-configured tools for automated testing and code quality.

### 1. Linting & Formatting
Ensure your code adheres to project standards:
```bash
# Lint check
npm run lint

# Auto-format
npm run format
```

### 2. Unit & Integration Testing
Maintain high reliability with automated test suites:
```bash
# Run all tests
npm test

# Run tests with coverage (Minimum 80% recommended)
npm run test:coverage
```

---

##  API Interaction

Depending on your configuration, your microservice provides interactive documentation for exploring and testing endpoints. Choose your setup below:

::: code-group
```bash [REST API (Swagger)]
# URL: http://localhost:3000/api-docs

# Standard Endpoints:
- GET /api/users: List all users.
- POST /api/users: Create a new user.
- PATCH /api/users/:id: Partially update a user.
- DELETE /api/users/:id: Delete a user (Soft Delete).
```

```graphql [GraphQL API (Apollo)]
# URL: http://localhost:3000/graphql

# Example Query (Get Users):
query GetAllUsers {
  getAllUsers {
    id
    name
    email
  }
}

# Example Mutation (Create User):
mutation CreateUser {
  createUser(name: "John Doe", email: "john@example.com") {
    id
    name
    email
  }
}
```

```bash [Kafka Flow]
# 1. Ensure infrastructure is running
docker-compose up -d kafka

# 2. Start the app
npm run dev

# 3. Trigger an event (via Postman or curl)
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Kafka Tester", "email": "kafka@example.com"}'

# 4. Observe the application logs:
[Kafka] Producer: Sent USER_CREATED event for 'kafka@example.com'
[Kafka] Consumer: Received USER_CREATED. 
[Kafka] Consumer:  Sending welcome email to 'kafka@example.com'... Done!
```
:::

##  Kafka Asynchronous Flow

When using **Kafka**, the project follows a non-blocking, event-driven pattern:

1.  **Trigger**: User makes a request (e.g., `POST /api/users`).
2.  **Produce**: The API sends a `USER_CREATED` event to the **Kafka Broker**.
3.  **Consume**: The **Welcome Worker** (Consumer) picks up the event from the topic.
4.  **Execute**: The worker simulates sending an email in the background.

---

---

### Verification Steps:
1.  **Produce Event**: POST to `http://localhost:3000/api/users`.
2.  **Verify Logs**: Look for `[Kafka] Producer: Sent USER_CREATED event`.
3.  **Confirm Execution**: Look for `[Kafka] Consumer: Received USER_CREATED` and email simulation.

##  Next Steps

If you have authentication enabled, check out the [Authentication](/blueprints/authentication) to learn how to secure your endpoints and authenticate your requests.
