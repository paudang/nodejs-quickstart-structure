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
    .description('🚀 CLI to scaffold production-ready Node.js microservices.\n\nGenerates projects with:\n- MVC or Clean Architecture\n- REST, GraphQL or Kafka\n- MySQL, PostgreSQL, or MongoDB\n- Auth (None, JWT)\n- Docker, Flyway & Mongoose support')
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
    .option('--advanced-options', 'Enable Advanced Options')
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

            console.log(chalk.green('\n✔ Project generated successfully!'));
            
            console.log(chalk.magenta('\n🚀 Project is AI-Ready!'));
            console.log(chalk.magenta('-----------------------------------------'));
            console.log(chalk.magenta('🤖 We detected you are using AI tools.'));
            console.log(chalk.magenta(`📍 Use Cursor? We've configured '.cursorrules' for you.`));
            console.log(chalk.magenta(`📍 Use ChatGPT/Gemini? Check the 'prompts/' folder for Agent Skills.`));
            console.log(chalk.magenta('-----------------------------------------'));

            let manualStartInstructions = `\n${chalk.yellow('Development:')}\n  cd ${answers.projectName}\n  npm install`;
            
            const needsInfrastructure = answers.database !== 'None' || answers.caching === 'Redis' || answers.communication === 'Kafka';
            
            if (needsInfrastructure) {
                let servicesToStart = '';
                if (answers.database === 'MongoDB') servicesToStart += ' db';
                else if (answers.database !== 'None') servicesToStart += ' db flyway';
                if (answers.caching === 'Redis') servicesToStart += ' redis';
                if (answers.communication === 'Kafka') servicesToStart += ' kafka';
                
                manualStartInstructions += `\n  docker-compose up -d${servicesToStart}  # Start infrastructure first\n  npm run dev`;
            } else {
                manualStartInstructions += `\n  npm run dev`;
            }
            
            console.log(chalk.cyan(`\nNext steps:\n  cd ${answers.projectName}\n  npm install\n  docker-compose up\n-----------------------${manualStartInstructions}\n\n${chalk.yellow('Production (PM2):')}\n  npm run build\n  npm run deploy\n  npx pm2 logs`));

            console.log(chalk.magenta('\n' + '★'.repeat(50)));
            console.log(chalk.white.bold('  Enjoying the Node.js Quickstart Generator?'));
            console.log(chalk.white(`  If this tool saved you 4+ hours of architecture setup,`));
            console.log(chalk.white(`  please help us grow by giving us a ⭐ on GitHub!`));
            console.log(chalk.white(`\n  👉 ${chalk.underline.bold('https://github.com/paudang/nodejs-quickstart-structure')}`));
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
