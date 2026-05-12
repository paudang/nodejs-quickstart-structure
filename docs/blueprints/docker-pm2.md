# Docker & PM2 Deployment Blueprint

This guide outlines the professional deployment workflows for your generated project, covering containerized environments with Docker and direct process management via PM2.

###  Choose Your Deployment Mode

| Mode | Strategy | Best For | Why? |
| :--- | :--- | :--- | :--- |
| Docker | Containerization | CI/CD, Cloud, Multi-Cloud | Environment consistency. |
| PM2 | Process Management | VPS, Dedicated Servers | Lowest overhead, native speed. |

##  Docker Deployment

The project includes a **Multi-Stage Dockerfile** optimized for production images.

### 1. Running Locally (Development)
To run the Node.js application locally while using Docker for the infrastructure (Database, Redis, Kafka, etc.):

```bash
# Start infrastructure
docker-compose up -d db redis kafka

# Start the application
npm run dev
```

### 2. Running the App Container with Compose Infrastructure
If you want to run the application itself inside a Docker container:

::: code-group
```bash [REST + MongoDB + Redis]
# Ensure infrastructure is running
docker-compose up -d

# Build Production Image
docker build -t your-app-name .

# Run Container (attached to the compose network)
docker run -p 3000:3000 --network your-app-name_default \
  -e DB_HOST=db \
  -e REDIS_HOST=redis \
  your-app-name
```

```bash [GraphQL + Redis + Kafka]
# Ensure infrastructure is running
docker-compose up -d

# Build Production Image
docker build -t your-app-name .

# Run Container (attached to the compose network)
docker run -p 3000:3000 --network your-app-name_default \
  -e REDIS_HOST=redis \
  -e KAFKA_BROKER=kafka:29092 \
  your-app-name
```

```bash [Minimal (No DB)]
# Build Production Image
docker build -t your-app-name .

# Run Container
docker run -p 3000:3000 your-app-name
```
:::

---

##  PM2 Deployment (VPS/EC2)

The project is pre-configured for direct deployment to a VPS/EC2 instance using **PM2** (via `ecosystem.config.js`).

### 1. Deployment Steps

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Start Infrastructure (background services)**:
    ```bash
    docker-compose up -d db redis kafka
    ```

3.  **Wait 5-10s** for the database to fully initialize.

4.  **Deploy the App using PM2 in Cluster Mode**:
    ::: code-group
    ```bash [TypeScript]
    # Build project and deploy
    npm run build
    npm run deploy
    ```
    
    ```bash [JavaScript]
    # Deploy directly
    npm run deploy
    ```
    :::

### 2. Process Management

| Command | Action |
| :--- | :--- |
| `npx pm2 logs` | Check real-time application logs |
| `npx pm2 status` | Check application status |
| `npx pm2 stop all` | Stop all processes |
| `npx pm2 delete your-app-name` | Remove application from PM2 |

::: warning CLEANUP
When shutting down, remember to stop the infrastructure:
```bash
docker-compose down
```
:::
