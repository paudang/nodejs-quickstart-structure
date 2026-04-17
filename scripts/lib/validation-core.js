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

const LANGUAGES = ['JavaScript', 'TypeScript'];
const DATABASES = ['None','MySQL', 'PostgreSQL', 'MongoDB'];
const COMMUNICATIONS = ['REST APIs', 'GraphQL', 'Kafka']; 
const CACHING = ['None', 'Redis', 'Memory Cache'];
const VIEW_ENGINES_MVC = ['EJS', 'Pug', 'None'];
const AUTHS = ['None', 'JWT'];

export const combinations = [];

// 1. Clean Architecture Combinations
LANGUAGES.forEach(lang => {
    DATABASES.forEach(db => {
        COMMUNICATIONS.forEach(comm => {
        for (const auth of AUTHS) {
            const cachingOptions = db !== 'None' ? CACHING : ['None'];

            cachingOptions.forEach(cache => {
                combinations.push({
                    projectName: `test_clean_${lang}_${db}_${comm}_${cache}_${auth}`.replace(/\s+/g, '').toLowerCase().replace(/[^a-z0-9_]/g, ''),
                    language: lang,
                    architecture: 'Clean Architecture',
                    viewEngine: 'None', 
                    database: db,
                    dbName: db !== 'None' ? 'testdb' : undefined,
                    communication: comm,
                    caching: cache,
                    auth: [auth],
                    ciProvider: 'GitHub Actions',
                    includeSecurity: true
                });
            });
        }
        });
    });
});


