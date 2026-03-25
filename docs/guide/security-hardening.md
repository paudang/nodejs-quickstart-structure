# Enterprise Security Hardening (Big Tech Standard)

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


## 🚀 Setup Guide

To fully activate these features in your generated project, follow these steps:

### 1. Snyk Setup
1. Create a free account at [Snyk.io](https://snyk.io/).
2. Generate a **Snyk API Token**.
3. Add the token to your repository secrets:
   - **GitHub**: Settings -> Secrets and variables -> Actions -> New repository secret (`SNYK_TOKEN`).
   - **GitLab**: Settings -> CI/CD -> Variables (`SNYK_TOKEN`).

### 2. SonarCloud Setup
1. Create a free account at [SonarCloud.io](https://sonarcloud.io/).
2. Create a new project and get your **Project Key** and **Organization**.
3. Update `sonar-project.properties` if necessary.
4. Add `SONAR_TOKEN` to your repository secrets.

### 3. Husky Pre-commit Setup
1. **Initialize Git**: `git init` (Must be done before npm install).
2. **Install**: `npm install` (Automatically runs the `prepare` script).
3. **Usage**: Just try to commit! Husky will automatically run `lint-staged`.

### 4. Running Scans Locally
You can run a security audit at any time using:

```bash
npm run security:check
```

This command runs `npm audit` and `snyk test` in sequence.
