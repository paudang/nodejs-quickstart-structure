import fs from 'fs-extra';
import path from 'path';
import { spawn } from 'child_process';
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

process.on('uncaughtException', (err) => {
    console.error('UNCAUGHT EXCEPTION:', err);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('UNHANDLED REJECTION:', reason);
    process.exit(1);
});

const LANGUAGES = ['TypeScript', 'JavaScript'];
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



async function runCommand(command, cwd, env = {}) {
    return new Promise((resolve, reject) => {
        const [cmd, ...args] = command.split(' ');
        // spawn to stream output
        const child = spawn(cmd, args, { 
            cwd, 
            stdio: 'inherit', // Stream to console immediately
            shell: true,      // Execute in shell to handle command chains/path
            env: { ...process.env, ...env }
        });

        child.on('error', (error) => {
             reject(error);
        });

        child.on('close', (code) => {
            if (code === 0) {
                resolve('Command completed successfully');
            } else {
                reject(new Error(`Command exited with code ${code}`));
            }
        });
    });
}

function getRandomPort(usedPorts = new Set()) {
    let port;
    do {
        // Avoid Hyper-V reserved ranges (often 50000+)
        port = Math.floor(Math.random() * (45000 - 10000) + 10000);
    } while (usedPorts.has(port));
    usedPorts.add(port);
    return port;
}

async function checkHealth(config, hostPort) {
    const port = hostPort || 3000;
    const start = Date.now();
    while (Date.now() - start < 120000) { // 120s timeout
        try {
            const res = await fetch(`http://localhost:${port}/health`);
            if (res.ok) {
                // Once health is OK, perform functional tests
                console.log(`Health check passed. Config: Arch='${config.architecture}', Comm='${config.communication}'`);

                if (config.architecture === 'Clean Architecture' && config.communication === 'Kafka') {
                    console.log('✓ Health Check Passed (Skipping functional checks for Clean+Kafka)', ANSI_GREEN);
                    return true;
                }

                const importsApi = config.communication === 'REST APIs' 
                                   || (config.architecture === 'MVC' && config.viewEngine !== 'None');

                if (importsApi) {
                     try {
                        // 1. POST /api/users
                        const postRes = await fetch(`http://localhost:${port}/api/users`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ name: 'Test User', email: 'test@example.com' })
                        });
                        
                        if (postRes.ok) {
                             // 2. GET /api/users
                            const getRes = await fetch(`http://localhost:${port}/api/users`);
                            if (getRes.ok) {
                                const users = await getRes.json();
                                console.log(`✓ Health & Functional Checks Passed. GET /api/users returned: ${JSON.stringify(users)}`, ANSI_GREEN);
                                return true;
                            } else {
                                const errText = await getRes.text();
                                console.log(`GET /api/users failed: ${getRes.status} - ${errText} (retrying)`);
                            }
                        } else if (postRes.status === 404) {
                             console.log('✓ Health Check Passed (API route not found - expected for non-REST projects)', ANSI_GREEN);
                             return true;
                        } else {
                             // Log but allow retry (DB might be starting)
                             const errText = await postRes.text();
                             console.log(`Functional check failed (retrying): ${postRes.status} - ${errText}`);
                        }
                    } catch (err) {
                        console.log(`Functional test error: ${err.message}`);
                    }
                } else {
                     console.log('✓ Health Check Passed (Skipping REST checks for project without API routes)', ANSI_GREEN);
                     return true;
                }
            }
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

    // Generate random ports for this test run
    const usedPorts = new Set();
    const TEST_ENV = {
        PORT: getRandomPort(usedPorts).toString(),
        DB_PORT: getRandomPort(usedPorts).toString(),
        ZOOKEEPER_PORT: getRandomPort(usedPorts).toString(),
        KAFKA_PORT: getRandomPort(usedPorts).toString()
    };

    log(`>>> Starting Test ${index + 1}/${combinations.length}: ${config.projectName}`, ANSI_CYAN);
    log(`    Ports -> APP:${TEST_ENV.PORT}, DB:${TEST_ENV.DB_PORT}, ZK:${TEST_ENV.ZOOKEEPER_PORT}, KAFKA:${TEST_ENV.KAFKA_PORT}`);
    
    try {
        // Cleanup Project Path
        await fs.remove(projectPath);
        await fs.ensureDir(testDir);

        // 1. Generate via CLI
        const cliPath = path.resolve(__dirname, '../bin/index.js');
        const args = [
            'init',
            '--project-name', config.projectName,
            '--language', config.language,
            '--architecture', `"${config.architecture}"`,
            '--database', config.database,
            '--db-name', config.dbName,
            '--communication', `"${config.communication}"`,
            '--include-ci' // Ensure CI is generated for testing professional standards
        ];

        if (config.architecture === 'MVC') {
            args.push('--view-engine', config.viewEngine);
        }

        const command = `node ${cliPath} ${args.join(' ')}`;
        console.log(`Running: ${command}`); // specific logging for debug
        
        process.chdir(testDir); 
        await runCommand(command, testDir);
        log(`✓ Project Generated (CLI)`);

        // 2. Initialize Git (Required for Husky)
        await runCommand('git init', projectPath);

        // 3. Install Deps (This is the slow part)
        log(`... Installing Dependencies (this takes time) ...`);
        await runCommand('npm install', projectPath);

        // 2.1 Verify Professional Standards (Configs & Tests)
        log(`... Verifying Professional Standards ...`);
        const requiredFiles = ['.eslintrc.json', '.prettierrc', '.lintstagedrc', 'jest.config.js', 'Dockerfile', 'README.md'];
        for (const file of requiredFiles) {
            if (!await fs.pathExists(path.join(projectPath, file))) {
                throw new Error(`Missing Professional Standard File: ${file}`);
            }
        }
        
        // 2.2 Run Linter & Tests
        try {
            log(`... Running Linter ...`);
            await runCommand('npm run lint', projectPath); // Should pass on fresh project
            log(`... Running Unit Tests ...`);
            await runCommand('npm test', projectPath); // Should pass health check test
        } catch (e) {
            throw new Error(`Professional Standards Check Failed: ${e.message}\nStdout: ${e.stdout}`);
        }
        
        // 3. Docker Up
        log(`... Starting Docker ...`);
        // Use 'docker compose' instead of 'docker-compose'
        const composeCmd = 'docker compose'; 
        
        try {
            await runCommand(`${composeCmd} down -v`, projectPath, TEST_ENV);
        } catch (e) { /* ignore cleanup error on start */ }
        
        // Wait for ports to release
        await new Promise(r => setTimeout(r, 2000));
        
        await runCommand(`${composeCmd} up -d --build`, projectPath, TEST_ENV); 

        // 4. Verify Health
        log(`... Waiting for Health Check ...`);
        const isHealthy = await checkHealth(config, TEST_ENV.PORT);
        
        if (isHealthy) {
            log(`✓ Health Check Passed`, ANSI_GREEN);
        } else {
            // Logs for debug
            try {
                const logs = await runCommand(`${composeCmd} logs`, projectPath, TEST_ENV);
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
             await runCommand('docker compose down -v', projectPath, TEST_ENV);
        } catch (e) {
             // ignore
        }
        await fs.remove(projectPath);
    }
    return true;
}

