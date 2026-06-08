# Troubleshooting & FAQ Guide

Welcome to the central troubleshooting hub! If you're seeing an error, check the categories below. Every entry follows the **Error → Reason → Solution** format for quick resolution.

---

##  Environment & Setup

### `nodejs-quickstart: command not found`
- **Reason**: The CLI is not installed globally or your PATH is missing.
- **Solution**: Use `npx nodejs-quickstart-structure init` (recommended) or install globally via `npm install -g nodejs-quickstart-structure`.

### `Invalid Node.js version`
- **Reason**: You are likely running a version below Node.js 18.x.
- **Solution**: Upgrade your local Node.js environment. We recommend **Node.js LTS (v22.x)**.

### `EBUSY: resource busy or locked` (Windows)
- **Reason**: A file is locked by another process (IDE, terminal, or Antivirus).
- **Solution**: Close your IDE, restart your terminal as Administrator, and try the command again.

---

##  Security & Quality (Snyk/Sonar)

### `403 Forbidden` or `Unauthorized` (Snyk)
-   **Reason**: Missing or invalid `SNYK_TOKEN` in your environment.
-   **Solution**: 
    -   **Local Development**: If your local scan fails, you need to authenticate your machine:
        ```bash
        npx snyk auth
        # This opens a browser window to log you in.
        ```
    -   **CI/CD**: Ensure the Secret in GitHub/GitLab is named exactly **`SNYK_TOKEN`**. Check your provider's "Repository Secrets" section.

### `sonar.organization` is missing
- **Reason**: SonarCloud requires an organization key in `sonar-project.properties`.
- **Solution**: Find your Org Key in the SonarCloud UI and update the properties file.

### `Could not find a default branch` (SonarCloud)
-   **Error**: `ERROR Could not find a default branch for project...`
-   **Reason**: The project hasn't been imported/created in the SonarCloud UI yet.
-   **Solution**: 
    1.  Log in to SonarCloud.
    2.  Click **"+" -> Analyze new project** and import your repository.
    3.  **Critical Step**: Go to **Administration -> Analysis Method** and ensure "Automatic Analysis" is **OFF**, and "GitHub Actions" (or your provider) is selected.
    4.  Ensure the **Project Key** (e.g., `org_repo-name`) in the SonarCloud UI matches the one in your `sonar-project.properties`.

---

##  Husky & Git Hooks

### Hooks not running after generation
- **Reason**: `npm install` was run before `git init`.
- **Solution**: Run `git init`, then `npx husky install`.

---

##  Docker & Infrastructure

### `port is already allocated` (e.g., 9093)
- **Reason**: Another container or local service is using the port.
- **Solution**: Stop all containers with `docker compose down` or find the process using `lsof -i :9093` (Mac/Linux) or `netstat -ano | findstr :9093` (Windows).

### `dial unix /var/run/docker.sock: no such file or directory`
- **Reason**: The Docker socket is not mounted or the path is incorrect for your OS.
- **Solution (Windows Git Bash)**: Use double slashes in your mount: `-v //var/run/docker.sock:/var/run/docker.sock`.

### `permission denied` (Docker API)
- **Reason**: The user running the tool doesn't have permissions to the socket.
- **Solution**: Run your CI container as `root` (e.g., `--user root` in docker run) or add the user to the `docker` group.

### Terraform `aws_ami` Lookup Failure (LocalStack)
- **Error**: `data.aws_ami.latest: Search returned no results` during `terraform plan` or `terraform apply` when deploying locally with LocalStack.
- **Reason**: The default configuration searches for the latest Amazon Linux 2 AMI using the filter `"amzn2-ami-hvm-*"`. However, LocalStack running in local environments does not include or support standard Amazon Linux 2 AMIs by default, causing the search to fail.
- **Solution**: 
  1. Open `/terraform/modules/compute/main.tf` in your project.
  2. Locate the `data "aws_ami" "latest"` block (around line 27).
  3. Change the filter value from `"amzn2-ami-hvm-*"` to `"*"` to match any available mock AMI in LocalStack:
     ```hcl
     data "aws_ami" "latest" {
       most_recent = true
       owners      = ["amazon"]
       filter {
         name   = "name"
         values = ["*"] # Changed from "amzn2-ami-hvm-*" for LocalStack compatibility
       }
     }
     ```
  4. Run `terraform apply` again.

> [!WARNING]
> **Real AWS Deployment**: The filter `"*"` matches *any* Amazon-owned image, which could result in a non-Linux or incompatible OS when deploying to real AWS. Before running `terraform apply` on a real AWS account, ensure you change the filter value back to `"amzn2-ami-hvm-*"` so that standard Amazon Linux 2 is selected and your user data script (which uses `yum` and `docker`) executes successfully.

