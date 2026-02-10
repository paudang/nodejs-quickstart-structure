import { generateProject } from '../lib/generator.js';
import path from 'path';
import fs from 'fs-extra';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const run = async () => {
    const testDir = path.join(process.cwd(), 'temp_test_workspace');
    await fs.ensureDir(testDir);

    const configs = [
        {
            projectName: 'test-mvc-none-js',
            architecture: 'MVC',
            language: 'JavaScript',
            database: 'None',
            dbName: 'demo', // Should be ignored
            communication: 'REST APIs',
            viewEngine: 'None',
            ciProvider: 'None'
        },
        {
             projectName: 'test-clean-none-ts',
             architecture: 'Clean Architecture',
             language: 'TypeScript',
             database: 'None',
             dbName: 'demo',
             communication: 'REST APIs',
             ciProvider: 'None'
        },
        {
             projectName: 'test-mvc-none-ts',
             architecture: 'MVC',
             language: 'TypeScript',
             database: 'None',
             dbName: 'demo',
             communication: 'Kafka',
             viewEngine: 'None',
             ciProvider: 'None'
        },
         {
             projectName: 'test-clean-none-js',
             architecture: 'Clean Architecture',
             language: 'JavaScript',
             database: 'None',
             dbName: 'demo',
             communication: 'Kafka',
             ciProvider: 'None'
        }
    ];

    for (const config of configs) {
        console.log(`Generating ${config.projectName}...`);
        const targetPath = path.join(testDir, config.projectName);
        
        if (await fs.pathExists(targetPath)) {
            await fs.remove(targetPath);
        }

        // Change CWD to testDir so generator creates project there
        const originalCwd = process.cwd();
        try {
            process.chdir(testDir);
            await generateProject(config);
            console.log(`✅ Successfully generated ${config.projectName}`);
            
            // Basic Content Checks
            
            // 1. Check docker-compose
            const dockerContent = await fs.readFile(path.join(targetPath, 'docker-compose.yml'), 'utf-8');
            if (dockerContent.includes('image: mysql') || dockerContent.includes('image: mongo') || dockerContent.includes('image: postgres')) {
                console.error(`❌ ${config.projectName}: docker-compose.yml should NOT include database services`);
            } else {
                 console.log(`   Docker compose check passed`);
            }

            // 2. Check Database Config
            const dbConfigPath = config.architecture === 'MVC' 
                ? path.join(targetPath, 'src/config') 
                : path.join(targetPath, 'src/infrastructure/database');
            
            // Check if any db file exists
            if (await fs.pathExists(path.join(dbConfigPath, 'database.ts')) || 
                await fs.pathExists(path.join(dbConfigPath, 'database.js')) || 
                await fs.pathExists(path.join(dbConfigPath, 'mongoose.ts')) || 
                await fs.pathExists(path.join(dbConfigPath, 'mongoose.js'))) {
                 console.error(`❌ ${config.projectName}: Database config file FOUND (should not exist)`);
            } else {
                 console.log(`   Database config check passed`);
            }
            
            // 3. Check Index content (sanity check for syntax errors helper)
            // We can't easily check syntax but we can check if it contains expected strings
            const indexFile = config.language === 'TypeScript' ? 'src/index.ts' : (config.architecture === 'Clean Architecture' ? 'src/index.js' : 'src/index.js');
            const indexContent = await fs.readFile(path.join(targetPath, indexFile), 'utf-8');
            
            if (indexContent.includes('sequelize.sync') || indexContent.includes('connectDB()')) {
                 console.error(`❌ ${config.projectName}: index file contains DB sync logic!`);
            } else {
                 console.log(`   Index DB sync check passed`);
            }

            // 4. Check Swagger Cleanup (for non-REST)
            if (config.communication !== 'REST APIs') {
                const swaggerTs = path.join(targetPath, 'src/config/swagger.ts');
                const swaggerEjs = path.join(targetPath, 'src/config/swagger.ts.ejs');
                if (await fs.pathExists(swaggerTs) || await fs.pathExists(swaggerEjs)) {
                    console.error(`❌ ${config.projectName}: Swagger file FOUND (should be removed for non-REST)`);
                } else {
                    console.log(`   Swagger cleanup check passed`);
                }
            }

        } catch (e) {
            console.error(`❌ Failed to generate ${config.projectName}`, e);
        } finally {
            process.chdir(originalCwd);
        }
    }
};

run();
