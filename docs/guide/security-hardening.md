# Enterprise Security Setup

This project allows you to scaffold Node.js microservices with enterprise-grade security hardening out of the box. This feature is designed to meet the rigorous security standards of top-tier tech companies.

## 🛡️ Features Included

When you select "Yes" for Enterprise Security Hardening during project initialization, the following tools and configurations are added:

### 1. Snyk (SCA - Software Composition Analysis)
- **Tool**: [Snyk](https://snyk.io/)
- **Purpose**: Automatically scans your `node_modules` for known vulnerabilities in third-party dependencies.
- **Integration**: 
  - A dedicated GitHub Actions workflow (`.github/workflows/security.yml`).
  - GitLab CI and Jenkins stages for automated scanning.
  - Fail-safe: CI will fail if "High" or "Critical" vulnerabilities are detected.
### 2. SonarCloud / SonarQube (SAST - Static Application Security Testing)
- **Tool**: [SonarCloud](https://sonarcloud.io/)
- **Purpose**: Deep-dive static analysis to detect code smells, bugs, and security hotspots (e.g., SQL Injection, XSS patterns).
- **Integration**: 
  - Pre-configured `sonar-project.properties`.
  - Quality Gates enforced in CI/CD pipelines.

### 3. Husky (Pre-commit Quality Gates)
- **Tool**: [Husky](https://typicode.github.io/husky/) & [lint-staged](https://github.com/lint-staged/lint-staged)
- **Purpose**: Automatically runs linting and formatting on changed files before every commit to ensure code quality.
- **Integration**: 
  - Automatically initialized during `npm install`.
  - Prevents "bad code" from being committed to the repository.

---
To fully activate these features in your generated project, follow these detailed steps to obtain your authentication tokens and configure your CI/CD environment.

### 🛡️ 1. Snyk Integration (SCA)

Snyk monitors your dependencies for known vulnerabilities. To set it up:

1.  **Create an Account**: Sign up for a free account at [Snyk.io](https://snyk.io/).
2.  **Get your Auth Token**:
    - Click on your **profile avatar** (bottom left) -> **Account Settings**.
    - Find the **Auth Token** section.
    - Click **Click to show** and copy your token.
    - *Alternatively, for Organizational use, go to **Settings -> Service Accounts** to create a non-personal token.*
3.  **Configure GitHub Secrets**:
    - Go to your GitHub Repository -> **Settings** -> **Secrets and variables** -> **Actions**.
    - Click **New repository secret**.
    - Name: `SNYK_TOKEN`
    - Value: (Paste your token here).

### 🔍 2. SonarCloud Integration (SAST)

SonarCloud performs deep static analysis and tracks code quality.

1.  **Sign Up**: Log in to [SonarCloud.io](https://sonarcloud.io/) using your GitHub account.
2.  **Create/Import Project**:
    > [!IMPORTANT]
    > You **must** manually import your project in the SonarCloud UI before the CI/CD pipeline can scan it. 
    - Click the **"+" icon** in the top right -> **Analyze new project**.
    - Select your GitHub organization and import the specific repository.
3.  **Configure Analysis Method**:
    - Once imported, go to **Administration -> Analysis Method**.
    - **Turn OFF** "SonarCloud Automatic Analysis".
    - Select **GitHub Actions** as your primary analysis method. This provides you with the correct `sonar-project.properties` values.
4.  **Generate a Token**:
    - Click your **profile icon** -> **My Account** -> **Security**.
    - Generate a new token and copy it.
5.  **Get your Project & Organization Details**:
    - On your SonarCloud project dashboard, look for the **Project Key** and **Organization Key** in the bottom right corner of the "Information" section.
    - **Note**: The Project Key often looks like `your-org_your-repo`.
    - Update your local `sonar-project.properties`:
        - `sonar.projectKey=exact-key-from-sonarcloud`
        - `sonar.organization=exact-org-from-sonarcloud`
6.  **Configure GitHub Secrets**:
    - Add `SONAR_TOKEN`: (Paste the token you just generated).
    - Add `SONAR_HOST_URL`: 
        - **If using SonarCloud**: Set this to `https://sonarcloud.io`.
        - **If using Self-hosted SonarQube**: Set this to your instance URL (e.g., `http://your-server-ip:9000`).

> [!TIP]
> Most users should use `https://sonarcloud.io` as it is the official free cloud service for open-source and small projects!

### 🐳 3. Snyk Container Scanning

In addition to dependency scanning, the generator includes **Container Security** audits to check your `Dockerfile` and base image.

1.  **Requirement**: Ensure your `Dockerfile` is present at the root.
2.  **CI/CD**: The `security.yml` (GitHub) or `security` stage (GitLab/Jenkins) automatically builds your image and runs `snyk container test`.
3.  **Local Check**:
    ```bash
    docker build -t my-app .
    snyk container test my-app --file=Dockerfile --severity-threshold=high
    ```

### ⚡ 4. Husky & Lint-Staged
> [!IMPORTANT]
> You **must** run `git init` **before** running `npm install` for Husky to set up the hooks correctly.

1. **Initialize Git**: `git init`
2. **Install**: `npm install` (This automatically triggers `husky install`).
3. **Usage**: Just try to commit! Husky will automatically run `lint-staged`.

**Troubleshooting:**
If you see an error like `.husky/pre-commit: line 2: .husky/_/husky.sh: No such file`, it means Husky wasn't initialized correctly (usually because `git init` was skipped). To fix it:
```bash
npx husky install
```

### 4. Running Scans Locally
You can run a security audit at any time using:

```bash
npm run security:check
```

This command runs `npm audit` and `snyk test` in sequence.
