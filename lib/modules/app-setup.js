import fs from 'fs-extra';
import path from 'path';
import ejs from 'ejs';

export const renderIndexFile = async (templatePath, targetDir, config) => {
    const { communication, viewEngine, database, architecture, projectName, language } = config;
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
};

export const renderDynamicComponents = async (templatePath, targetDir, config) => {
    const { architecture, language, database, caching } = config;

    // MVC Controller
    if (architecture === 'MVC') {
        const userControllerName = language === 'TypeScript' ? 'userController.ts' : 'userController.js';
        const userControllerPath = path.join(targetDir, 'src/controllers', userControllerName);
        const userControllerTemplate = path.join(templatePath, 'src/controllers', `${userControllerName}.ejs`);

        if (await fs.pathExists(userControllerTemplate)) {
            const content = ejs.render(await fs.readFile(userControllerTemplate, 'utf-8'), { database, caching });
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
             const content = ejs.render(await fs.readFile(serverTemplate, 'utf-8'), { communication: config.communication });
             await fs.writeFile(serverPath, content);
             await fs.remove(path.join(targetDir, 'src/infrastructure/webserver', `${serverName}.ejs`));
         }
    }
};

export const renderSwaggerConfig = async (targetDir, config) => {
    const { communication } = config;
    
    // Check for Swagger config template (typically in src/config/swagger.ts.ejs)
    // This path is common for both MVC and Clean Arch TS templates based on current structure
    // Check for Swagger config template (typically in src/config/swagger.ts.ejs)
    const swaggerTsTemplate = path.join(targetDir, 'src', 'config', 'swagger.ts.ejs');
    
    // Ensure config directory exists
    await fs.ensureDir(path.join(targetDir, 'src', 'config'));

    if (await fs.pathExists(swaggerTsTemplate)) {
        // Render if REST APIs
        if (communication === 'REST APIs') {
            const content = ejs.render(await fs.readFile(swaggerTsTemplate, 'utf-8'), { communication });
            await fs.writeFile(path.join(targetDir, 'src', 'config', 'swagger.ts'), content);
        }
        // Always remove the template after processing or if not needed
        await fs.remove(swaggerTsTemplate);
    }
};

export const setupViews = async (templatesDir, targetDir, config) => {
    const { architecture, viewEngine } = config;
    if (architecture === 'MVC' && viewEngine && viewEngine !== 'None') {
        const viewsSource = path.join(templatesDir, 'common', 'views', viewEngine.toLowerCase());
        if (await fs.pathExists(viewsSource)) {
             await fs.copy(viewsSource, path.join(targetDir, 'src/views'));
        }
    }
};
