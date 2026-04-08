# Troubleshooting & FAQ Guide

Welcome to the central troubleshooting hub! If you're seeing an error, check the categories below. Every entry follows the **Error → Reason → Solution** format for quick resolution.

---

## 💻 Environment & Setup

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

## 🛡️ Security & Quality (Snyk/Sonar)

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

## 🐶 Husky & Git Hooks

### Hooks not running after generation
- **Reason**: `npm install` was run before `git init`.
- **Solution**: Run `git init`, then `npx husky install`.

---

## 🐳 Docker & Infrastructure

### `port is already allocated` (e.g., 9093)
- **Reason**: Another container or local service is using the port.
- **Solution**: Stop all containers with `docker compose down` or find the process using `lsof -i :9093` (Mac/Linux) or `netstat -ano | findstr :9093` (Windows).

### `dial unix /var/run/docker.sock: no such file or directory`
- **Reason**: The Docker socket is not mounted or the path is incorrect for your OS.
- **Solution (Windows Git Bash)**: Use double slashes in your mount: `-v //var/run/docker.sock:/var/run/docker.sock`.

### `permission denied` (Docker API)
- **Reason**: The user running the tool doesn't have permissions to the socket.
- **Solution**: Run your CI container as `root` (e.g., `--user root` in docker run) or add the user to the `docker` group.

---

## 🚀 CI/CD & Automation

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

### GitLab/Bitbucket: `Healthcheck Timeout`
- **Error**: `Timed out waiting for: http://127.0.0.1:3001/health`
- **Reason**: Shared runners are slow; Kafka/DB haven't finished booting.
- **Solution**: Increase timeout to **300000ms (5 mins)** in `scripts/run-e2e.js`.

---

## 🛠️ Generator Issues

### Templates not rendering correctly
- **Reason**: Editing `.yml` files instead of the `.yml.ejs` templates.
- **Solution**: Always modify the files inside the `templates/` directory ending in `.ejs`.

> [!TIP]
> Found a new issue? Feel free to [Open an Issue](https://github.com/paudang/nodejs-quickstart-structure/issues) on GitHub!
