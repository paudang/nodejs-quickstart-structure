# Deployment (Docker & PM2)

`nodejs-quickstart-structure` ensures your application is ready to deploy on any modern infrastructure.

## Docker Deployment (Cloud-Native)

Using a **Multi-Stage Dockerfile** to minimize image size and maximize security.

### Building the Image
```bash
docker build -t my-microservice .
```

### Running with Infrastructure
Start the entire stack (DB, Cache, etc.) and your app container together:
```bash
docker-compose up --build
```

### Production Optimizations
-   **Non-root User**: The app runs under the `node` user for security.
-   **Cleanup**: suppressing non-essential npm upgrade notifications for cleaner build logs.

## PM2 Deployment (VPS/EC2)

If you prefer deploying directly to a Virtual Private Server, we support **PM2** out of the box.

-   **Ecosystem.config.js**: Automatically generates a PM2 config file.
-   **Cluster Mode**: Pre-configured to run in cluster mode for high availability.
-   **Commands**:
    -   `npm run deploy`: Starts the app with PM2.
    -   `npx pm2 status`: Check application status.
    -   `npx pm2 logs`: View real-time logs.

## CI/CD Integration

We provide ready-made configurations for:
-   **GitHub Actions**: `.github/workflows/ci.yml`
-   **GitLab CI**: `.gitlab-ci.yml`
-   **Jenkins**: `Jenkinsfile`

These pipelines automatically run linting, unit tests, and E2E tests before every deployment.
