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
    .description('🚀 CLI to scaffold production-ready Node.js microservices.\n\nGenerates projects with:\n- MVC or Clean Architecture\n- REST or Kafka\n- MySQL or PostgreSQL\n- Docker & Flyway support')
    .version(pkg.version, '-v, --version', 'Output the current version')
    .addHelpText('after', `
\n${chalk.yellow('Example:')}
  $ nodejs-quickstart init   ${chalk.gray('# Start the interactive setup')}
`);

program
    .command('init')
    .description('Initialize a new Node.js project')
    .option('-n, --project-name <name>', 'Project name')
    .option('-l, --language <language>', 'Language (JavaScript, TypeScript)')
    .option('-a, --architecture <architecture>', 'Architecture (MVC, Clean Architecture)')
    .option('--view-engine <view>', 'View Engine (None, EJS, Pug) - MVC only')
    .option('-d, --database <database>', 'Database (MySQL, PostgreSQL)')
    .option('--db-name <name>', 'Database name')
    .option('-c, --communication <communication>', 'Communication (REST APIs, Kafka)')
    .option('--ci-provider <provider>', 'CI/CD Provider (None, GitHub Actions, Jenkins)')
    .action(async (options) => {
        // Fix for Commander camelCase conversion
        if (options.ciProvider) {
            options.ciProvider = options.ciProvider;
        }

        console.log(chalk.blue('Welcome to the Node.js Quickstart Generator!'));

        try {
            const answers = await getProjectDetails(options);
            console.log(chalk.green('\nConfiguration received:'));
            console.log(JSON.stringify(answers, null, 2));

            console.log(chalk.yellow('\nGenerating project...'));
            await generateProject(answers);

            console.log(chalk.green('\n✔ Project generated successfully!'));
            console.log(chalk.cyan(`\nNext steps:\n  cd ${answers.projectName}\n  npm install\n  docker-compose up\n-----------------------\nStart the app manually:\n  npm install\n  npm run dev`));

        } catch (error) {
            console.error(chalk.red('Error generating project:'), error);
            process.exit(1);
        }
    });
program.parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp();
}
