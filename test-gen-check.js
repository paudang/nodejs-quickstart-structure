
import { generateProject } from './lib/generator.js';
import fs from 'fs-extra';
import path from 'path';

const testDir = path.resolve(process.cwd(), 'temp_test_output');
const config1 = {
    projectName: 'test-proj-1',
    language: 'TypeScript',
    architecture: 'MVC',
    viewEngine: 'None',
    database: 'MySQL',
    dbName: 'demo',
    communication: 'Kafka'
};

const runTest = async () => {
    try {
        await fs.ensureDir(testDir);
        process.chdir(testDir);

        console.log('Generating project 1...');
        await generateProject(config1);

        const packageJson = await fs.readFile(path.join(testDir, config1.projectName, 'package.json'), 'utf-8');
        if (packageJson.includes('\n\n\n')) {
             console.error('FAIL: package.json has triple newlines');
        } else if (packageJson.includes('\n\n    "sequelize"')) {
             // Check specific gap
             console.error('FAIL: package.json has gap before sequelize');
        } else {
             console.log('PASS: package.json looks clean');
        }
        
        // Log package.json content for manual review
        console.log('--- package.json ---');
        console.log(packageJson);
        console.log('--------------------');

        // Check docker-compose
        const dockerCompose = await fs.readFile(path.join(testDir, config1.projectName, 'docker-compose.yml'), 'utf-8');
        console.log('--- docker-compose.yml ---');
        console.log(dockerCompose);
        
        // Check index.ts
        const indexTs = await fs.readFile(path.join(testDir, config1.projectName, 'src/index.ts'), 'utf-8');
        console.log('--- src/index.ts ---');
        console.log(indexTs);

        // Cleanup
        // await fs.remove(testDir); 

    } catch (err) {
        console.error(err);
    }
};

runTest();
