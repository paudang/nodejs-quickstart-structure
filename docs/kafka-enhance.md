## Kafka Enhancement Workflow (v1.16.0)

Objective: Transform raw Kafka infrastructure into a "Junior-Friendly" & "Production-Ready" messaging ecosystem.

## Review current kafka structure at 2 folder generated this tool (nodejs-quickstart-structure)

1. D:\Code\nodejs-kafka-clean-db-caching
2. D:\Code\nodejs-kafka-mvc-db-caching

### Practical Demo: User Registration Event Flow (v1.16.0)
Scenario: When a new user is created via UserController, we will trigger an asynchronous "Welcome Email" process using Kafka, while maintaining our existing Database and Redis Caching logic.

### 1. The "Real-World" Workflow
1. API Call: POST /users hits UserController.

2. Database: userModel saves the user.

3. Cache: Redis invalidates the users_list cache.

4. Kafka Producer (New): Publishes a USER_CREATED event with the user's JSON data.

5. Kafka Consumer (New): Listens for USER_CREATED and simulates sending a welcome email.

### 2. Task List for Implementation
Task 1: Create the Base Infrastructure
[ ] BaseConsumer: Create src/interfaces/messaging/kafka/consumers/BaseConsumer.ts to handle auto-parsing and error logging.

[ ] Schema: Create src/interfaces/messaging/kafka/schemas/userEventSchema.ts using Zod to validate the user data payload.

### Task 2: Update UserController.ts
[ ] Import Producer: Bring in the Kafka Producer instance.

[ ] Integrate Logic: After the DB save and Redis clear, add:

``await kafkaProducer.send('user-topic', {
  action: 'CREATE_USER',
  payload: { id: newUser.id, email: newUser.email }
});``

## Task 3: Build the WelcomeEmailConsumer.ts
[ ] Path: src/interfaces/messaging/kafka/consumers/instances/WelcomeEmailConsumer.ts

[ ] Logic: * Extends BaseConsumer.

If action === 'CREATE_USER', log: [Kafka]  Simulating Welcome Email to: ${data.email}.

### Expected Demo Output in Terminal
When you run the tool and create a user, your logs should look like this example 

``[HTTP] POST /users - 201 Created
[DB] User saved to PostgreSQL.
[Redis] Cache 'users_list' invalidated.
[Kafka] Producer: Sent USER_CREATED event for 'paudang@example.com'
[Kafka] Consumer: Received USER_CREATED. 
[Kafka] Consumer: 📧 Sending welcome email to 'paudang@example.com'... Done!``

### Update flow for user test at Readme.md.ejs if Kafka is enabled