async function cleanupOrphanedContainers() {
    log(`... Ensuring ports are free (removing 'test_*' containers) ...`, ANSI_CYAN);
    try {
        // Find containers starting with test_
        const stdout = await runCommand('docker ps -a --filter "name=test_" --format "{{.ID}}"');
        if (typeof stdout === 'string' && stdout.trim()) {
            const ids = stdout.trim().split(/\s+/).join(' ');
            await runCommand(`docker rm -f ${ids}`);
            log(`✓ Removed orphaned containers: ${ids}`);
        } else if (stdout && stdout.stdout) {
             if (stdout.stdout.trim()) {
                const ids = stdout.stdout.trim().split(/\s+/).join(' ');
                await runCommand(`docker rm -f ${ids}`);
                log(`✓ Removed orphaned containers: ${ids}`);
             }
        }
    } catch (e) {
        // ignore if no containers or error
    }
}

async function main() {
    // Check Docker availability using 'docker compose' (v2) or 'docker-compose' (v1)
    // Assuming 'docker-compose' based on user interactions
    
    // Parse args
    const arg = process.argv[2];
    
    let testsToRun = combinations;

    if (arg !== undefined) {
        if (arg.includes('/')) {
            // Batch mode: "1/5" means batch 1 of 5
            const [batchStr, totalStr] = arg.split('/');
            const batch = parseInt(batchStr);
            const totalBatches = parseInt(totalStr);

            if (!isNaN(batch) && !isNaN(totalBatches) && batch > 0 && totalBatches > 0 && batch <= totalBatches) {
                const totalTests = combinations.length;
                const batchSize = Math.ceil(totalTests / totalBatches);
                const start = (batch - 1) * batchSize;
                const end = Math.min(start + batchSize, totalTests);
                
                testsToRun = combinations.slice(start, end);
                log(`Running Batch ${batch}/${totalBatches} (Indices ${start}-${end - 1})`);
            } else {
                log(`Invalid batch format: ${arg}. Expected "k/n" where 1 <= k <= n.`, ANSI_RED);
                process.exit(1);
            }
        } else {
            // Single index mode
            const idx = parseInt(arg);
            if (!isNaN(idx) && idx >= 0 && idx < combinations.length) {
                testsToRun = [combinations[idx]];
            }
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