### Verifying LocalStack Service Status
- **Problem**: You want to check which mock AWS services (EC2, RDS, IAM, etc.) are successfully running inside LocalStack, or diagnose connection issues.
- **Solution**: 
  1. Open your browser or run a `curl` request to the LocalStack health endpoint:
     ```bash
     curl http://localhost:4566/_localstack/health
     ```
  2. This will return a JSON response listing all simulated services and their active status:
     ```json
     {
       "services": {
         "ec2": "running",
         "rds": "running",
         "elasticache": "running",
         "iam": "running",
         "sts": "running",
         "elbv2": "running",
         "wafv2": "running"
       },
       "features": {
         "initScripts": "initialized"
       }
     }
     ```
  3. Ensure that all the services you are attempting to deploy to show as `"running"` or `"available"`.

### Terraform `is not a valid load balancer ARN` (LocalStack)
- **Error**: `api error ValidationError: 'arn:aws:elasticloadbalancing:...' is not a valid load balancer ARN` when running `terraform plan`, `terraform apply`, or `terraform destroy` locally.
- **Reason**: 
  1. **Out-of-Sync State**: If LocalStack was restarted or recreated, its internal mock resources are gone, but your local `terraform.tfstate` file still references them. During state refresh, LocalStack returns a `ValidationError` (400) for the missing Load Balancer ARN instead of the standard AWS `LoadBalancerNotFound` error, causing Terraform to crash.
  2. **Endpoint Mapping**: Both `elb` and `elbv2` endpoints need to be explicitly mapped to LocalStack in your `localstack.tf` or provider settings.
- **Solutions**:
  - **Quick Fix (Easiest)**: Since LocalStack is a local simulated environment, you can safely wipe your local Terraform state. Simply delete your `terraform.tfstate` and `terraform.tfstate.backup` files in your `/terraform` folder, then run `terraform init` and `terraform apply` to redeploy fresh resources.
  - **State Repair (Targeted)**: If you want to keep your other resources and only skip the load balancer error during destroy/refresh, remove the problematic resource from your Terraform state file:
    ```bash
    terraform state rm module.security.aws_lb.main
    ```
    Then run `terraform destroy` or `terraform apply` again.
  - **Verify `localstack.tf`**: Ensure both `elb` and `elbv2` are defined in your endpoints:
    ```hcl
    endpoints {
      elb   = "http://localhost:4566"
      elbv2 = "http://localhost:4566"
    }
    ```

---

##  CI/CD & Automation

### Jenkins: `Invalid tool type "nodejs"`
- **Reason**: The **NodeJS Plugin** is missing or Jenkins hasn't been restarted.
- **Solution**: Install the plugin and visit `http://localhost:8080/restart`.

### Jenkins: `Tool type "nodejs" does not have an install of "nodejs" configured`
- **Reason**: The tool is not named `nodejs` in the settings.
- **Solution**: Go to **Manage Jenkins > Tools**, Add NodeJS, and set the **Name** exactly to `nodejs`.

### Jenkins: `fatal: not in a git directory` (Obtain Jenkinsfile)
- **Reason**: "Lightweight checkout" is failing to pull the config.
- **Solution**: Go to Pipeline **Configure**, and **UNCHECK** the "Lightweight checkout" box.

### Jenkins/Bitbucket: `buildx 0.17.0 or later`
- **Error**: `compose build requires buildx 0.17.0 or later`
- **Reason**: Your environment doesn't support BuildKit.
- **Solution**: Set `DOCKER_BUILDKIT=0` in your environment (Jenkinsfile or bitbucket-pipelines.yml).

### Bitbucket Pipelines: `--mounts is not allowed`
- **Error**: `Error response from daemon: authorization denied by plugin pipelines: --mounts is not allowed`
- **Reason**: Bitbucket Pipelines Cloud prohibits host volume mounts (bind mounts) for security. If your `docker-compose.yml` uses `- .:/app` for internal migration services or code sync, Bitbucket's security plugin will block the build.
- **Solution**:
    1.  **CI-Specific Compose**: Create a `docker-compose.ci.yml` that removes all `volumes` sections and removes the dedicated migration service container.
    2.  **Run Migrations on Host**: In your pipeline script, run the migration command directly (e.g., `npm run migrate`) once the database container is online. This uses the code already present in the CI runner instead of mounting it from the host.
    3.  **Support CI Overrides**: Update your orchestrator (e.g., `scripts/run-e2e.js`) to detect the CI environment and use the `-f docker-compose.ci.yml` flag if it exists.

### GitLab/Jenkins: `Healthcheck Timeout`
- **Error**: `Timed out waiting for: http://127.0.0.1:3001/health`
- **Reason**: 
    1. Shared runners are slow; Kafka/DB haven't finished booting.
    2. **Networking Collision**: If Jenkins is running in a container, `127.0.0.1` refers to Jenkins itself, not your app.
- **Solution**: 
    1. Increase timeout to **300000ms (5 mins)** in `scripts/run-e2e.js`.
    2. **Use Host Alias**:
        - **Jenkins/Local**: Set `WAIT_ON_HOST = 'host.docker.internal'` and `TEST_URL = 'http://host.docker.internal:3001'`.
        - **GitLab CI**: Set `WAIT_ON_HOST = 'docker'` and `TEST_URL = 'http://docker:3001'` in your `.gitlab-ci.yml` variables.
        - This allows the CI build container to "reach out" to your application container!

