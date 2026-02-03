#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { getProjectDetails } from '../lib/prompts.js';
import { generateProject } from '../lib/generator.js';

const program = new Command();

program
    .name('nodejs-quickstart')
    .description('CLI to scaffold Node.js microservices')
    .version('1.0.0');

program
    .command('init')
    .description('Initialize a new Node.js project')
    .action(async () => {
        console.log(chalk.blue('Welcome to the Node.js Quickstart Generator!'));

        try {
            const answers = await getProjectDetails();
            console.log(chalk.green('\nConfiguration received:'));
            console.log(JSON.stringify(answers, null, 2));

            console.log(chalk.yellow('\nGeneratng project...'));
            await generateProject(answers);

            console.log(chalk.green('\n✔ Project generated successfully!'));
            console.log(chalk.cyan(`\nNext steps:\n  cd ${answers.projectName}\n  docker-compose up -d\n  npm install\n  npm start`));

        } catch (error) {
            console.error(chalk.red('Error generating project:'), error);
            process.exit(1);
        }
    });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp();
}
