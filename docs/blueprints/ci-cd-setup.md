# CI/CD Setup Guide

This blueprint provides a step-by-step guide to setting up Continuous Integration and Continuous Deployment (CI/CD) for your generated Node.js microservice. We support 5 major platforms out of the box.

::: tip PROMPT SELECTION
When generating your project, select your preferred provider in the **"Select CI/CD Provider"** prompt. The generator will automatically inject the required configuration files.
:::

---

## 🛠️ Common Prerequisites

Before configuring any platform, ensure you have:
1.  **Git Initialized**: Run `git init` in your project root.
2.  **Snyk Token**: (Optional) Get an API token from [Snyk.io](https://snyk.io/) for dependency security scanning.
3.  **SonarQube/SonarCloud Token**: (Optional) Get a token from [SonarCloud.io](https://sonarcloud.io/) for static code analysis.

---

## 1. GitHub Actions 🐙

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

## 2. GitLab CI 🦊

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

## 3. Jenkins 👷

Jenkins is the enterprise standard for self-hosted CI/CD automation.

### Step-by-Step Configuration:
1.  **Create Pipeline**: Open Jenkins dashboard and click **New Item**.
2.  **Enter Name**: Enter a name (e.g., `my-node-app`) and select **Pipeline**, then click **OK**.
3.  **Pipeline Definition**:
    -   Scroll to the **Pipeline** section.
    -   Select **Pipeline script from SCM** in the Definition dropdown.
    -   Set SCM to **Git** and provide your repository URL.
    -   Ensure the branch name matches (e.g., `*/main`).
    -   The Script Path should be set to `Jenkinsfile`.
4.  **Credentials**:
    -   Go to **Dashboard > Manage Jenkins > Credentials**.
    -   Add `snyk-token` and `sonar-token` as **Secret text** credentials.
5.  **Prerequisites**:
    -   Install the **NodeJS Plugin**.
    -   Go to **Global Tool Configuration** and add a NodeJS installation named `nodejs` (Version 22.x recommended).

---

## 4. CircleCI 🎡

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

## 5. Bitbucket Pipelines 🟦

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

## 📊 Comparison Table

| Feature | GitHub Actions | GitLab CI | Jenkins | CircleCI | Bitbucket |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Config File** | `ci.yml` | `.gitlab-ci.yml` | `Jenkinsfile` | `config.yml` | `bitbucket-pipelines.yml` |
| **Integration** | Market Actions | DinD / Templates | Plugins | Orbs | Pipes |
| **Secrets UI** | Settings > Secrets | Settings > CI/CD | Manage Credentials | Project Settings | Repo Settings |
| **Free Tier** | 2,000 mins/mo | 400 mins/mo | Unlimited (Self) | 2,500 mins/mo | **50 mins/mo** |
| **Executor** | GitHub Runners | Shared/Specific | Master/Agents | Docker/Machine | Pipelines Runner |

::: warning BITBUCKET LIMITS
Bitbucket's free tier is significantly more restrictive (only **50 minutes** per month). For projects with heavy E2E tests, Kafka, or Databases, we strongly recommend using **CircleCI** or **GitHub Actions**.
:::

::: info TROUBLESHOOTING
If your pipeline fails at the **Security Scan** or **Static Analysis** step:
1.  Verify that your tokens haven't expired.
2.  Check that the names (`SNYK_TOKEN`, `SONAR_TOKEN`) match EXACTLY in the platform settings.
3.  Ensure the tokens have sufficient permissions (Write/Admin if required for scanning).
:::
