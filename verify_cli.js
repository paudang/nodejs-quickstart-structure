import { generateProject } from './lib/generator.js';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

const testGen = async () => {
    const config = {
        projectName: 'test_output_app',
        architecture: 'Clean Architecture',
        database: 'PostgreSQL',
        dbName: 'my_test_db',
        communication: 'Kafka',
        language: 'TypeScript'
    };

    console.log(chalk.yellow('Starting test generation...'));

    // Clean up previous test
    await fs.remove(path.resolve('test_output_app'));

    try {
        await generateProject(config);
        console.log(chalk.green('Generation completed!'));

        // simple verification
        if (await fs.pathExists('test_output_app/package.json')) console.log('package.json exists');
        if (await fs.pathExists('test_output_app/docker-compose.yml')) console.log('docker-compose.yml exists');
        if (await fs.pathExists('test_output_app/src/usecases/createUser.js')) console.log('usecases exist');

    } catch (e) {
        console.error(e);
    }
};

testGen();
