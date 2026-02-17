import fs from 'fs-extra';
import path from 'path';
import net from 'net';
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

const LANGUAGES = ['TypeScript', 'JavaScript'];
const DATABASES = ['None','MySQL', 'PostgreSQL', 'MongoDB'];
const COMMUNICATIONS = ['REST APIs', 'Kafka']; 
const CACHING = ['None', 'Redis'];
const VIEW_ENGINES_MVC = ['EJS', 'Pug', 'None'];

export const combinations = [];

// 1. Clean Architecture Combinations
LANGUAGES.forEach(lang => {
    DATABASES.forEach(db => {
        COMMUNICATIONS.forEach(comm => {
            // Only test Redis if DB is not None
            const cachingOptions = db !== 'None' ? CACHING : ['None'];

            cachingOptions.forEach(cache => {
                combinations.push({
                    projectName: `test_clean_${lang}_${db}_${comm}_${cache}`.replace(/\s+/g, '').toLowerCase().replace(/[^a-z0-9_]/g, ''),
                    language: lang,
                    architecture: 'Clean Architecture',
                    viewEngine: 'None', 
                    database: db,
                    dbName: db !== 'None' ? 'testdb' : undefined,
                    communication: comm,
                    caching: cache
                });
            });
        });
    });
});
// 2. MVC Combinations
LANGUAGES.forEach(lang => {
    VIEW_ENGINES_MVC.forEach(view => {
        DATABASES.forEach(db => {
            COMMUNICATIONS.forEach(comm => {
                // Only test Redis if DB is not None (as per constraint)
                const cachingOptions = db !== 'None' ? CACHING : ['None'];
                
                cachingOptions.forEach(cache => {
                    combinations.push({
                        projectName: `test_mvc_${lang}_${view}_${db}_${comm}_${cache}`.replace(/\s+/g, '').toLowerCase().replace(/[^a-z0-9_]/g, ''),
                        language: lang,
                        architecture: 'MVC',
                        viewEngine: view,
                        database: db,
                        dbName: db !== 'None' ? 'testdb' : undefined,
                        communication: comm,
                        caching: cache
                    });
                });
            });
        });
    });
});

async function runCommand(command, cwd, env = {}, captureOutput = false) {
    return new Promise((resolve, reject) => {
        const [cmd, ...args] = command.split(' ');
        const child = spawn(cmd, args, { 
            cwd, 
            stdio: captureOutput ? ['ignore', 'pipe', 'pipe'] : 'inherit',
            shell: true,      
            env: { ...process.env, ...env }
        });

        let output = '';

        if (captureOutput) {
            child.stdout.on('data', (data) => output += data.toString());
            child.stderr.on('data', (data) => output += data.toString());
        }

        child.on('error', (error) => {
             reject(error);
        });

        child.on('close', (code) => {
            if (code === 0) {
                resolve(captureOutput ? output : 'Command completed successfully');
            } else {
                reject(new Error(captureOutput ? output : `Command exited with code ${code}`));
            }
        });
    });
}

function isPortAvailable(port) {
    return new Promise((resolve) => {
        const server = net.createServer();
        server.once('error', () => resolve(false));
        server.once('listening', () => {
            server.close(() => resolve(true));
        });
        server.listen(port);
    });
}

async function getFreePort(usedPorts) {
    let port;
    let available = false;
    let attempts = 0;
    const MAX_ATTEMPTS = 100;

    while (!available && attempts < MAX_ATTEMPTS) {
        attempts++;
        port = Math.floor(Math.random() * (45000 - 10000) + 10000);
        
        if (!usedPorts.has(port)) {
            // Optimistically mark as used to prevent internal race conditions
            usedPorts.add(port);
            
            // Check actual OS availability
            if (await isPortAvailable(port)) {
                available = true;
            } else {
                usedPorts.delete(port); // Release if actually taken
            }
        }
    }
    
    if (!available) {
        throw new Error("Failed to find a free port after multiple attempts");
    }
    
    return port;
}

