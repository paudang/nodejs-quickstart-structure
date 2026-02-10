import fs from 'fs-extra';
import path from 'path';
import ejs from 'ejs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generateProject = async (config) => {
    const { projectName, architecture, database, dbName, communication, language, viewEngine, ciProvider } = config;
    const targetDir = path.resolve(process.cwd(), projectName);
    const templatesDir = path.join(__dirname, '../templates');

    // 1. Create project directory
    if (await fs.pathExists(targetDir)) {
        throw new Error(`Directory ${projectName} already exists.`);
    }
    await fs.ensureDir(targetDir);

    // 2. Select Structure Template
    const structureMap = {
        'MVC': 'mvc',
        'Clean Architecture': 'clean-architecture'
    };
    const archTemplate = structureMap[architecture];
    const langExt = language === 'TypeScript' ? 'ts' : 'js';
    const templatePath = path.join(templatesDir, archTemplate, langExt);

    // Copy base structure
    await fs.copy(templatePath, targetDir);

    // 3. Render package.json
    const packageJsonPath = path.join(targetDir, 'package.json');
    const packageTemplate = await fs.readFile(path.join(templatesDir, 'common', 'package.json.ejs'), 'utf-8');
    const packageContent = ejs.render(packageTemplate, {
        projectName,
        database,
        communication,
        language,
        viewEngine
    });
    await fs.writeFile(packageJsonPath, packageContent);

    // 4. Render docker-compose.yml
    const dockerComposePath = path.join(targetDir, 'docker-compose.yml');
    const dockerTemplate = await fs.readFile(path.join(templatesDir, 'common', 'docker-compose.yml.ejs'), 'utf-8');
    const dockerContent = ejs.render(dockerTemplate, {
        projectName,
        database,
        dbName,
        communication
    });
    await fs.writeFile(dockerComposePath, dockerContent);

    // Render README.md
    const readmePath = path.join(targetDir, 'README.md');
    const readmeTemplate = await fs.readFile(path.join(templatesDir, 'common', 'README.md.ejs'), 'utf-8');
    const readmeContent = ejs.render(readmeTemplate, {
        projectName,
        architecture,
        database,
        communication,
        language,
        ciProvider
    });
    await fs.writeFile(readmePath, readmeContent);

    // Render index file (ts/js)
    const indexFileName = language === 'TypeScript' ? 'index.ts' : 'index.js';
    const indexPath = path.join(targetDir, 'src', indexFileName);
    const indexTemplateSource = path.join(templatePath, 'src', `${indexFileName}.ejs`);
    
    if (await fs.pathExists(indexTemplateSource)) {
        const indexTemplate = await fs.readFile(indexTemplateSource, 'utf-8');
        const indexContent = ejs.render(indexTemplate, { 
            communication, 
            viewEngine,
            database,
            architecture,
            projectName
        });
        await fs.writeFile(indexPath, indexContent);
        await fs.remove(path.join(targetDir, 'src', `${indexFileName}.ejs`));
    }

    // Render Dynamic Controllers/Repositories (User) because they depend on DB type
    // MVC Controller
    if (architecture === 'MVC') {
        const userControllerName = language === 'TypeScript' ? 'userController.ts' : 'userController.js';
        const userControllerPath = path.join(targetDir, 'src/controllers', userControllerName);
        const userControllerTemplate = path.join(templatePath, 'src/controllers', `${userControllerName}.ejs`);

        if (await fs.pathExists(userControllerTemplate)) {
            const content = ejs.render(await fs.readFile(userControllerTemplate, 'utf-8'), { database });
            await fs.writeFile(userControllerPath, content);
            await fs.remove(path.join(targetDir, 'src/controllers', `${userControllerName}.ejs`));
        }
    } 
    // Clean Architecture Repo
    else if (architecture === 'Clean Architecture') {
        const repoName = language === 'TypeScript' ? 'UserRepository.ts' : 'UserRepository.js';
        const repoPath = path.join(targetDir, 'src/infrastructure/repositories', repoName); 
        const repoTemplate = path.join(templatePath, 'src/infrastructure/repositories', `${repoName}.ejs`);

        if (await fs.pathExists(repoTemplate)) {
            const content = ejs.render(await fs.readFile(repoTemplate, 'utf-8'), { database });
            await fs.writeFile(repoPath, content);
            await fs.remove(path.join(targetDir, 'src/infrastructure/repositories', `${repoName}.ejs`));
        }
    }
    // Render Server (Clean Arch JS only)
    if (architecture === 'Clean Architecture' && language === 'JavaScript') {
         const serverName = 'server.js';
         const serverPath = path.join(targetDir, 'src/infrastructure/webserver', serverName);
         const serverTemplate = path.join(templatePath, 'src/infrastructure/webserver', `${serverName}.ejs`);
         
         if (await fs.pathExists(serverTemplate)) {
             const content = ejs.render(await fs.readFile(serverTemplate, 'utf-8'), { communication });
             await fs.writeFile(serverPath, content);
             await fs.remove(path.join(targetDir, 'src/infrastructure/webserver', `${serverName}.ejs`));
         }
    }

    // Copy Kafka files if selected
    if (communication === 'Kafka') {
        const kafkaSource = path.join(templatesDir, 'common', 'kafka', langExt);
        await fs.copy(kafkaSource, path.join(targetDir, 'src'));

        // Render Kafka Service with dynamic logger path
        const kafkaServiceFileName = `kafkaService.${langExt}`;
        const kafkaServiceTemplate = path.join(targetDir, 'src', 'services', `${kafkaServiceFileName}.ejs`);
        
        if (await fs.pathExists(kafkaServiceTemplate)) {
            let loggerPath = architecture === 'Clean Architecture' ? '../log/logger' : '../utils/logger';
            let configPath = '../config/kafka';

            if (language === 'TypeScript') {
                loggerPath = architecture === 'Clean Architecture' ? '@/infrastructure/log/logger' : '@/utils/logger';
                configPath = architecture === 'Clean Architecture' ? '@/infrastructure/config/kafka' : '@/config/kafka';
            }
            
            const content = ejs.render(await fs.readFile(kafkaServiceTemplate, 'utf-8'), { loggerPath, configPath });
            await fs.writeFile(path.join(targetDir, 'src', 'services', kafkaServiceFileName), content);
            await fs.remove(kafkaServiceTemplate);
        }

        if (architecture === 'Clean Architecture') {
            // Clean Architecture Restructuring
            await fs.ensureDir(path.join(targetDir, 'src/infrastructure/messaging'));
            await fs.ensureDir(path.join(targetDir, 'src/infrastructure/config'));

            const serviceExt = language === 'TypeScript' ? 'ts' : 'js';
            
            // Move Service to Infrastructure/Messaging
            await fs.move(
                path.join(targetDir, `src/services/kafkaService.${serviceExt}`), 
                path.join(targetDir, `src/infrastructure/messaging/kafkaClient.${serviceExt}`),
                { overwrite: true }
            );

            // Move Config to Infrastructure/Config
            await fs.move(
                path.join(targetDir, `src/config/kafka.${serviceExt}`),
                path.join(targetDir, `src/infrastructure/config/kafka.${serviceExt}`),
                { overwrite: true }
            );

            // Cleanup old folders
            await fs.remove(path.join(targetDir, 'src/services'));
            // Only remove src/config if empty? But src/config came from kafka copy.
            // However, other parts might use src/config?
            // In Clean Arch, config is usually in infrastructure? 
            // Only Kafka adds src/config. Base template doesn't have src/config for Clean Arch (it uses src/infrastructure/database).
            await fs.remove(path.join(targetDir, 'src/config'));

            // Remove REST-specific folders (Interfaces)
            await fs.remove(path.join(targetDir, 'src/interfaces/routes'));
            await fs.remove(path.join(targetDir, 'src/interfaces/controllers'));
        } else if (architecture === 'MVC' && (!viewEngine || viewEngine === 'None')) {
            // MVC Cleanup
            await fs.remove(path.join(targetDir, 'src/controllers'));
            await fs.remove(path.join(targetDir, 'src/routes'));
        }
    }

    // 5. Copy Common Files (.gitignore, Dockerfile, etc.)
    await fs.copy(path.join(templatesDir, 'common', '_gitignore'), path.join(targetDir, '.gitignore'));
    await fs.copy(path.join(templatesDir, 'common', '.dockerignore'), path.join(targetDir, '.dockerignore'));
    // await fs.copy(path.join(templatesDir, 'common', 'Dockerfile'), path.join(targetDir, 'Dockerfile'));
    const dockerfileTemplate = await fs.readFile(path.join(templatesDir, 'common', 'Dockerfile'), 'utf-8');
    const dockerfileContent = ejs.render(dockerfileTemplate, { 
        language,
        viewEngine
    });
    await fs.writeFile(path.join(targetDir, 'Dockerfile'), dockerfileContent);

    if (language === 'TypeScript') {
        await fs.copy(path.join(templatesDir, 'common', 'tsconfig.json'), path.join(targetDir, 'tsconfig.json'));
    }

    // 6. Database Migrations
    if (database === 'MongoDB') {
        // Copy migrate-mongo config
        const migrateConfigTemplate = await fs.readFile(path.join(templatesDir, 'common', 'migrate-mongo-config.js.ejs'), 'utf-8');
        const migrateConfigContent = ejs.render(migrateConfigTemplate, { dbName });
        await fs.writeFile(path.join(targetDir, 'migrate-mongo-config.js'), migrateConfigContent);

        // Setup migrations directory
        await fs.ensureDir(path.join(targetDir, 'migrations'));
        
        // Create initial migration file with timestamp
        const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, '').slice(0, 14); // YYYYMMDDHHMMSS
        const migrationTemplate = await fs.readFile(path.join(templatesDir, 'common', 'migrations', 'init.js.ejs'), 'utf-8');
        await fs.writeFile(path.join(targetDir, 'migrations', `${timestamp}-initial-setup.js`), migrationTemplate);

    } else {
        // Flyway for SQL
        await fs.ensureDir(path.join(targetDir, 'flyway/sql'));
        const dbType = database === 'PostgreSQL' ? 'postgres' : 'mysql';
        await fs.copy(path.join(templatesDir, 'db', dbType), path.join(targetDir, 'flyway/sql'));
    }

    // 7. Database Config
    const dbConfigFileName = language === 'TypeScript' ? (database === 'MongoDB' ? 'mongoose.ts' : 'database.ts') : (database === 'MongoDB' ? 'mongoose.js' : 'database.js');
    const dbConfigTemplateSource = database === 'MongoDB'
        ? path.join(templatesDir, 'common', 'database', langExt, `${dbConfigFileName}.ejs`)
        : path.join(templatesDir, 'common', 'database', langExt, `${dbConfigFileName}.ejs`);
    
    let dbConfigTarget;


    // Copy configurations
    if (architecture === 'MVC') {
        // Copy Views
        if (viewEngine && viewEngine !== 'None') {
            await fs.copy(path.join(templatesDir, 'common', 'views', viewEngine.toLowerCase()), path.join(targetDir, 'src/views'));
        }
        await fs.ensureDir(path.join(targetDir, 'src/config'));
        dbConfigTarget = path.join(targetDir, 'src/config', database === 'MongoDB' ? (language === 'TypeScript' ? 'database.ts' : 'database.js') : dbConfigFileName);
    } else {
        // Clean Architecture
        await fs.ensureDir(path.join(targetDir, 'src/infrastructure/database'));
        dbConfigTarget = path.join(targetDir, 'src/infrastructure/database', language === 'TypeScript' ? 'database.ts' : 'database.js');
    }

    if (await fs.pathExists(dbConfigTemplateSource)) {
        const dbTemplate = await fs.readFile(dbConfigTemplateSource, 'utf-8');
        const dbContent = ejs.render(dbTemplate, { database, dbName, architecture });
        // Ensure consistent naming for imports in other files
        // For MVC, we might want to rename mongoose.js to database.js to minimize refactoring in index.js?
        // Actually, let's keep it consistent. If MVC, we typically call it 'database.js' in require. 
        // So we should save it as 'database.js' even if source is mongoose.js.ejs
        await fs.writeFile(dbConfigTarget, dbContent);
    }

    // Render Models
    const modelFileName = language === 'TypeScript' ? 'User.ts' : 'User.js';
    const sourceModelName = database === 'MongoDB' ? `${modelFileName}.mongoose.ejs` : `${modelFileName}.ejs`;
    const modelTemplateSource = path.join(templatesDir, 'common', 'database', langExt, 'models', sourceModelName);
    let modelTarget;

    if (architecture === 'MVC') {
        await fs.ensureDir(path.join(targetDir, 'src/models'));
        modelTarget = path.join(targetDir, 'src/models', modelFileName);
    } else {
        await fs.ensureDir(path.join(targetDir, 'src/infrastructure/database/models'));
        modelTarget = path.join(targetDir, 'src/infrastructure/database/models', modelFileName);
    }

    if (await fs.pathExists(modelTemplateSource)) {
        // Models need architecture to decide import path
        const modelTemplate = await fs.readFile(modelTemplateSource, 'utf-8');
        const modelContent = ejs.render(modelTemplate, { architecture });
        await fs.writeFile(modelTarget, modelContent);
    }

    // 8. View Engine (MVC)
    if (architecture === 'MVC' && viewEngine && viewEngine !== 'None') {
        const publicDir = path.join(templatesDir, 'common', 'public');
        if (await fs.pathExists(publicDir)) {
            await fs.copy(publicDir, path.join(targetDir, 'public'));
        }
    }

    // 9. Render Swagger Config (if .ejs exists)
    // MVC TS
    const swaggerMvcTs = path.join(targetDir, 'src', 'config', 'swagger.ts.ejs');
    if (await fs.pathExists(swaggerMvcTs)) {
        if (communication === 'REST APIs') {
            const content = ejs.render(await fs.readFile(swaggerMvcTs, 'utf-8'), { communication });
            await fs.writeFile(path.join(targetDir, 'src', 'config', 'swagger.ts'), content);
        }
        await fs.remove(swaggerMvcTs);
    }
    // Clean Architecture TS
    const swaggerCleanTs = path.join(targetDir, 'src', 'config', 'swagger.ts.ejs');
    // Note: In Clean Arch, it might be in src/infrastructure/webserver or src/config depending on refactor.
    // Based on previous moves, we saw it in src/config for TS.
    if (await fs.pathExists(swaggerCleanTs)) {
        if (communication === 'REST APIs') {
            const content = ejs.render(await fs.readFile(swaggerCleanTs, 'utf-8'), { communication });
            await fs.writeFile(path.join(targetDir, 'src', 'config', 'swagger.ts'), content);
        }
        await fs.remove(swaggerCleanTs);
    }

    // 10. Copy Professional Config Files (Eslint, Prettier, Husky)
    const eslintTemplate = await fs.readFile(path.join(templatesDir, 'common', '.eslintrc.json.ejs'), 'utf-8');
    const eslintContent = ejs.render(eslintTemplate, { language });
    await fs.writeFile(path.join(targetDir, '.eslintrc.json'), eslintContent);

    await fs.copy(path.join(templatesDir, 'common', '.prettierrc'), path.join(targetDir, '.prettierrc'));
    await fs.copy(path.join(templatesDir, 'common', '.lintstagedrc'), path.join(targetDir, '.lintstagedrc'));

    // 10. Copy Test Config & Samples
    const jestTemplate = await fs.readFile(path.join(templatesDir, 'common', 'jest.config.js.ejs'), 'utf-8');
    const jestContent = ejs.render(jestTemplate, { language });
    await fs.writeFile(path.join(targetDir, 'jest.config.js'), jestContent);

    // Create tests directory
    await fs.ensureDir(path.join(targetDir, 'tests'));
    const healthTestTemplate = await fs.readFile(path.join(templatesDir, 'common', 'tests', 'health.test.ts.ejs'), 'utf-8');
    // For now, the sample test is simple and doesn't explicitly depend on projectName, but we render it just in case we add more dynamic content later
    const healthTestContent = ejs.render(healthTestTemplate, { language }); 
    const testFileName = language === 'TypeScript' ? 'health.test.ts' : 'health.test.js';
    await fs.writeFile(path.join(targetDir, 'tests', testFileName), healthTestContent);

    // 11. Copy CI/CD Config (Optional)
    // 11. Copy CI/CD Config
    if (ciProvider === 'GitHub Actions') {
        await fs.ensureDir(path.join(targetDir, '.github/workflows'));
        await fs.copy(path.join(templatesDir, 'common', '_github/workflows/ci.yml'), path.join(targetDir, '.github/workflows/ci.yml'));
    } else if (ciProvider === 'Jenkins') {
        const jenkinsTemplate = await fs.readFile(path.join(templatesDir, 'common', 'Jenkinsfile.ejs'), 'utf-8');
        const jenkinsContent = ejs.render(jenkinsTemplate, {
             projectName
        });
        await fs.writeFile(path.join(targetDir, 'Jenkinsfile'), jenkinsContent);
    }

    console.log(`
      ====================================================
             Node.js Project Created Successfully!
      ====================================================

      Project: ${projectName}
      Architecture: ${architecture}
      Language: ${language}
      Database: ${database}
      Communication: ${communication}

      ----------------------------------------------------
      ✨  High-Quality Standards Applied:
      ----------------------------------------------------
      ✅  Linting & Formatting: Eslint + Prettier configured
      ✅  Git Hooks: Husky + Lint-Staged ready
      ✅  Security: Helmet, CORS, Rate-Limiting added
      ✅  Testing: Jest setup for Unit/Integration tests
      ✅  Docker: Production-ready multi-stage build
      ${ciProvider !== 'None' ? `✅  CI/CD: ${ciProvider} Workflow ready` : '❌  CI/CD: Skipped (User preferred)'}

      ----------------------------------------------------
      👉  Next Steps:
      ----------------------------------------------------
      1. cd ${projectName}
      2. git init
      3. npm install
      4. npm run prepare      (To setup Husky hooks)
      5. docker-compose up -d (To start DB/Infrastructure)
      6. npm run dev          (To start development server)
      7. npm test             (To run tests)
    `);
};
