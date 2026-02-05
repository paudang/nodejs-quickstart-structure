import fs from 'fs-extra';
import path from 'path';
import { execSync, exec } from 'child_process';
import { generateProject } from '../lib/generator.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ANSI_RESET = "\x1b[0m";
const ANSI_RED = "\x1b[31m";
const ANSI_GREEN = "\x1b[32m";
const ANSI_CYAN = "\x1b[36m";

const LOG_FILE = 'test_results.log';

function log(msg, color = ANSI_RESET) {
    const timestamp = new Date().toISOString();
    console.log(`${color}[${timestamp}] ${msg}${ANSI_RESET}`);
    fs.appendFileSync(LOG_FILE, `[${timestamp}] ${msg}\n`);
}

const LANGUAGES = ['JavaScript', 'TypeScript'];
const DATABASES = ['MySQL', 'PostgreSQL'];
const COMMUNICATIONS = ['REST APIs', 'Kafka']; // Kafka adds complexity (zookeeper), might want to test REST first
const VIEW_ENGINES_MVC = ['None', 'EJS', 'Pug'];

const combinations = [];

// 1. MVC Combinations
LANGUAGES.forEach(lang => {
    VIEW_ENGINES_MVC.forEach(view => {
        DATABASES.forEach(db => {
            COMMUNICATIONS.forEach(comm => {
                combinations.push({
                    projectName: `test_mvc_${lang}_${view}_${db}_${comm}`.replace(/\s+/g, '').toLowerCase().replace(/[^a-z0-9_]/g, ''),
                    language: lang,
                    architecture: 'MVC',
                    viewEngine: view,
                    database: db,
                    dbName: 'testdb',
                    communication: comm
                });
            });
        });
    });
});

// 2. Clean Architecture Combinations
LANGUAGES.forEach(lang => {
    DATABASES.forEach(db => {
        COMMUNICATIONS.forEach(comm => {
            combinations.push({
                projectName: `test_clean_${lang}_${db}_${comm}`.replace(/\s+/g, '').toLowerCase().replace(/[^a-z0-9_]/g, ''),
                language: lang,
                architecture: 'Clean Architecture',
                viewEngine: 'None', // Not used
                database: db,
                dbName: 'testdb',
                communication: comm
            });
        });
    });
});

async function runCommand(command, cwd) {
    return new Promise((resolve, reject) => {
        exec(command, { cwd }, (error, stdout, stderr) => {
            if (error) {
                // Attach stdout/stderr for debugging
                error.stdout = stdout;
                error.stderr = stderr;
                reject(error);
            } else {
                resolve(stdout);
            }
        });
    });
}

async function checkHealth() {
    // Poll localhost:3000/health (or / for view engines)
    // Retry for 30 seconds
    const start = Date.now();
    while (Date.now() - start < 60000) { // 60s timeout
        try {
            // Use fetch (Node18+)
            const res = await fetch('http://localhost:3000/health');
            if (res.ok) return true;
        } catch (e) {
            // ignore ref connection
        }
        await new Promise(r => setTimeout(r, 2000));
    }
    return false;
}

async function runTest(config, index) {
    const testDir = path.resolve(__dirname, '../temp_test_workspace');
    const projectPath = path.join(testDir, config.projectName);

    log(`>>> Starting Test ${index + 1}/${combinations.length}: ${config.projectName}`, ANSI_CYAN);
    
    try {
        // Cleanup Project Path
        await fs.remove(projectPath);
        await fs.ensureDir(testDir);

        // 1. Generate
        process.chdir(testDir); // generateProject expects cwd context sometimes or absolute paths
        await generateProject(config);
        log(`✓ Project Generated`);

        // 2. Install Deps (This is the slow part)
        log(`... Installing Dependencies (this takes time) ...`);
        await runCommand('npm install', projectPath);
        
        // 3. Docker Up
        log(`... Starting Docker ...`);
        // Use 'docker compose' instead of 'docker-compose'
        const composeCmd = 'docker compose'; 
        
        try {
            await runCommand(`${composeCmd} down -v`, projectPath);
        } catch (e) { /* ignore cleanup error on start */ }
        
        // Wait for ports to release
        await new Promise(r => setTimeout(r, 5000));
        
        await runCommand(`${composeCmd} up -d --build`, projectPath); 

        // 4. Verify Health
        log(`... Waiting for Health Check ...`);
        const isHealthy = await checkHealth();
        
        if (isHealthy) {
            log(`✓ Health Check Passed`, ANSI_GREEN);
        } else {
            // Logs for debug
            try {
                const logs = await runCommand(`${composeCmd} logs app`, projectPath);
                log(`!!! Health Check FAILED. App Logs:\n${logs}`, ANSI_RED);
            } catch (e) {}
            throw new Error("Health check timeout");
        }

    } catch (err) {
        log(`X Test FAILED: ${err.message}`, ANSI_RED);
        if (err.stdout) log(`Stdout: ${err.stdout}`);
        // if (err.stderr) log(`Stderr: ${err.stderr}`); // Stderr often contains non-error info from Docker
        
        return false;
    } finally {
        // Cleanup
        log(`... Cleaning Up ...`);
        try {
             await runCommand('docker compose down -v', projectPath);
        } catch (e) {
             // ignore
        }
    }
    return true;
}

async function cleanupOrphanedContainers() {
    log(`... Ensuring ports are free (removing 'test_*' containers) ...`, ANSI_CYAN);
    try {
        // Find containers starting with test_
        const stdout = await runCommand('docker ps -a --filter "name=test_" --format "{{.ID}}"');
        if (stdout.trim()) {
            const ids = stdout.trim().split(/\s+/).join(' ');
            await runCommand(`docker rm -f ${ids}`);
            log(`✓ Removed orphaned containers: ${ids}`);
        }
    } catch (e) {
        // ignore if no containers or error
    }
}

async function main() {
    // Check Docker availability using 'docker compose' (v2) or 'docker-compose' (v1)
    // Assuming 'docker-compose' based on user interactions
    
    // Parse args
    const specificIndex = process.argv[2];
    
    let testsToRun = combinations;
    if (specificIndex !== undefined) {
        const idx = parseInt(specificIndex);
        if (!isNaN(idx) && idx >= 0 && idx < combinations.length) {
            testsToRun = [combinations[idx]];
        }
    }

    log(`Running ${testsToRun.length} tests...`);

    let passed = 0;
    let failed = 0;

    for (let i = 0; i < testsToRun.length; i++) {
        // Force cleanup before every test to ensure ports are free
        await cleanupOrphanedContainers();
        
        const result = await runTest(testsToRun[i], i);
        if (result) {
            passed++;
        } else {
            failed++;
            log(`\n!!! Stopping execution due to test failure. Fix the issue and restart. !!!`, ANSI_RED);
            process.exit(1);
        }
    }

    log(`\n=== Summary ===`);
    log(`Total: ${testsToRun.length}`);
    log(`Passed: ${passed}`, ANSI_GREEN);
    log(`Failed: ${failed}`, ANSI_RED);
}

main();
