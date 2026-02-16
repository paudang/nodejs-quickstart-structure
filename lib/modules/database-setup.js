import fs from 'fs-extra';
import path from 'path';
import ejs from 'ejs';

export const setupDatabase = async (templatesDir, targetDir, config) => {
    const { database, dbName, language, architecture } = config;
    const langExt = language === 'TypeScript' ? 'ts' : 'js';

    // 1. Migrations
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

    } else if (database !== 'None') {
        // Flyway for SQL
        await fs.ensureDir(path.join(targetDir, 'flyway/sql'));
        const dbType = database === 'PostgreSQL' ? 'postgres' : 'mysql';
        const sourceDir = path.join(templatesDir, 'db', dbType);
        
        const files = await fs.readdir(sourceDir);
        for (const file of files) {
            if (file.endsWith('.ejs')) {
                const template = await fs.readFile(path.join(sourceDir, file), 'utf-8');
                const content = ejs.render(template, { ...config });
                const targetFileName = file.replace('.ejs', '');
                await fs.writeFile(path.join(targetDir, 'flyway/sql', targetFileName), content);
            } else {
                await fs.copy(path.join(sourceDir, file), path.join(targetDir, 'flyway/sql', file));
            }
        }
    }

    // 2. Database Config
    if (database !== 'None') {
        const dbConfigFileName = language === 'TypeScript' ? (database === 'MongoDB' ? 'mongoose.ts' : 'database.ts') : (database === 'MongoDB' ? 'mongoose.js' : 'database.js');
        const dbConfigTemplateSource = path.join(templatesDir, 'common', 'database', langExt, `${dbConfigFileName}.ejs`);
        
        let dbConfigTarget;

        if (architecture === 'MVC') {
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
            await fs.writeFile(dbConfigTarget, dbContent);
        }
    } else if (architecture === 'MVC') {
         // Even if DB is None, MVC needs src/config for other things (like swagger or general config)
         await fs.ensureDir(path.join(targetDir, 'src/config'));
    }

    // 3. Models / Entities
    await generateModels(templatesDir, targetDir, config);
};

export const generateModels = async (templatesDir, targetDir, config) => {
    const { database, language, architecture } = config;
    const langExt = language === 'TypeScript' ? 'ts' : 'js';
    const modelFileName = language === 'TypeScript' ? 'User.ts' : 'User.js';

    if (database !== 'None') {
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
            const modelTemplate = await fs.readFile(modelTemplateSource, 'utf-8');
            const modelContent = ejs.render(modelTemplate, { architecture });
            await fs.writeFile(modelTarget, modelContent);
        }
    } else {
        // Mock Models for None DB
        const mockModelContent = language === 'TypeScript' 
            ? `export interface User { id: string; name: string; email: string; }\n\nexport default class UserModel {\n  static mockData: User[] = [];\n}`
            : `class UserModel {\n  static mockData = [];\n}\n\nmodule.exports = UserModel;`;

        if (architecture === 'MVC') {
             await fs.ensureDir(path.join(targetDir, 'src/models'));
             await fs.writeFile(path.join(targetDir, 'src/models', modelFileName), mockModelContent);
        } else {
            // Clean Arch
            await fs.ensureDir(path.join(targetDir, 'src/infrastructure/database/models'));
            await fs.writeFile(path.join(targetDir, 'src/infrastructure/database/models', modelFileName), mockModelContent);
        }
    }
};
