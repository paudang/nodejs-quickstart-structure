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

const LANGUAGES = ['TypeScript', 'JavaScript'];
const ARCHITECTURES = ['MVC', 'Clean Architecture'];
const VIEW_ENGINES_MVC = ['None', 'EJS', 'Pug'];
const DATABASES = ['None', 'MySQL', 'PostgreSQL', 'MongoDB'];
const COMMUNICATIONS = ['REST APIs', 'GraphQL', 'Kafka'];
const CI_PROVIDERS = ['None', 'GitHub Actions', 'Jenkins', 'GitLab CI', 'CircleCI', 'Bitbucket Pipelines'];
const AUTH_MODES = ['None', 'JWT'];
const SOCIAL_AUTH_MODES = ['None', 'Google,GitHub'];
const TERRAFORM_TIERS = ['None', 'Standard', 'Production'];
const CLOUD_PROVIDERS = ['AWS', 'GCP', 'Azure'];
const API_GATEWAYS = ['None', 'Nginx', 'Kong (DB-less)'];

const combinations = [];

// Base Generation Matrix
LANGUAGES.forEach(lang => {
    ARCHITECTURES.forEach(arch => {
        const viewEngines = arch === 'MVC' ? VIEW_ENGINES_MVC : ['None'];
        viewEngines.forEach(view => {
            DATABASES.forEach(db => {
                const cachingOptions = db !== 'None' ? ['None', 'Redis', 'Memory Cache'] : ['None'];
                cachingOptions.forEach(cache => {
                    COMMUNICATIONS.forEach(comm => {
                        CI_PROVIDERS.forEach(ci => {
                            const securityOptions = ci !== 'None' ? [true, false] : [false];
                            securityOptions.forEach(sec => {
                                AUTH_MODES.forEach(auth => {
                                    const socialAuthOptions = auth === 'JWT' ? SOCIAL_AUTH_MODES : ['None'];
                                    socialAuthOptions.forEach(socialAuth => {
                                        TERRAFORM_TIERS.forEach(tf => {
                                            const cloudOptions = tf !== 'None' ? CLOUD_PROVIDERS : ['AWS'];
                                            cloudOptions.forEach(cloud => {
                                                const apiGatewaysOptions = comm !== 'Kafka' ? API_GATEWAYS : ['None'];
                                                apiGatewaysOptions.forEach(gateway => {
                                                    combinations.push({
                                                        projectName: `t190080_${Math.random().toString(36).substring(2, 8)}`,
                                                        language: lang,
                                                        architecture: arch,
                                                        viewEngine: view,
                                                        database: db,
                                                        dbName: db !== 'None' ? 'testdb' : undefined,
                                                        communication: comm,
                                                        apiGateway: gateway,
                                                        useApiGateway: gateway !== 'None' ? 'Yes' : 'No',
                                                        caching: cache,
                                                        ciProvider: ci,
                                                        includeSecurity: sec,
                                                        auth: auth,
                                                        socialAuth: socialAuth,
                                                        advancedOptions: auth !== 'None' || tf !== 'None' || gateway !== 'None',
                                                        terraform: tf,
                                                        cloudProvider: cloud
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});

async function runCommand(command, cwd) {
    return new Promise((resolve, reject) => {
        // Using inherit to let users see error stack traces if one of the 5280 fails to compile
        const child = spawn(command, {
            cwd,
            stdio: 'inherit',
            shell: true
        });

        child.on('error', reject);
        child.on('close', (code) => {
            if (code === 0) resolve();
            else reject(new Error(`Exit code ${code}`));
        });
    });
}

function pLimit(concurrency) {
    const queue = [];
    let active = 0;
    const next = () => {
        active--;
        if (queue.length > 0) queue.shift()();
    };
    return (fn) => new Promise((resolve, reject) => {
        const run = async () => {
            active++;
            try { resolve(await fn()); } catch (err) { reject(err); } finally { next(); }
        };
        if (active < concurrency) run();
        else queue.push(run);
    });
}

async function runTest(config, index) {
    const testDir = path.resolve(__dirname, '../temp_command_workspace');
    const projectPath = path.join(testDir, config.projectName);

    try {
        await fs.ensureDir(testDir);

        const cliPath = path.resolve(__dirname, '../bin/index.js');
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

        if (config.ciProvider !== 'None') {
            if (config.includeSecurity) args.push('--include-security');
            else args.push('--no-include-security');
        }

        if (config.apiGateway !== 'None') {
            args.push('--use-api-gateway', 'Yes', '--api-gateway', `"${config.apiGateway}"`);
        } else {
            args.push('--use-api-gateway', 'No');
        }

        args.push('--caching', `"${config.caching}"`);

        if (config.auth) {
            args.push('--auth', config.auth);
        }

        if (config.socialAuth && config.socialAuth !== 'None') {
            args.push('--social-auth', config.socialAuth);
        }

        if (config.advancedOptions) {
            args.push('--advanced-options');
        } else {
            args.push('--no-advanced-options');
        }

        args.push('--no-with-elk');

        if (index % 5 === 0) { // Test background jobs in 20% of combinations to save time
            args.push('--background-jobs');
            const cachingIdx = args.indexOf('--caching');
            if (cachingIdx > -1) {
                args[cachingIdx + 1] = '"Redis"';
            }
        } else {
            args.push('--no-background-jobs');
        }

        if (config.architecture === 'MVC') {
            args.push('--view-engine', config.viewEngine);
        }

        if (config.terraform) {
            args.push('--terraform', config.terraform);
        }

        if (config.cloudProvider && config.terraform !== 'None') {
            args.push('--cloud-provider', config.cloudProvider);
        }

        args.push('--resilience', 'None');

        const command = `node ${cliPath} ${args.join(' ')}`;
        await runCommand(command, testDir);

        return { success: true };
    } catch (err) {
        return { success: false, error: err.message, cmd: config };
    } finally {
        try { await fs.remove(projectPath); } catch (e) { }
    }
}

async function start() {
    console.log(`${ANSI_CYAN}>>> Preparing Exhaustive Matrix Verification for ${combinations.length} combinations...${ANSI_RESET}`);
    await fs.remove(path.resolve(__dirname, '../temp_command_workspace'));

    // 50 concurrency for generating IO file chunks locally without dragging the system down.
    const concurrency = parseInt(process.argv[2] || "5");
    const limit = pLimit(concurrency);

    let passed = 0;
    let failed = 0;
    const failures = [];

    const startTime = Date.now();

    const testPromises = combinations.map((config, i) => {
        return limit(async () => {
            const result = await runTest(config, i);
            if (result.success) {
                passed++;
                if (passed % 100 === 0) {
                    console.log(`[${passed}/${combinations.length}] Scaffold combinations generated successfully...`);
                }
            } else {
                failed++;
                failures.push(result);
                console.log(`${ANSI_RED}X Failed template compilation ${i}: ${JSON.stringify(config)} - ${result.error}${ANSI_RESET}`);
            }
        });
    });

    await Promise.all(testPromises);

    const timeTaken = ((Date.now() - startTime) / 1000).toFixed(1);

    console.log(`\n${ANSI_CYAN}=== Validation Summary ===${ANSI_RESET}`);
    console.log(`Execution Time: ${timeTaken}s`);
    console.log(`Total Variants Tested: ${passed + failed}`);
    console.log(`${ANSI_GREEN}Passed (Zero Templates Errors): ${passed}${ANSI_RESET}`);

    if (failed > 0) {
        console.log(`${ANSI_RED}Failed Template Triggers: ${failed}${ANSI_RESET}`);
        fs.writeFileSync('failures.log', JSON.stringify(failures, null, 2));
        console.log(`${ANSI_RED}Check failures.log for EJS rendering traces.${ANSI_RESET}`);
        process.exit(1);
    } else {
        console.log(`${ANSI_GREEN}✓ SUCCESS! All ${combinations.length} UI-mapped combinations cleanly render templates!${ANSI_RESET}`);
    }

    await fs.remove(path.resolve(__dirname, '../temp_command_workspace'));
}

start();
