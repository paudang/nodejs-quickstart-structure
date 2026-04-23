# CI/CD Setup Guide

This blueprint provides a step-by-step guide to setting up Continuous Integration and Continuous Deployment (CI/CD) for your generated Node.js microservice. We support 5 major platforms out of the box.

::: tip PROMPT SELECTION
When generating your project, select your preferred provider in the **"Select CI/CD Provider"** prompt. The generator will automatically inject the required configuration files.
:::

---

##  Common Prerequisites

Before configuring any platform, ensure you have:
1.  **Git Initialized**: Run `git init` in your project root.
2.  **Snyk Token**: (Optional) Get an API token from [Snyk.io](https://snyk.io/) for dependency security scanning.
3.  **SonarQube/SonarCloud Token**: (Optional) Get a token from [SonarCloud.io](https://sonarcloud.io/) for static code analysis.

---

## 1. GitHub Actions 

GitHub Actions is integrated directly into your repository.

### Step-by-Step Configuration:
1.  **Push Code**: Push your project to a GitHub repository.
2.  **Verify Configuration**: Ensure `.github/workflows/ci.yml` exists in your project root.
3.  **Configure Secrets**:
    -   Go to your repository **Settings**.
    -   Select **Secrets and variables > Actions** from the sidebar.
    -   Click **New repository secret**.
    -   Add `SNYK_TOKEN` (if using Security Hardening).
    -   Add `SONAR_TOKEN` (if using Security Hardening).
4.  **Trigger**: Every push or Pull Request to the `main` branch will automatically trigger the workflow.

---

## 2. GitLab CI 

GitLab CI uses a single `.gitlab-ci.yml` file to manage the pipeline lifecycle.

### Step-by-Step Configuration:
1.  **Push Code**: Push your project to a GitLab repository.
2.  **Configure CI/CD Variables**:
    -   Navigate to **Settings > CI/CD**.
    -   Expand the **Variables** section.
    -   Add `SNYK_TOKEN` and `SONAR_TOKEN`.
3.  **Runner Configuration**:
    -   The generated config uses `services: [docker:dind]` for E2E tests.
    -   Ensure your GitLab Runner has **privileged mode** enabled if hosting on-premise.
4.  **Automatic Detection**: GitLab will automatically detect the `.gitlab-ci.yml` and initiate the pipeline.

---

## 3. Jenkins 

Jenkins is a self-hosted automation server. For Node.js projects, we recommend running Jenkins in a Docker container for a predictable build environment.

### Step-by-Step Configuration:

#### 1. Setup Jenkins with Docker (Recommended)
To build Docker images inside Jenkins, use a custom image with the Docker CLI installed:

```bash
# Dockerfile.jenkins
FROM jenkins/jenkins:lts
USER root

# Install Docker CLI and curl
RUN apt-get update && apt-get install -y docker.io curl

# Download the latest Docker Compose binary directly
RUN curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose && \
    chmod +x /usr/local/bin/docker-compose

# Ensure jenkins user can access the docker socket
RUN usermod -aG docker jenkins

USER jenkins
```

Run the container mounting the host Docker socket (Note the `--user root` to avoid socket permission issues):
```bash
docker run -d -p 8080:8080 -p 50000:50000 \
  --name jenkins \
  --user root \
  -v jenkins_home:/var/jenkins_home \
  -v //var/run/docker.sock:/var/run/docker.sock \
  my-jenkins-with-docker
```

#### 2. Install Required Plugins
Go to **Manage Jenkins > Plugins** and install:
-   **NodeJS**: For `npm` support.
-   **GitHub Integration**: For GitHub App connectivity.
-   **Pipeline**: To read the `Jenkinsfile`.

::: tip NEED HELP?
If you encounter errors like `Invalid tool type "nodejs"` or `npm not found`, see our **[Jenkins Troubleshooting FAQ](../guide/troubleshooting#jenkins-invalid-tool-type-nodejs)** for the fix.
:::

#### 3. Configure Credentials (GitHub App)
For the most secure connection, create a **GitHub App** in your GitHub settings:
1.  **Permissions**: Repository > Contents (R/W), Metadata (R), Commit statuses (R/W).
2.  **App ID & Key**: Copy the App ID and download the `.pem` Private Key.
3.  **Jenkins Credential**: Add a new credential of type **"GitHub App"**. Paste the ID and Key.

#### 4. Create the Pipeline
1.  **New Item**: Select **Pipeline**, name it after your project.
2.  **Pipeline Section**: Select **Pipeline script from SCM**.
3.  **SCM**: Select **Git**, enter your repo URL (e.g., `https://github.com/paudang/nodejs-jenkins.git`), and select the credential created above.
4.  **Branch**: Usually `*/main`.
5.  **Lightweight Checkout**: **Uncheck** the "Lightweight checkout" box to prevent "not in a git directory" errors.

#### 5. Monitoring
View the **Console Output** for each build stage defined in your project's `Jenkinsfile`.

---

## 4. CircleCI 

CircleCI uses an optimized workflow with Orbs and machine executors.

### Step-by-Step Configuration:
1.  **Authorize**: Log in to [CircleCI](https://circleci.com/) using your GitHub/GitLab account.
2.  **Connect Project**: Click on **Projects** in the sidebar and find your repo.
3.  **Set Up Project**: Click **Set Up Project** next to the repository name.
4.  **Existing Config**: Select **"Fastest: Use the .circleci/config.yml in my repo"** and click **Let's Go**.
5.  **Environment Variables**:
    -   Go to **Project Settings > Environment Variables**.
    -   Add `SNYK_TOKEN` and `SONAR_TOKEN` if security hardening is enabled.

---

## 5. Bitbucket Pipelines 

Bitbucket Pipelines is built directly into the Bitbucket cloud experience.

### Step-by-Step Configuration:
1.  **Enable Pipelines**: In your Bitbucket repository sidebar, go to **Pipelines**.
2.  **Initial Activation**: Click the **"Enable Pipelines"** button. If you already pushed your code, Bitbucket will detect the `bitbucket-pipelines.yml` and provide a **"Run initial pipeline"** button. Click it to activate the project.
3.  **Repository Variables**:
    -   Go to **Repository settings > Pipelines > Repository variables**.
    -   Add your `SNYK_TOKEN` and `SONAR_TOKEN`.
4.  **Automatic Trigger**: After the initial run, Bitbucket will automatically trigger a build on every future `git push` to your repository.
5.  **Monitoring**: View real-time progress under the **Pipelines** tab in the sidebar.

---

##  Comparison Table

| Feature | GitHub Actions | GitLab CI | Jenkins | CircleCI | Bitbucket |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Config File** | `ci.yml` | `.gitlab-ci.yml` | `Jenkinsfile` | `config.yml` | `bitbucket-pipelines.yml` |
| **Integration** | Market Actions | DinD / Templates | Plugins | Orbs | Pipes |
| **Secrets UI** | Settings > Secrets | Settings > CI/CD | Manage Credentials | Project Settings | Repo Settings |
| **Free Tier** | 2,000 mins/mo | 400 mins/mo | Unlimited (Self) | 2,500 mins/mo | **50 mins/mo** |
| **Executor** | GitHub Runners | Shared/Specific | Master/Agents | Docker/Machine | Pipelines Runner |

---

##  Still Having Issues?

CI/CD environments are complex and often vary by project. We have compiled a central **[Troubleshooting & FAQ Guide](../guide/troubleshooting)** to help you solve common errors, including:

-   **Kafka & Database** connection timeouts in GitLab/Bitbucket.
-   **Jenkins** tool configuration and plugin errors.
-   **Security Scan** (`SNYK_TOKEN`) authorization failures.
-   **Memory & Resource** (OOM/SIGKILL) limits on shared runners.

> [!TIP]
> Always check your **Pipeline Logs** first! If you see a timeout, the generated scripts will usually output the `docker-compose logs` to help you identify the root cause.