### Flyway & Database Migration Errors
- **Problem**: Infrastructure is healthy, but the app fails to start its web server.
- **Reason**: The application waits for the Database to be ready and for Flyway migrations to complete before opening its port.
- **Common Fixes**:
    - **Slow DB Boot**: On some environments, MySQL/Postgres takes >60s to start. Our scripts automatically wait, but you may need to check `docker compose logs` to see if the DB is still initializing.
    - **Migration Failure**: Check logs for `Migration failed` or `Access denied`. This usually means the `.env` credentials don't match the `docker-compose.yml` environment variables.
    - **Wait-for-it**: Ensure your `Dockerfile` or `entrypoint` correctly uses the `wait-for-it.sh` script to block the app until the DB port is open.

### Skipping Expensive E2E Tests
- **Problem**: E2E tests are taking too long or failing on slow CI runners.
- **Solution**: You can temporarily disable the E2E stage:
    - **Jenkins**: Comment out the `stage('E2E Test')` block in your `Jenkinsfile`.
    - **GitHub Actions**: Add `if: false` to the `e2e-tests` job in `.github/workflows/ci.yml`.
    - **GitLab CI**: Add `when: manual` to the `run_e2e_tests` job in `.gitlab-ci.yml`.
    - **Bitbucket**: Comment out the `- step: name: Run E2E Tests` section in your pipeline YAML.

---

## Authentication & API

### Swagger: `Failed to fetch` on `/auth/google` or `/auth/github`
- **Problem**: Clicking "Execute" returns "Failed to fetch" and a CORS error.
- **Reason**: Browser security (CORS) prevents the Swagger UI from following a redirect (`302`) to an external domain (like Google/GitHub) inside an AJAX request.
- **Solution**: 
  - **Manual Test**: Copy the URL `http://localhost:3000/auth/google` directly into your browser's address bar. It will work perfectly.
  - **API Test**: Use the `POST /auth/social/exchange` endpoint in Swagger. This is a JSON API and does not have redirect issues.

### Swagger: `500 Internal Server Error` on `/auth/social/exchange`
- **Problem**: Receiving a 500 error with "Failed to authenticate" when sending a code to Swagger.
- **Reason**: OAuth2 codes are single-use and URL-encoded by the browser.
- **Solution**: 
  1. **Get a FRESH code**: Visit the login URL in your browser again to get a new code (they expire after one use!).
  2. **URL Decode**: If the code in your address bar contains `%2F`, you must replace it with a literal `/` before pasting it into Swagger (e.g., `4%2F0Af...` becomes `4/0Af...`).
  3. **Match Redirect URI**: Ensure the `redirectUri` in your JSON body exactly matches the one registered in your Google/GitHub console.

---

## Background Jobs & Task Queues (BullMQ)

### Redis `Max retries per request` Error
- **Error**: `MaxRetriesPerRequestError: Reached the max retries per request limit (which is 20)`
- **Reason**: BullMQ requires `maxRetriesPerRequest` to be set to `null` in the Redis client configuration. If you override the `redisClient` or use a custom Redis instance, BullMQ will crash when it blocks waiting for jobs.
- **Solution**: Ensure your `redisClient` passes `maxRetriesPerRequest: null` when initialized. The Quickstart Generator does this by default, but double-check your `src/config/redisClient.ts` (or `.js`) if you modified it.

### Redis OOM (Out of Memory)
- **Problem**: Redis server crashes or evicts keys unexpectedly after processing many background jobs.
- **Reason**: By default, BullMQ stores all completed and failed jobs in Redis indefinitely. If you process millions of jobs, Redis memory will fill up.
- **Solution**: Set `removeOnComplete` and `removeOnFail` options when adding jobs.
  ```typescript
  await emailQueue.add('send-email', data, {
    removeOnComplete: true, // or a number like 100 to keep the last 100 jobs
    removeOnFail: 1000      // Keep last 1000 failed jobs for debugging
  });
  ```

### Duplicate Job Processing (Idempotency)
- **Problem**: A single job (e.g., sending an email or processing a payment) gets executed multiple times.
- **Reason**: If your worker takes too long to process a job, or the Node.js event loop blocks heavily, BullMQ might consider the worker stalled and move the job back to the waiting queue for another worker to pick up.
- **Solution**: 
  1. **Idempotency**: Always design your background jobs to be idempotent (e.g., check if the transaction exists in the database before processing the payment).
  2. **Avoid Event Loop Blocking**: Do not run CPU-intensive tasks directly in the worker without yielding to the event loop.

---

##  Generator Issues

### Templates not rendering correctly
- **Reason**: Editing `.yml` files instead of the `.yml.ejs` templates.
- **Solution**: Always modify the files inside the `templates/` directory ending in `.ejs`.

> [!TIP]
> Found a new issue? Feel free to [Open an Issue](https://github.com/paudang/nodejs-quickstart-structure/issues) on GitHub!
