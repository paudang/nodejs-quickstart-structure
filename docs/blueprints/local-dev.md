# Local Development Blueprint

This guide provides the "Happy Path" for bootstrapping and running your generated project locally. Each configuration matches the instructions found in the generated `README.md`.

::: tip PREREQUISITES
Before starting, ensure you have the following installed:
- **Node.js (v18+)**
- **Docker & Docker Compose** (for infrastructure like Databases, Redis, and Kafka)
:::

##  The 7-Step Development Flow

To ensure your microservice is production-ready, follow this standard sequence:

| Step | Goal | Action | Why? |
| :--- | :--- | :--- | :--- |
| **Step 1** | **Initialize Git** | `git init` | Enables Husky hooks and security gates. |
| **Step 2** | **Install Deps** | `npm install` (or `pnpm`, `yarn`) | Downloads core project dependencies. |
| **Step 3** | **Setup Env** | `cp .env.example .env` | Configures local environment variables. |
| **Step 4** | **Launch Infra** | `docker-compose up -d` | Starts DB, Redis, and Kafka in background. |
| **Step 5** | **Run Dev** | `npm run dev` (or `pnpm`, `yarn`) | Launches the app in hot-reload mode. |
| **Step 6** | **Quality Gate** | `npm test` | Verifies code quality and unit tests. |
| **Step 7** | **Ship project** | `npm run deploy` | Builds and deploys via PM2/Cluster mode. |

---

##  Detailed Setup

### 1. Environment Configuration
Copy the example environment file and adjust values:
```bash
cp .env.example .env
```

### 2. Infrastructure & App Launch
Choose the infrastructure setup that matches your generated project:

### Full Stack (DB + Redis + Kafka)

::: code-group
```bash [npm]
# Initialize repository
git init && npm install

# Start all infrastructure
docker-compose up -d db redis kafka

# Start the application
npm run dev
```

```bash [pnpm]
git init && pnpm install
docker-compose up -d db redis kafka
pnpm dev
```

```bash [yarn]
git init && yarn install
docker-compose up -d db redis kafka
yarn dev
```
:::

### Full Stack + ELK (Optional)

::: code-group
```bash [npm]
git init && npm install
docker-compose up -d db redis kafka
docker-compose -f docker-compose.elk.yml up -d
npm run dev
```

```bash [pnpm]
git init && pnpm install
docker-compose up -d db redis kafka
docker-compose -f docker-compose.elk.yml up -d
pnpm dev
```

```bash [yarn]
git init && yarn install
docker-compose up -d db redis kafka
docker-compose -f docker-compose.elk.yml up -d
yarn dev
```
:::

### REST + MongoDB

::: code-group
```bash [npm]
git init && npm install
docker-compose up -d db
npm run dev
```

```bash [pnpm]
git init && pnpm install
docker-compose up -d db
pnpm dev
```

```bash [yarn]
git init && yarn install
docker-compose up -d db
yarn dev
```
:::

### GraphQL + Redis

::: code-group
```bash [npm]
git init && npm install
docker-compose up -d db redis
npm run dev
```

```bash [pnpm]
git init && pnpm install
docker-compose up -d db redis
pnpm dev
```

```bash [yarn]
git init && yarn install
docker-compose up -d db redis
yarn dev
```
:::

### Minimal (No DB)

::: code-group
```bash [npm]
git init && npm install
npm run dev
```

```bash [pnpm]
git init && pnpm install
pnpm dev
```

```bash [yarn]
git init && yarn install
yarn dev
```
:::

::: info PRO TIP
Running `docker-compose up -d` without specifying services will start all infrastructure defined in your `docker-compose.yml`.
:::