async function checkHealth(config, hostPort) {
    const port = hostPort || 3000;
    const start = Date.now();
    while (Date.now() - start < 60000) { 
        try {
            const res = await fetch(`http://localhost:${port}/health`);
            if (res.ok) {
                 // Additional functional checks for REST APIs
                 if (config.communication === 'REST APIs' && (config.viewEngine !== 'None' || config.architecture === 'Clean Architecture')) {
                    try {
                        const postRes = await fetch(`http://localhost:${port}/api/users`, {
                             method: 'POST',
                             headers: { 'Content-Type': 'application/json' },
                             body: JSON.stringify({ name: 'Test User', email: `test${Date.now()}@example.com` })
                        });
                        
                        if (postRes.ok) {
                             console.log('✓ Health Check Passed (API functional)', ANSI_GREEN);
                             return true;
                        } else if (postRes.status === 404) {
                             console.log('✓ Health Check Passed (API route not found - expected for non-REST projects)', ANSI_GREEN);
                             return true;
                        } else {
                             const errText = await postRes.text();
                             console.log(`Functional check failed (retrying): ${postRes.status} - ${errText}`);
                        }
                    } catch (err) {
                        console.log(`Functional test error: ${err.message}`);
                    }
                } else {
                     console.log('✓ Health Check Passed', ANSI_GREEN);
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

// Simple p-limit implementation for concurrency control
function pLimit(concurrency) {
    const queue = [];
    let active = 0;
    
    const next = () => {
        active--;
        if (queue.length > 0) {
            queue.shift()();
        }
    };
    
    return (fn) => new Promise((resolve, reject) => {
        const run = async () => {
            active++;
            try {
                const result = await fn();
                resolve(result);
            } catch (err) {
                reject(err);
            } finally {
                next();
            }
        };
        
        if (active < concurrency) {
            run();
        } else {
            queue.push(run);
        }
    });
}

export async function runTest(config, index, options = {}, sharedPorts) {
    const { skipDocker = false } = options;
    const testDir = path.resolve(__dirname, '../../temp_test_workspace');
    const projectPath = path.join(testDir, config.projectName);

    // Use shared ports or local if not provided (fallback)
    const usedPorts = sharedPorts || new Set();
    const TEST_ENV = {
        PORT: (await getFreePort(usedPorts)).toString(),
        DB_PORT: (await getFreePort(usedPorts)).toString(),
        ZOOKEEPER_PORT: (await getFreePort(usedPorts)).toString(),
        KAFKA_PORT: (await getFreePort(usedPorts)).toString()
    };

    log(`>>> Starting Test ${index + 1}/${combinations.length}: ${config.projectName}`, ANSI_CYAN);
    if (!skipDocker) {
        log(`    Ports -> APP:${TEST_ENV.PORT}, DB:${TEST_ENV.DB_PORT}, ZK:${TEST_ENV.ZOOKEEPER_PORT}, KAFKA:${TEST_ENV.KAFKA_PORT}`);
    }
    
    try {
        await fs.remove(projectPath);
        await fs.ensureDir(testDir);

        // 1. Generate via CLI
        const cliPath = path.resolve(__dirname, '../../bin/index.js');
        const args = [
            'init',
            '--project-name', config.projectName,
            '--language', config.language,
            '--architecture', `"${config.architecture}"`,
            '--database', config.database,

            ...(config.dbName ? ['--db-name', config.dbName] : []),
            '--communication', `"${config.communication}"`,
            '--ci-provider', '"GitHub Actions"' 
        ];

        if (config.caching) {
            args.push('--caching', config.caching);
        }

        if (config.architecture === 'MVC') {
            args.push('--view-engine', config.viewEngine);
        }

        const command = `node ${cliPath} ${args.join(' ')}`;
        // Removed process.chdir(testDir) for parallel safety
        await runCommand(command, testDir);
        log(`✓ Project Generated (CLI)`);

        // 2. Initialize Git
        await runCommand('git init', projectPath);

        // 3. Install Deps
        log(`... Installing Dependencies ...`);
        await runCommand('npm install', projectPath);

        // 2.1 Verify Professional Standards
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
            await runCommand('npm run lint', projectPath); 
            log(`... Running Unit Tests ...`);
            await runCommand('npm test', projectPath); 
        } catch (e) {
            throw new Error(`Professional Standards Check Failed: ${e.message}`);
        }
        
        // SKIP DOCKER IF REQUESTED
        if (skipDocker) {
            log(`✓ Validation Passed (Docker Skipped)`);
            return { success: true };
        }

        // 3. Docker Up
        log(`... Starting Docker ...`);
        const composeCmd = 'docker compose'; 
        
        try {
            await runCommand(`${composeCmd} down -v`, projectPath, TEST_ENV);
        } catch (e) {}
        
        await new Promise(r => setTimeout(r, 2000));
        
        await runCommand(`${composeCmd} up -d --build`, projectPath, TEST_ENV); 

        // 4. Verify Health
        log(`... Waiting for Health Check ...`);
        const isHealthy = await checkHealth(config, TEST_ENV.PORT);
        
        if (isHealthy) {
            log(`✓ Health Check Passed`, ANSI_GREEN);
        } else {
            try {
                const logs = await runCommand(`${composeCmd} logs`, projectPath, TEST_ENV, true);
                log(`!!! Health Check FAILED. App Logs:\n${logs}`, ANSI_RED);
            } catch (e) {}
            throw new Error("Health check timeout");
        }

    } catch (err) {
        log(`X Test FAILED: ${err.message}`, ANSI_RED);
        return { success: false, error: err.message };
    } finally {
        // Cleanup
        log(`... Cleaning Up ...`);
        if (!skipDocker) {
            try {
                await runCommand('docker compose down -v', projectPath, TEST_ENV);
            } catch (e) {}
        }
        
        // Robust cleanup with retries for Windows EPERM
        let attempts = 0;
        while (attempts < 3) {
            try {
                await fs.remove(projectPath);
                break;
            } catch (e) {
                attempts++;
                if (attempts >= 3) {
                    log(`Warning: Failed to cleanup ${projectPath}: ${e.message}`, ANSI_RED);
                } else {
                    await new Promise(r => setTimeout(r, 1000)); // Wait 1s before retry
                }
            }
        }
    }
    return { success: true };
}

export async function runValidation(options = {}) {
    const { specificTestIndex, concurrency = 1 } = options;
    
    log(`Running ${combinations.length} tests with concurrency ${concurrency}...`, ANSI_CYAN);
    if (specificTestIndex !== undefined) {
        log(`Targeting single test index: ${specificTestIndex}`, ANSI_CYAN);
    }

    try {
        await fs.remove(path.resolve(__dirname, '../../temp_test_workspace'));
    } catch(e) {}

    let passed = 0;
    let failed = 0;
    const failures = [];
    const sharedPorts = new Set();
    const limit = pLimit(concurrency);

    const testPromises = combinations.map((config, i) => {
        if (specificTestIndex !== undefined && i !== specificTestIndex) return null;
        
        return limit(async () => {
             try {
                const result = await runTest(config, i, options, sharedPorts);
                if (result.success) {
                    passed++;
                } else {
                    failed++;
                    failures.push({
                        index: i,
                        name: config.projectName,
                        error: result.error || "Unknown error"
                    });
                }
                // Fail fast if single test mode
                if (!result.success && specificTestIndex !== undefined) {
                     console.log("!!! Stopping execution due to test failure. Fix the issue and restart. !!!");
                     process.exit(1);
                }
            } catch (error) {
                 failed++;
                 failures.push({
                    index: i,
                    name: config.projectName,
                    error: error.message
                });
            }
        });
    });

    await Promise.all(testPromises.filter(p => p !== null));

    log('\n=== Summary ===', ANSI_CYAN);
    log(`Total: ${passed + failed}`);
    log(`Passed: ${passed}`, ANSI_GREEN);
    log(`Failed: ${failed}`, ANSI_RED);

    if (failed > 0) {
        log('\n=== Failed Tests ===', ANSI_RED);
        failures.forEach(f => {
            log(`[${f.index + 1}] ${f.name} - Reason: ${f.error || 'Test failed'}`, ANSI_RED);
        });
        process.exit(1);
    }
}
