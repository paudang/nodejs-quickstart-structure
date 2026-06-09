#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { getProjectDetails } from '../lib/prompts.js';
import { generateProject } from '../lib/generator.js';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(readFileSync(join(__dirname, '../package.json'), 'utf-8'));

const program = new Command();

program
    .name('nodejs-quickstart')
    .description('🚀 CLI to scaffold production-ready Node.js microservices.\n\nGenerates projects with:\n- MVC or Clean Architecture\n- REST, GraphQL or Kafka\n- MySQL, PostgreSQL, or MongoDB\n- Auth (None, JWT)\n- Terraform (Standard, Production)\n- Docker, Flyway & Mongoose support')
    .version(pkg.version, '-v, --version', 'Output the current version')
    .addHelpText('after', `\n${chalk.yellow('Example:')}\n  $ nodejs-quickstart init   ${chalk.gray('# Start the interactive setup')}\n`);

program
    .command('init')
    .description('Initialize a new Node.js project')
    .option('-n, --project-name <name>', 'Project name')
    .option('-l, --language <language>', 'Language (JavaScript, TypeScript)')
    .option('-a, --architecture <architecture>', 'Architecture (MVC, Clean Architecture)')
    .option('--view-engine <view>', 'View Engine (None, EJS, Pug) - MVC only')
    .option('-d, --database <database>', 'Database (MySQL, PostgreSQL)')
    .option('--db-name <name>', 'Database name')
    .option('-c, --communication <communication>', 'Communication (REST APIs, GraphQL, Kafka)')
    .option('--ci-provider <provider>', 'CI/CD Provider (None, GitHub Actions, Jenkins, GitLab CI, Bitbucket Pipelines, CircleCI)')
    .option('--include-security', 'Include Enterprise Security Hardening')
    .option('--no-include-security', 'Exclude Enterprise Security Hardening')
    .option('--caching <type>', 'Caching Layer (None/Redis/Memory Cache)')
    .option('--auth <modes...>', 'Authentication Modes (None, JWT)')
    .option('--social-auth <providers...>', 'Social Authentication Providers (None, Google, GitHub)')
    .option('--terraform <tier>', 'Infrastructure Tier (None, Standard, Production)')
    .option('--cloud-provider <provider>', 'Cloud Provider for Terraform (AWS, GCP, Azure)')
    .option('--resilience <features...>', 'Application Resilience Features (Timeout, Retry, CircuitBreaker)')
    .option('--with-elk', 'Integrate ELK Stack for Centralized Logging')
    .option('--no-with-elk', 'Disable ELK Stack')
    .option('--background-jobs', 'Enable Background Jobs (BullMQ + Bull-Board)')
    .option('--no-background-jobs', 'Disable Background Jobs')
    .option('--advanced-options', 'Enable Advanced Options')
    .option('--no-advanced-options', 'Disable Advanced Options')
    .action(async (options) => {
        // Fix for Commander camelCase conversion
        if (options.ciProvider) {
            options.ciProvider = options.ciProvider;
        }

        console.log(chalk.blue('Welcome to the Node.js Quickstart Generator!'));

        try {
            const answers = await getProjectDetails(options);
            console.log(chalk.blue(`\n🚀 Preparing to generate ${chalk.bold(answers.projectName)} (${answers.architecture})...`));
            
            console.log(chalk.yellow('\nGenerating project files...'));
            await generateProject(answers);
            const userAgent = process.env.npm_config_user_agent || '';
            let pm = 'npm';
            if (userAgent.startsWith('pnpm')) pm = 'pnpm';
            else if (userAgent.startsWith('yarn')) pm = 'yarn';
            
            const cmdRun = pm === 'npm' ? 'npm run' : pm;

            console.log(chalk.green('\n✔ Project generated successfully!'));

            let manualStartInstructions = `\n${chalk.yellow('Development:')}\n  cd ${answers.projectName}\n  ${pm} install`;
            
            const needsInfrastructure = answers.database !== 'None' || answers.caching === 'Redis' || answers.communication === 'Kafka';
            
            if (needsInfrastructure || answers.withELK) {
                let servicesToStart = '';
                if (answers.database === 'MongoDB') servicesToStart += ' db';
                else if (answers.database !== 'None') servicesToStart += ' db flyway';
                if (answers.caching === 'Redis') servicesToStart += ' redis';
                if (answers.communication === 'Kafka') servicesToStart += ' kafka';
                
                if (needsInfrastructure) {
                    manualStartInstructions += `\n  docker-compose up -d${servicesToStart}  # Start infrastructure first`;
                }
                if (answers.withELK) {
                    manualStartInstructions += `\n  docker-compose -f docker-compose.elk.yml up -d  # Start ELK Stack`;
                }
                manualStartInstructions += `\n  ${cmdRun} dev`;
            } else {
                manualStartInstructions += `\n  ${cmdRun} dev`;
            }
            
            let execCmd = pm === 'npm' ? 'npx' : pm;

            console.log(chalk.cyan(`\nNext steps:\n-----------------------${manualStartInstructions}\n\n${chalk.yellow('Production (PM2):')}\n  ${cmdRun} build\n  ${cmdRun} deploy\n  ${execCmd} pm2 logs`));
            console.log(chalk.magenta('\n' + '★'.repeat(50)));
            console.log(chalk.white.bold('  Enjoying the Node.js Quickstart Generator?'));
            console.log(chalk.white(`  If this tool saved you 4+ hours of architecture setup,`));
            console.log(chalk.white(`  please help us grow by giving us a ⭐ on GitHub!`));
            console.log(chalk.white(`\n  👉 ${chalk.underline.bold('https://github.com/paudang/nodejs-quickstart-structure')}`));
            console.log(chalk.white(`\n  💡 If this saved you time, consider buying me a coffee:`));
            console.log(chalk.white(`  ☕ ${chalk.underline.bold('https://ko-fi.com/paudang')}`));
            console.log(chalk.magenta('★'.repeat(50) + '\n'));

        } catch (error) {
            if (error.name === 'ExitPromptError') {
                console.log(chalk.yellow('\n\n👋 Goodbye! Setup cancelled.'));
                process.exit(0);
            }
            console.error(chalk.red('Error generating project:'), error);
            process.exit(1);
        }
    });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp();
}
