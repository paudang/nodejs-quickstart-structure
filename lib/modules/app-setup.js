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
            const content = ejs.render(await fs.readFile(userControllerTemplate, 'utf-8'), { database, caching, communication: config.communication });
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

        const controllerName = language === 'TypeScript' ? 'userController.ts' : 'userController.js';
        const controllerPath = path.join(targetDir, 'src/interfaces/controllers', controllerName);
        const controllerTemplate = path.join(templatePath, 'src/interfaces/controllers', `${controllerName}.ejs`);

        if (await fs.pathExists(controllerTemplate)) {
            const content = ejs.render(await fs.readFile(controllerTemplate, 'utf-8'), { communication: config.communication });
            await fs.writeFile(controllerPath, content);
            await fs.remove(path.join(targetDir, 'src/interfaces/controllers', `${controllerName}.ejs`));
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

    // GraphQL Setup
    if (config.communication === 'GraphQL') {
        const ext = language === 'TypeScript' ? 'ts' : 'js';
        let graphqlInternalPath = architecture === 'MVC' ? 'src/graphql' : 'src/interfaces/graphql';
        
        const sourceGraphqDir = path.join(templatePath, graphqlInternalPath);
        const targetGraphqlDir = path.join(targetDir, graphqlInternalPath);

        if (await fs.pathExists(sourceGraphqDir)) {
            // Read and render all .ejs files in the directory recursively
            const renderEjsDir = async (src, dest) => {
                await fs.ensureDir(dest);
                const items = await fs.readdir(src);
                for (let item of items) {
                    const srcPath = path.join(src, item);
                    const destPath = path.join(dest, item);
                    const stat = await fs.stat(srcPath);

                    if (stat.isDirectory()) {
                        await renderEjsDir(srcPath, destPath);
                    } else if (item.endsWith('.ejs')) {
                        const content = ejs.render(await fs.readFile(srcPath, 'utf-8'), { language, architecture, database, caching });
                        // Remove .ejs extension
                        const finalDestPath = destPath.slice(0, -4);
                        await fs.writeFile(finalDestPath, content);
                    }
                }
            };

            await renderEjsDir(sourceGraphqDir, targetGraphqlDir);
            // After successful generation, remove the raw template folder in the target dir (since copyBaseStructure copies EVERYTHING)
            await fs.remove(path.join(targetDir, graphqlInternalPath)); // remove the raw dir
            await renderEjsDir(sourceGraphqDir, targetGraphqlDir); // render them into place
        }
    } else {
        // Cleanup GraphQL template dirs if REST or Kafka is selected
        let graphqlInternalPath = architecture === 'MVC' ? 'src/graphql' : 'src/interfaces/graphql';
        await fs.remove(path.join(targetDir, graphqlInternalPath));
    }

    // Cleanup REST routes if GraphQL or Kafka is selected
    if (config.communication !== 'REST APIs') {
        if (architecture === 'MVC') {
            await fs.remove(path.join(targetDir, 'src/routes'));
        } else if (architecture === 'Clean Architecture') {
            await fs.remove(path.join(targetDir, 'src/interfaces/routes'));
        }
    }
};

export const renderSwaggerConfig = async (templatesDir, targetDir, config) => {
    const { communication, projectName, architecture, language } = config;
    
    // Check for Swagger config template (typically in src/config/swagger.ts.ejs)
    const swaggerTsTemplate = path.join(targetDir, 'src', 'config', 'swagger.ts.ejs');
    
    // Ensure config directory exists
    let configDir = path.join(targetDir, 'src', 'config');
    if (architecture === 'Clean Architecture' && language === 'JavaScript') {
        configDir = path.join(targetDir, 'src', 'infrastructure', 'webserver');
    }
    await fs.ensureDir(configDir);

    if (communication === 'REST APIs') {
        const swaggerYmlTemplateSource = path.join(templatesDir, 'common', 'swagger.yml.ejs');
        if (await fs.pathExists(swaggerYmlTemplateSource)) {
            const ymlContent = ejs.render(await fs.readFile(swaggerYmlTemplateSource, 'utf-8'), { projectName });
            await fs.writeFile(path.join(configDir, 'swagger.yml'), ymlContent);
        }

        if (await fs.pathExists(swaggerTsTemplate)) {
            const content = ejs.render(await fs.readFile(swaggerTsTemplate, 'utf-8'), { communication });
            await fs.writeFile(path.join(targetDir, 'src', 'config', 'swagger.ts'), content);
        }
    }
    
    // Always remove the template after processing or if not needed
    if (await fs.pathExists(swaggerTsTemplate)) {
        await fs.remove(swaggerTsTemplate);
    }
    // Also cleanup yml template if not REST APIs since copyBaseSturcture copies it earlier
    const swaggerYmlDestPath = path.join(targetDir, 'src', 'config', 'swagger.yml.ejs');
    if (await fs.pathExists(swaggerYmlDestPath)) {
        await fs.remove(swaggerYmlDestPath);
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
