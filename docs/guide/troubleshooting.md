# Troubleshooting Guide

This guide summarizes common issues you might encounter while using the **Node.js Quickstart Structure** generator and its enterprise security features.

---

## 💻 Environment & Setup

### 1. `Command not found: nodejs-quickstart`
**Reason**: The CLI is not installed globally or your PATH is not configured.
**Solution**:
- **Use npx (Recommended)**: Run without installation: `npx nodejs-quickstart-structure init`.
- **Global Install**: `npm install -g nodejs-quickstart-structure`.

### 2. `Invalid Node.js version`
**Reason**: Your current Node.js version is below the requirement.
**Solution**:
- Ensure you are using **Node.js >= 18.x** (LTS versions are highly recommended).
- Use `node -v` to check your version.

### 3. `Missing .env file`
**Reason**: The generator creates a `.env.example`, but you need a local `.env`.
**Solution**:
- Copy the example file: `cp .env.example .env` (Linux/Mac) or `copy .env.example .env` (Windows).
- Fill in your specific environment variables (DB credentials, API keys, etc.).

---

## 🛡️ Security & Quality (Snyk/Sonar)

### 1. SonarCloud: `sonar.organization` is missing
**Error**: `ERROR You must define the following mandatory properties for 'nodejs-service': sonar.organization`
**Reason**: SonarCloud requires an organization key for all analysis.
**Solution**: 
- Ensure `sonar.organization=your-org-key` is present in your `sonar-project.properties`.
- Check our [Enterprise Security Setup](./security-hardening) guide on how to find your key.

### 2. SonarCloud: `Could not find a default branch`
**Error**: `ERROR Could not find a default branch for project with key 'nodejs-service'. Make sure project exists.`
**Reason**: The project has not been created or imported in the SonarCloud UI yet.
**Solution**: 
- Log in to SonarCloud.
- Click **"+"** -> **Analyze new project** and import your repository.
- **Important**: Go to **Administration -> Analysis Method** and ensure "Automatic Analysis" is **OFF**, and "GitHub Actions" is selected.
- Ensure the **Project Key** in SonarCloud (e.g., `org_repo-name`) matches the one in your `sonar-project.properties`.

### 3. Snyk: `403 Forbidden` or `Unauthorized`
**Error**: `Snyk test failed: 403` or `Authentication error (SNYK-0005)`
**Reason**: Usually a missing or invalid `SNYK_TOKEN` in your environment, or you haven't authenticated the CLI locally.
**Solution**: 
- **CI/CD**: Ensure the secret in GitHub/GitLab is named exactly `SNYK_TOKEN`.
- **Local Development**: If you see `SNYK-0005`, you need to authenticate your machine:
  ```bash
  npx snyk auth
  # OR if snyk is installed globally:
  snyk auth
  ```
- **Login**: This will open a browser window to log you in and sync your local CLI with your Snyk account.

### 3. Snyk: CLI Flag Conflicts
**Error**: `Incompatible flags: --file and --all-projects cannot be used together`
**Reason**: Snyk CLI has strict rules about flag combinations for container vs. dependency scans.
**Solution**: 
- Use the standard flags provided in our templates: `--file=Dockerfile --severity-threshold=high`. 
- Avoid adding `--all-projects` to a container scan.
---
## 🐶 Husky & Git Hooks

### 1. Pre-commit hooks not running
**Reason**: Husky was not initialized, usually because `npm install` was run before `git init`.
**Solution**:
```bash
git init
npx husky install
```

### 2. `EBUSY: resource busy or locked` (Windows)
**Reason**: Windows file system may lock `.husky` files while another process (like an IDE or antivirus) is accessing them.
**Solution**:
- Close your IDE and try again.
- Run your terminal as Administrator.
- If it persists, delete the `.husky/_` directory and run `npx husky install`.

---

## 🐳 Docker & Infrastructure

### 1. Docker Connection Error (Windows)
**Error**: `open //./pipe/dockerDesktopLinuxEngine: The system cannot find the file specified.`
**Reason**: Docker Desktop is not running, or the Docker Engine backend has crashed.
**Solution**:
- **Check Status**: Ensure the Docker Desktop icon in your system tray is **green**.
- **Restart**: Right-click the Docker icon -> **Restart Docker**.
- **WSL2**: If you are using WSL2, ensure it is updated: `wsl --update`.
- **Expose Daemon**: In Docker Desktop Settings -> **General**, ensure "Expose daemon on tcp://localhost:2375 without TLS" is checked if your tools require it (though usually not for the named pipe).

### 2. Kafka Port Conflict (`9093`)
**Error**: `Bind for 0.0.0.0:9093 failed: port is already allocated`
**Reason**: A previous Docker container or another service is already using port 9093.
**Solution**:
- **Windows**: Use `netstat` to find the process ID (PID):
  ```powershell
  # Find the process
  netstat -ano | findstr :9093
  # Kill the process:
  taskkill /F /PID <PID>
  ```
- **Linux/Mac**:
  ```bash
  # Stop all containers
  docker-compose down
  # Or find the process
  sudo lsof -i :9093
  ```

### 2. Database Connection Timeout
**Reason**: The application started before the database was ready.
**Solution**:
- Our templates include `wait-on` or `depends_on` logic. 
- Try restarting only the app: `docker-compose restart app`.

---

## 🚀 Deployment (PM2)

### 1. `Error: spawn wmic ENOENT` (Windows)
**Error**: `PM2 | Error caught while calling pidusage | Error: spawn wmic ENOENT`
**Reason**: PM2 uses the `wmic` tool for process monitoring. Microsoft has deprecated `wmic`, and it is often missing from the PATH or disabled in recent Windows 10/11 updates.
**Solution**:
- **Check Path**: Ensure `C:\Windows\System32\wbem` is added to your **System Environment Variables (PATH)**.
- **Enable Feature**: If it's missing, go to **Settings > Apps > Optional Features**, click "View features", search for **"WMI Commandline Utility"**, and install it.
- **Restart**: Restart your terminal (and PM2) after making these changes.

---

## 🛠️ Generator Issues

### 1. Templates not rendering correctly
**Reason**: Modifications to `.yml` files instead of `.yml.ejs` templates.
**Solution**: 
- Always edit the `.ejs` versions of configuration files in `templates/common`. 
- Ensure you use `<% %>` tags for conditional logic.

> [!TIP]
> Found a new issue? Feel free to [Open an Issue](https://github.com/paudang/nodejs-quickstart-structure/issues) on GitHub!
