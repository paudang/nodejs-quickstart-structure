import { generateProject } from './lib/generator.js';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

const verifyReadme = async () => {
    const config = {
        projectName: 'test_readme_app',
        architecture: 'Clean Architecture',
        database: 'PostgreSQL',
        dbName: 'readme_db',
        communication: 'REST APIs',
        language: 'TypeScript'
    };

    console.log(chalk.yellow('Generating project to verify README...'));
    await fs.remove('test_readme_app');

    try {
        await generateProject(config);

        const readmePath = 'test_readme_app/README.md';
        if (await fs.pathExists(readmePath)) {
            console.log(chalk.green('README.md generated successfully!'));
            const content = await fs.readFile(readmePath, 'utf-8');
            console.log('--- Content Preview ---');
            console.log(content.substring(0, 200) + '...');

            if (content.includes('test_readme_app') && content.includes('Clean Architecture') && content.includes('PostgreSQL')) {
                console.log(chalk.green('Content verification passed: Project Name, Arch, and DB found.'));
            } else {
                console.log(chalk.red('Content verification failed.'));
            }
        } else {
            console.log(chalk.red('README.md NOT found.'));
        }
    } catch (e) {
        console.error(e);
    } finally {
        await fs.remove('test_readme_app');
    }
};

verifyReadme();
