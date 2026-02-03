import fs from 'fs-extra';
import path from 'path';
import ejs from 'ejs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generateProject = async (config) => {
    const { projectName, architecture, database, dbName, communication, language } = config;
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

    // Copy base structure
    await fs.copy(path.join(templatesDir, archTemplate), targetDir);

    // 3. Render package.json
    const packageJsonPath = path.join(targetDir, 'package.json');
    const packageTemplate = await fs.readFile(path.join(templatesDir, 'common', 'package.json.ejs'), 'utf-8');
    const packageContent = ejs.render(packageTemplate, {
        projectName,
        database,
        communication,
        language
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