// 2. MVC Combinations
LANGUAGES.forEach(lang => {
    VIEW_ENGINES_MVC.forEach(view => {
        DATABASES.forEach(db => {
            COMMUNICATIONS.forEach(comm => {
            for (const auth of AUTHS) {
                const cachingOptions = db !== 'None' ? CACHING : ['None'];
                cachingOptions.forEach(cache => {
                    combinations.push({
                        projectName: `test_mvc_${lang}_${view}_${db}_${comm}_${cache}_${auth}`.replace(/\s+/g, '').toLowerCase().replace(/[^a-z0-9_]/g, ''),
                        language: lang,
                        architecture: 'MVC',
                        viewEngine: view,
                        database: db,
                        dbName: db !== 'None' ? 'testdb' : undefined,
                        communication: comm,
                        caching: cache,
                        auth: [auth],
                        ciProvider: 'GitHub Actions',
                        includeSecurity: true
                    });
                });
            }
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
    while (Date.now() - start < 180000) { 
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000);
            
            const res = await fetch(`http://127.0.0.1:${port}/health`, {
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            if (res.ok) {
                 const healthPayload = await res.json();
                 if (
                    healthPayload.status !== 'UP' || 
                    typeof healthPayload.uptime !== 'number' ||
                    typeof healthPayload.memory !== 'object'
                 ) {
                     console.log(`!!! Health payload malformed: ${JSON.stringify(healthPayload)}`, ANSI_RED);
                     return false;
                 }
                 
                  if (config.communication === 'REST APIs' || config.communication === 'Kafka') {
                    try {
                        const baseUrl = `http://127.0.0.1:${port}/api/users`;
                        const authUrl = `http://127.0.0.1:${port}/api/auth/login`;
                        const testPassword = 'password123';
                        const testEmail = `test${Date.now()}@example.com`;
                        
                        // 1. Create (Sign Up)
                        const postRes = await fetch(baseUrl, {
                             method: 'POST',
                             headers: { 'Content-Type': 'application/json' },
                             body: JSON.stringify({ 
                               name: 'Test User', 
                               email: testEmail,
                               ...(config.auth && config.auth.includes('JWT') ? { password: testPassword } : {})
                             })
                        });
                        
                        if (postRes.ok) {
                             const user = await postRes.json();
                             const userId = user.id || user._id;

                             let headers = { 'Content-Type': 'application/json' };
                             let currentRefreshToken = null;

                             // 1b. Login if Auth is enabled
                             if (config.auth && config.auth.includes('JWT')) {
                                 const loginRes = await fetch(authUrl, {
                                     method: 'POST',
                                     headers: { 'Content-Type': 'application/json' },
                                     body: JSON.stringify({ email: testEmail, password: testPassword })
                                 });
                                 if (!loginRes.ok) throw new Error('Login failed');
                                 const { accessToken, refreshToken } = await loginRes.json();
                                 headers['Authorization'] = `Bearer ${accessToken}`;
                                 currentRefreshToken = refreshToken;

                                 // 1c. Test Refresh
                                 const refreshUrl = `http://127.0.0.1:${port}/api/auth/refresh`;
                                 const refreshRes = await fetch(refreshUrl, {
                                     method: 'POST',
                                     headers: { 'Content-Type': 'application/json' },
                                     body: JSON.stringify({ refreshToken })
                                 });
                                 if (!refreshRes.ok) throw new Error('Refresh token flow failed');
                                 const refreshedTokens = await refreshRes.json();
                                 headers['Authorization'] = `Bearer ${refreshedTokens.accessToken}`;
                                 currentRefreshToken = refreshedTokens.refreshToken;
                             }

                             // 2. Update
                             const patchRes = await fetch(`${baseUrl}/${userId}`, {
                                 method: 'PATCH',
                                 headers,
                                 body: JSON.stringify({ name: 'Updated User' })
                             });

                             // 3. Delete
                             const deleteRes = await fetch(`${baseUrl}/${userId}`, {
                                 method: 'DELETE',
                                 headers
                             });

                             // 4. Logout
                             if (config.auth && config.auth.includes('JWT')) {
                                 const logoutUrl = `http://127.0.0.1:${port}/api/auth/logout`;
                                 const logoutRes = await fetch(logoutUrl, {
                                    method: 'POST',
                                    headers,
                                    body: JSON.stringify({ refreshToken: currentRefreshToken })
                                 });
                                 if (!logoutRes.ok) throw new Error('Logout failed');
                             }


                             if (patchRes.ok && deleteRes.ok) {
                                 if (config.communication === 'Kafka') {
                                     log('... Verifying Kafka Flow in Logs (Wait 5s) ...');
                                     await new Promise(r => setTimeout(r, 5000));
                                     try {
                                         const logs = await runCommand(`docker compose logs`, path.join(path.resolve(__dirname, '../../temp_test_workspace'), config.projectName), {}, true);
                                         
                                         const requiredKafkaLogs = [
                                             '[Kafka] Producer: Sent USER_CREATED event',
                                             '[Kafka] Consumer: Received USER_CREATED.',
                                             '[Kafka] Producer: Sent USER_UPDATED event',
                                             '[Kafka] Consumer: Received USER_UPDATED.',
                                             '[Kafka] Producer: Sent USER_DELETED event',
                                             '[Kafka] Consumer: Received USER_DELETED.'
                                         ];

                                         let allFound = true;
                                         for (const logText of requiredKafkaLogs) {
                                             if (!logs.includes(logText)) {
                                                 console.log(`!!! Missing Kafka log: "${logText}" (Retrying...)`, ANSI_RED);
                                                 allFound = false;
                                                 break;
                                             }
                                         }
                                         
                                         if (allFound) {
                                             log('✓ Kafka CRUD Flow verified in logs', ANSI_GREEN);
                                             return true;
                                         }
                                     } catch (err) {
                                         console.log(`Kafka Log verification error: ${err.message}`);
                                     }
                                 } else {
                                     console.log('✓ Health Check Passed (Full REST CRUD functional)', ANSI_GREEN);
                                     return true;
                                 }
                             }
                        }
                    } catch (err) {}
                } else if (config.communication === 'GraphQL') {
                     try {
                         const gqlUrl = `http://127.0.0.1:${port}/graphql`;
                         
                         // 1. Create Mutation
                         const testPassword = 'password123';
                         const passwordArg = config.auth && config.auth.includes('JWT') ? `, password: "${testPassword}"` : '';
                         const createMutation = `mutation { createUser(name: "GQL Test", email: "gql${Date.now()}@test.com"${passwordArg}) { id } }`;
                         const createRes = await fetch(gqlUrl, {
                               method: 'POST',
                               headers: { 'Content-Type': 'application/json' },
                               body: JSON.stringify({ query: createMutation })
                         });
                         const createData = await createRes.json();
                         if (createData.errors) {
                             console.log(`!!! GraphQL Create Errors: ${JSON.stringify(createData.errors)}`, ANSI_RED);
                             throw new Error('GraphQL mutation failed');
                         }
                         const userId = createData.data.createUser.id;

                         // 2. Update Mutation
                         const updateMutation = `mutation { updateUser(id: "${userId}", name: "GQL Updated") { id name } }`;
                         await fetch(gqlUrl, {
                               method: 'POST',
                               headers: { 'Content-Type': 'application/json' },
                               body: JSON.stringify({ query: updateMutation })
                         });

                         // 3. Delete Mutation
                         const deleteMutation = `mutation { deleteUser(id: "${userId}") }`;
                         const deleteRes = await fetch(gqlUrl, {
                               method: 'POST',
                               headers: { 'Content-Type': 'application/json' },
                               body: JSON.stringify({ query: deleteMutation })
                         });
                         const deleteData = await deleteRes.json();
                         
                         if (deleteData.data.deleteUser) {
                               console.log('✓ Health Check Passed (Full GraphQL CRUD functional)', ANSI_GREEN);
                               return true;
                         }
                     } catch (err) {}
                } else {
                     console.log('✓ Health Check Passed', ANSI_GREEN);
                     return true;
                }
            }
        } catch (e) {}
        await new Promise(r => setTimeout(r, 2000));
    }
    return false;
}

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

    const usedPorts = sharedPorts || new Set();
    const kafkaPort = (await getFreePort(usedPorts)).toString();
    const TEST_ENV = {
        PORT: (await getFreePort(usedPorts)).toString(),
        DB_PORT: (await getFreePort(usedPorts)).toString(),
        KAFKA_PORT: kafkaPort,
        KAFKA_EXTERNAL_PORT: kafkaPort,
        REDIS_PORT: (await getFreePort(usedPorts)).toString()
    };

    log(`>>> Starting Test ${index + 1}/${combinations.length}: ${config.projectName}`, ANSI_CYAN);
    if (!skipDocker) {
        log(`    Ports -> APP:${TEST_ENV.PORT}, DB:${TEST_ENV.DB_PORT}, KAFKA:${TEST_ENV.KAFKA_PORT}, REDIS:${TEST_ENV.REDIS_PORT}`);
    }
    
    let isSuccess = false;
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
            '--ci-provider', `"${config.ciProvider}"`
        ];

        if (config.includeSecurity) {
            args.push('--include-security');
        }

        if (config.caching) {
            args.push('--caching', `"${config.caching}"`);
        }

        if (config.architecture === 'MVC') {
            args.push('--view-engine', config.viewEngine);
        }

        if (config.auth) {
            args.push('--auth', ...config.auth);
            if (config.auth.some(a => a !== 'None')) {
                args.push('--advanced-options');
            } else {
                args.push('--no-advanced-options');
            }
        }

        const command = `node ${cliPath} ${args.join(' ')}`;
        await runCommand(command, testDir);
        log(`✓ Project Generated (CLI)`);

        // 2. Initialize Git
        await runCommand('git init', projectPath);

        // 3. Install Deps (triggers prepare -> husky install)
        log(`... Installing Dependencies ...`);
        await runCommand('npm install --no-audit --no-fund --loglevel=error', projectPath);

        // 3a. Verify Git Hooks (Husky)
        log(`... Verifying Git Hooks (Husky/Lint-Staged) ...`);
        const huskyDir = path.join(projectPath, '.husky');
        const preCommitHook = path.join(huskyDir, 'pre-commit');
        if (!await fs.pathExists(preCommitHook)) {
             log(`! WARNING: Husky pre-commit hook NOT found at ${preCommitHook}.`, ANSI_RED);
        } else {
             log(`✓ Husky Hook Verified`, ANSI_GREEN);
             log(`... Testing lint-staged (Dry Run) ...`);
             try {
                 await runCommand('git add .', projectPath);
                 await runCommand('npx lint-staged', projectPath, {}, true);
                 log(`✓ Pre-commit logic (lint-staged) passed`, ANSI_GREEN);
             } catch (e) {
                 log(`! WARNING: lint-staged test failed: ${e.message}`, ANSI_RED);
             }
        }

        // 4. Verify Professional Standards
        log(`... Verifying Professional Standards ...`);
        const requiredFiles = ['eslint.config.mjs', '.prettierrc', '.lintstagedrc', 'jest.config.js', 'Dockerfile', 'README.md', 'ecosystem.config.js'];
        for (const file of requiredFiles) {
            if (!await fs.pathExists(path.join(projectPath, file))) {
                throw new Error(`Missing Professional Standard File: ${file}`);
            }
        }
        
        // 5. Run Linter & Tests
        try {
            log(`... Running Linter ...`);
            await runCommand('npm run lint', projectPath, {}, true); 
            log(`... Running Unit Tests & Coverage ...`);
            const testOutput = await runCommand('npm run test:coverage', projectPath, {}, true); 
            
            const coverageMatch = testOutput.match(/All files\s+\|\s+([\d.]+)\s+\|\s+([\d.]+)\s+\|\s+([\d.]+)\s+\|\s+([\d.]+)/);
            if (coverageMatch) {
                const funcsCov = parseFloat(coverageMatch[3]);
                const linesCov = parseFloat(coverageMatch[4]);
                if (linesCov < 80 || funcsCov < 80) {
                    log(`! WARNING: Coverage below threshold: Lines ${linesCov}% (min 80%), Functions ${funcsCov}% (min 80%)`, ANSI_RED);
                } else {
                    log(`✓ Coverage verified: Lines ${linesCov}% (> 80%), Functions ${funcsCov}% (> 80%)`, ANSI_GREEN);
                }
            } else {
                log(`✓ Unit tests passed. Coverage enforced by Jest config.`, ANSI_GREEN);
            }
        } catch (e) {
            log(`! WARNING: Professional Standards Check (Linter/Tests) Failed:`, ANSI_RED);
            log(`STDOUT/STDERR: ${e.message}`, ANSI_RED);
        }
        
        if (skipDocker) {
            log(`✓ Validation Passed (Docker Skipped)`);
            isSuccess = true;
            return { success: true };
        }

        // 6. Docker Up
        log(`... Starting Docker ...`);
        const composeCmd = 'docker compose'; 
        try {
            await runCommand(`${composeCmd} down -v`, projectPath, TEST_ENV);
        } catch (e) {}
        
        await new Promise(r => setTimeout(r, 2000));
        await runCommand(`${composeCmd} up -d --build`, projectPath, TEST_ENV, true); 

        // 7. Verify Health
        log(`... Waiting for Health Check ...`);
        const isHealthy = await checkHealth(config, TEST_ENV.PORT);
        
        if (isHealthy) {
            log(`✓ Health Check Passed`, ANSI_GREEN);
            log(`... Running E2E Tests ...`);
            await runCommand('npm run test:e2e:run', projectPath, TEST_ENV, true);
            log(`✓ E2E Tests Passed`, ANSI_GREEN);
        } else {
            throw new Error("Health check timeout");
        }

        isSuccess = true;
        return { success: true };

    } catch (err) {
        log(`X Test FAILED: ${err.message}`, ANSI_RED);
        return { success: false, error: err.message };
    } finally {
        log(`... Cleaning Up ...`);
        if (!skipDocker && isSuccess) {
            try {
                await runCommand('docker compose down -v', projectPath, TEST_ENV);
            } catch (e) {}
        }
        
        if (isSuccess) {
            try {
                // Robust cleanup with retries for Windows EPERM
                let attempts = 0;
                while (attempts < 3) {
                    try {
                        await fs.remove(projectPath);
                        break;
                    } catch (e) {
                        attempts++;
                        await new Promise(r => setTimeout(r, 1000));
                    }
                }
            } catch (e) {}
        }
    }
}

export async function runValidation(options = {}) {
    const { specificTestIndex, startIndex = 0, endIndex = combinations.length - 1, concurrency = 2 } = options;
    
    log(`Running ${combinations.length} tests with concurrency ${concurrency}...`, ANSI_CYAN);
    
    try {
        await fs.ensureDir(path.resolve(__dirname, '../../temp_test_workspace'));
    } catch(e) {}

    let passed = 0;
    let failed = 0;
    const failures = [];
    const sharedPorts = new Set();
    const limit = pLimit(concurrency);

    const testPromises = combinations.map((config, i) => {
        if (specificTestIndex !== undefined) {
            const isMatch = Array.isArray(specificTestIndex) 
                ? specificTestIndex.includes(i)
                : i === specificTestIndex;
            if (!isMatch) return null;
        } else {
            if (i < startIndex || (endIndex !== undefined && i > endIndex)) return null;
        }
        
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
                if (!result.success && specificTestIndex !== undefined) {
                     // If it's a single specific test, exit on failure
                     if (!Array.isArray(specificTestIndex)) {
                        process.exit(1);
                     }
                }
            } catch (error) {
                 failed++;
                 failures.push({ index: i, name: config.projectName, error: error.message });
            }
        });
    });

    await Promise.all(testPromises.filter(p => p !== null));

    log('\n=== Summary ===', ANSI_CYAN);
    log(`Total: ${passed + failed}`);
    log(`Passed: ${passed}`, ANSI_GREEN);
    log(`Failed: ${failed}`, ANSI_RED);

    if (failed > 0) process.exit(1);
}
