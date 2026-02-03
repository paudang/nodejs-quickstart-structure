import fs from 'fs-extra';
import path from 'path';
import ejs from 'ejs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generateProject = async (config) => {
    const { projectName, architecture, database, dbName, communication, language, viewEngine } = config;
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
        communication
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

    // Copy Kafka files if selected
    if (communication === 'Kafka') {
        const kafkaSource = path.join(templatesDir, 'common', 'kafka', langExt);
        await fs.copy(kafkaSource, path.join(targetDir, 'src'));

        // Cleanup: Remove REST-specific folders that were copied from the base template
        // ONLY if we are NOT using a View Engine (which needs controllers)
        if (architecture === 'MVC' && (!viewEngine || viewEngine === 'None')) {
            await fs.remove(path.join(targetDir, 'src/controllers'));
            await fs.remove(path.join(targetDir, 'src/routes'));
        } else if (architecture === 'Clean Architecture') {
            await fs.remove(path.join(targetDir, 'src/interfaces/routes'));
            await fs.remove(path.join(targetDir, 'src/interfaces/controllers'));
        }
    }

    // 5. Copy Common Files (.gitignore, Dockerfile, etc.)
    await fs.copy(path.join(templatesDir, 'common', '_gitignore'), path.join(targetDir, '.gitignore'));
    await fs.copy(path.join(templatesDir, 'common', 'Dockerfile'), path.join(targetDir, 'Dockerfile'));

    if (language === 'TypeScript') {
        await fs.copy(path.join(templatesDir, 'common', 'tsconfig.json'), path.join(targetDir, 'tsconfig.json'));
    }

    // 6. Database Migrations (Flyway)
    await fs.ensureDir(path.join(targetDir, 'flyway/sql'));
    const dbType = database === 'PostgreSQL' ? 'postgres' : 'mysql';
    await fs.copy(path.join(templatesDir, 'db', dbType), path.join(targetDir, 'flyway/sql'));

    // 7. Database Config
    const dbConfigFileName = language === 'TypeScript' ? 'database.ts' : 'database.js';
    const dbConfigTemplateSource = path.join(templatesDir, 'common', 'database', langExt, `${dbConfigFileName}.ejs`);
    
    let dbConfigTarget;
    if (architecture === 'MVC') {
        await fs.ensureDir(path.join(targetDir, 'src/config'));
        dbConfigTarget = path.join(targetDir, 'src/config', dbConfigFileName);
    } else {
        // Clean Architecture
        await fs.ensureDir(path.join(targetDir, 'src/infrastructure/database'));
        dbConfigTarget = path.join(targetDir, 'src/infrastructure/database', dbConfigFileName);
    }

    if (await fs.pathExists(dbConfigTemplateSource)) {
        const dbTemplate = await fs.readFile(dbConfigTemplateSource, 'utf-8');
        const dbContent = ejs.render(dbTemplate, { database, dbName });
        await fs.writeFile(dbConfigTarget, dbContent);
    }

    // Render Models
    const modelFileName = language === 'TypeScript' ? 'User.ts' : 'User.js';
    const modelTemplateSource = path.join(templatesDir, 'common', 'database', langExt, 'models', `${modelFileName}.ejs`);
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
        const viewSource = path.join(templatesDir, 'common', 'views', viewEngine.toLowerCase());
        await fs.copy(viewSource, path.join(targetDir, 'src', 'views'));
    }
};
