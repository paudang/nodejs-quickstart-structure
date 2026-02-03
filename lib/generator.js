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
    // Note: We use the .ejs source from the arch template, but we need to find it.
    // simpler: assume it's in the arch template folder as index.ts.ejs or index.js.ejs
    const indexTemplateSource = path.join(templatePath, 'src', `${indexFileName}.ejs`);

    if (await fs.pathExists(indexTemplateSource)) {
        const indexTemplate = await fs.readFile(indexTemplateSource, 'utf-8');
        const indexContent = ejs.render(indexTemplate, { communication, viewEngine });
        await fs.writeFile(indexPath, indexContent);
        // Remove the .ejs file that might have been copied over if fs.copy took everything
        await fs.remove(path.join(targetDir, 'src', `${indexFileName}.ejs`));
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
            // Clean Arch usually doesn't mix views this way, but strictly following requirements:
            // If strictly Kafka worker, remove HTTP interfaces
            await fs.remove(path.join(targetDir, 'src/interfaces/routes'));
            await fs.remove(path.join(targetDir, 'src/interfaces/controllers'));
        }
    }

    // 8. View Engine (MVC)
    if (architecture === 'MVC' && viewEngine && viewEngine !== 'None') {
        const viewSource = path.join(templatesDir, 'common', 'views', viewEngine.toLowerCase());
        await fs.copy(viewSource, path.join(targetDir, 'src', 'views'));
    }

    // 5. Copy Common Files (.gitignore, Dockerfile, etc.)
    await fs.copy(path.join(templatesDir, 'common', '_gitignore'), path.join(targetDir, '.gitignore'));
    // We might want to render Dockerfile if it depends on something, but usually standard Node Dockerfile is enough.
    await fs.copy(path.join(templatesDir, 'common', 'Dockerfile'), path.join(targetDir, 'Dockerfile'));

    if (language === 'TypeScript') {
        await fs.copy(path.join(templatesDir, 'common', 'tsconfig.json'), path.join(targetDir, 'tsconfig.json'));
    }

    // 6. Database Migrations (Flyway)
    // Create flyway/sql folder
    await fs.ensureDir(path.join(targetDir, 'flyway/sql'));
    // Copy specific migration example based on DB
    const dbType = database === 'PostgreSQL' ? 'postgres' : 'mysql';
    await fs.copy(path.join(templatesDir, 'db', dbType), path.join(targetDir, 'flyway/sql'));

    // 7. Communication Config
    // If Kafka, add standard kafka config file? 
    // For now, libraries are in package.json. User can add specific code.
};
