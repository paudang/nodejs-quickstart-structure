import fs from 'fs-extra';
import path from 'path';
import ejs from 'ejs';

export const renderIndexFile = async (templatePath, targetDir, config) => {
    const { communication, viewEngine, database, architecture, projectName, language, caching } = config;
    const indexFileName = language === 'TypeScript' ? 'index.ts' : 'index.js';
    const indexPath = path.join(targetDir, 'src', indexFileName);
    const indexTemplateSource = path.join(templatePath, 'src', `${indexFileName}.ejs`);

    if (await fs.pathExists(indexTemplateSource)) {
        const indexTemplate = await fs.readFile(indexTemplateSource, 'utf-8');
        const indexContent = ejs.render(indexTemplate, { ...config });
        await fs.writeFile(indexPath, indexContent);
        await fs.remove(path.join(targetDir, 'src', `${indexFileName}.ejs`));
    }
};

export const renderEnvConfig = async (templatePath, targetDir, config) => {
    const { language, architecture, database, caching, communication } = config;
    const envExt = language === 'TypeScript' ? 'ts' : 'js';

    let configDir = path.join(targetDir, 'src', 'config');
    if (architecture === 'Clean Architecture' && language === 'JavaScript') {
        configDir = path.join(targetDir, 'src', 'infrastructure', 'config');
    }

    const envTemplatePath = path.join(configDir, `env.${envExt}.ejs`);
    const envDestPath = path.join(configDir, `env.${envExt}`);

    if (await fs.pathExists(envTemplatePath)) {
        const envTemplate = await fs.readFile(envTemplatePath, 'utf-8');
        const envContent = ejs.render(envTemplate, { ...config });
        await fs.writeFile(envDestPath, envContent);
        await fs.remove(envTemplatePath);
    }
};

export const renderErrorMiddleware = async (templatePath, targetDir, config) => {
    const { language, architecture } = config;
    const errName = language === 'TypeScript' ? 'errorMiddleware.ts' : 'errorMiddleware.js';
    const errTemplateName = `${errName}.ejs`;

    if (architecture === 'MVC') {
        // MVC: render from target's src/utils/ (the .ejs copy put there by copyBaseStructure)
        const ejsCopy = path.join(targetDir, 'src/utils', errTemplateName);
        const dest = path.join(targetDir, 'src/utils', errName);
        if (await fs.pathExists(ejsCopy)) {
            await fs.writeFile(dest, await fs.readFile(ejsCopy, 'utf-8'));
            await fs.remove(ejsCopy);
        }
    } else {
        // Clean Architecture: render from target's src/utils/ (the .ejs copy put there by copyBaseStructure)
        const utilsEjsCopy = path.join(targetDir, 'src/utils', errTemplateName);
        const utilsDest = path.join(targetDir, 'src/utils', errName);
        await fs.ensureDir(path.join(targetDir, 'src/utils'));
        if (await fs.pathExists(utilsEjsCopy)) {
            await fs.writeFile(utilsDest, await fs.readFile(utilsEjsCopy, 'utf-8'));
            await fs.remove(utilsEjsCopy);
        }
        // Also render the middleware version if present (NOT removing from template)
        const mwDir = path.join(targetDir, 'src/infrastructure/webserver/middleware');
        const mwEjsCopy = path.join(mwDir, errTemplateName);
        const mwDest = path.join(mwDir, errName);
        if (await fs.pathExists(mwEjsCopy)) {
            await fs.ensureDir(mwDir);
            await fs.writeFile(mwDest, await fs.readFile(mwEjsCopy, 'utf-8'));
            await fs.remove(mwEjsCopy);
        }
    }

    // Render errorMiddleware spec template
    const specExt = language === 'TypeScript' ? 'ts' : 'js';
    const specTemplatePath = path.join(templatePath, '../../common/src/utils', `errorMiddleware.spec.${specExt}.ejs`);
    if (await fs.pathExists(specTemplatePath)) {
        const testUtilsDir = path.join(targetDir, 'tests', 'unit', 'utils');
        await fs.ensureDir(testUtilsDir);
        const specContent = ejs.render(await fs.readFile(specTemplatePath, 'utf-8'), config);
        await fs.writeFile(path.join(testUtilsDir, `errorMiddleware.spec.${specExt}`), specContent);
    }
};

export const renderDynamicComponents = async (templatePath, targetDir, config) => {
    const { architecture, language, database, caching } = config;

    // MVC Controller
    if (architecture === 'MVC') {
        const userControllerName = language === 'TypeScript' ? 'userController.ts' : 'userController.js';
        const userControllerSpecName = language === 'TypeScript' ? 'userController.spec.ts' : 'userController.spec.js';
        
        const userControllerPath = path.join(targetDir, 'src/controllers', userControllerName);
        const userControllerSpecPath = path.join(targetDir, 'tests/unit/controllers', userControllerSpecName);
        
        const userControllerTemplate = path.join(templatePath, 'src/controllers', `${userControllerName}.ejs`);
        const userControllerSpecTemplate = path.join(templatePath, 'src/controllers', `${userControllerSpecName}.ejs`);

        if (await fs.pathExists(userControllerTemplate)) {
            const content = ejs.render(await fs.readFile(userControllerTemplate, 'utf-8'), { ...config });
            await fs.writeFile(userControllerPath, content);
            await fs.remove(path.join(targetDir, 'src/controllers', `${userControllerName}.ejs`));
        }
        
        if (await fs.pathExists(userControllerSpecTemplate)) {
            await fs.ensureDir(path.join(targetDir, 'tests/unit/controllers'));
            const content = ejs.render(await fs.readFile(userControllerSpecTemplate, 'utf-8'), { ...config });
            await fs.writeFile(userControllerSpecPath, content);
            await fs.remove(path.join(targetDir, 'tests/unit/controllers', `${userControllerSpecName}.ejs`));
        }

        // MVC Routes
        const routeName = language === 'TypeScript' ? 'api.ts' : 'api.js';
        const routePath = path.join(targetDir, 'src/routes', routeName);
        const routeTemplate = path.join(templatePath, 'src/routes', `${routeName}.ejs`);

        if (await fs.pathExists(routeTemplate)) {
            const content = ejs.render(await fs.readFile(routeTemplate, 'utf-8'), { ...config });
            await fs.writeFile(routePath, content);
            await fs.remove(path.join(targetDir, 'src/routes', `${routeName}.ejs`));
        }
    }

    // Clean Architecture Repo
    else if (architecture === 'Clean Architecture') {
        const repoName = language === 'TypeScript' ? 'UserRepository.ts' : 'UserRepository.js';
        const repoSpecName = language === 'TypeScript' ? 'UserRepository.spec.ts' : 'UserRepository.spec.js';
        
        const repoPath = path.join(targetDir, 'src/infrastructure/repositories', repoName);
        const repoSpecPath = path.join(targetDir, 'tests/unit/infrastructure/repositories', repoSpecName);
        
        const repoTemplate = path.join(templatePath, 'src/infrastructure/repositories', `${repoName}.ejs`);
        const repoSpecTemplate = path.join(templatePath, 'src/infrastructure/repositories', `${repoSpecName}.ejs`);

        if (await fs.pathExists(repoTemplate)) {
            const content = ejs.render(await fs.readFile(repoTemplate, 'utf-8'), { ...config });
            await fs.writeFile(repoPath, content);
            await fs.remove(path.join(targetDir, 'src/infrastructure/repositories', `${repoName}.ejs`));
        }
        if (await fs.pathExists(repoSpecTemplate)) {
            await fs.ensureDir(path.join(targetDir, 'tests/unit/infrastructure/repositories'));
            const content = ejs.render(await fs.readFile(repoSpecTemplate, 'utf-8'), { ...config });
            await fs.writeFile(repoSpecPath, content);
            await fs.remove(path.join(targetDir, 'src/infrastructure/repositories', `${repoSpecName}.ejs`));
        }

        const controllerName = language === 'TypeScript' ? 'userController.ts' : 'userController.js';
        const controllerSpecName = language === 'TypeScript' ? 'userController.spec.ts' : 'userController.spec.js';
        
        const controllerPath = path.join(targetDir, 'src/interfaces/controllers', controllerName);
        const controllerSpecPath = path.join(targetDir, 'tests/unit/interfaces/controllers', controllerSpecName);
        
        const controllerTemplate = path.join(templatePath, 'src/interfaces/controllers', `${controllerName}.ejs`);
        const controllerSpecTemplate = path.join(templatePath, 'src/interfaces/controllers', `${controllerSpecName}.ejs`);

        if (await fs.pathExists(controllerTemplate)) {
            const content = ejs.render(await fs.readFile(controllerTemplate, 'utf-8'), { ...config });
            await fs.writeFile(controllerPath, content);
            await fs.remove(path.join(targetDir, 'src/interfaces/controllers', `${controllerName}.ejs`));
        }
        
        if (await fs.pathExists(controllerSpecTemplate)) {
            await fs.ensureDir(path.join(targetDir, 'tests/unit/interfaces/controllers'));
            const content = ejs.render(await fs.readFile(controllerSpecTemplate, 'utf-8'), { ...config });
            await fs.writeFile(controllerSpecPath, content);
            await fs.remove(path.join(targetDir, 'src/interfaces/controllers', `${controllerSpecName}.ejs`));
        }

        // CA Routes
        const routeName = language === 'TypeScript' ? 'userRoutes.ts' : 'api.js';
        const routePath = path.join(targetDir, 'src/interfaces/routes', routeName);
        const routeTemplate = path.join(templatePath, 'src/interfaces/routes', `${routeName}.ejs`);

        if (await fs.pathExists(routeTemplate)) {
            const content = ejs.render(await fs.readFile(routeTemplate, 'utf-8'), { ...config });
            await fs.writeFile(routePath, content);
            await fs.remove(path.join(targetDir, 'src/interfaces/routes', `${routeName}.ejs`));
        }
    }

    // Render Server (Clean Arch JS only)
    if (architecture === 'Clean Architecture' && language === 'JavaScript') {
        const serverName = 'server.js';
        const serverPath = path.join(targetDir, 'src/infrastructure/webserver', serverName);
        const serverTemplate = path.join(templatePath, 'src/infrastructure/webserver', `${serverName}.ejs`);

        if (await fs.pathExists(serverTemplate)) {
            const content = ejs.render(await fs.readFile(serverTemplate, 'utf-8'), { ...config });
            await fs.writeFile(serverPath, content);
            await fs.remove(path.join(targetDir, 'src/infrastructure/webserver', `${serverName}.ejs`));
        }
    }

    // Cleanup REST routes if neither REST APIs nor Kafka is selected
    if (config.communication !== 'REST APIs' && config.communication !== 'Kafka') {
        if (architecture === 'MVC') {
            await fs.remove(path.join(targetDir, 'src/routes'));
        } else if (architecture === 'Clean Architecture') {
            await fs.remove(path.join(targetDir, 'src/interfaces/routes'));
        }
    }

    // Advanced Health Check Route Modularization
    const healthExt = language === 'TypeScript' ? 'ts' : 'js';
    const healthTemplatePath = path.join(templatePath, '../../common/health', healthExt, `healthRoute.${healthExt}.ejs`);

    if (await fs.pathExists(healthTemplatePath)) {
        let routeDestDir = path.join(targetDir, 'src', 'routes');
        if (architecture === 'Clean Architecture') {
            routeDestDir = path.join(targetDir, 'src', 'interfaces', 'routes');
        }
        await fs.ensureDir(routeDestDir);

        const healthRouteContent = ejs.render(await fs.readFile(healthTemplatePath, 'utf-8'), { ...config });
        await fs.writeFile(path.join(routeDestDir, `healthRoute.${healthExt}`), healthRouteContent);

        // Render health route spec template
        const healthSpecTemplatePath = path.join(templatePath, '../../common/health', healthExt, `healthRoute.spec.${healthExt}.ejs`);
        if (await fs.pathExists(healthSpecTemplatePath)) {
            let testRouteDestDir = path.join(targetDir, 'tests', 'unit', 'routes');
            if (architecture === 'Clean Architecture') {
                testRouteDestDir = path.join(targetDir, 'tests', 'unit', 'interfaces', 'routes');
            }
            await fs.ensureDir(testRouteDestDir);
            const specContent = ejs.render(await fs.readFile(healthSpecTemplatePath, 'utf-8'), config);
            await fs.writeFile(path.join(testRouteDestDir, `healthRoute.spec.${healthExt}`), specContent);
        }
    }

    // Advanced Graceful Shutdown Modularization
    const shutdownExt = language === 'TypeScript' ? 'ts' : 'js';
    const shutdownTemplatePath = path.join(templatePath, '../../common/shutdown', shutdownExt, `gracefulShutdown.${shutdownExt}.ejs`);

    if (await fs.pathExists(shutdownTemplatePath)) {
        let utilsDestDir = path.join(targetDir, 'src', 'utils');
        await fs.ensureDir(utilsDestDir);

        const shutdownContent = ejs.render(await fs.readFile(shutdownTemplatePath, 'utf-8'), { ...config });
        await fs.writeFile(path.join(utilsDestDir, `gracefulShutdown.${shutdownExt}`), shutdownContent);

        // Render graceful shutdown spec template
        const shutdownSpecTemplatePath = path.join(templatePath, '../../common/shutdown', shutdownExt, `gracefulShutdown.spec.${shutdownExt}.ejs`);
        if (await fs.pathExists(shutdownSpecTemplatePath)) {
            const testUtilsDestDir = path.join(targetDir, 'tests', 'unit', 'utils');
            await fs.ensureDir(testUtilsDestDir);
            const specContent = ejs.render(await fs.readFile(shutdownSpecTemplatePath, 'utf-8'), config);
            await fs.writeFile(path.join(testUtilsDestDir, `gracefulShutdown.spec.${shutdownExt}`), specContent);
        }
    }

    // Advanced E2E Testing Generation
    const e2eExt = language === 'TypeScript' ? 'ts' : 'js';
    const e2eTemplatePath = path.join(templatePath, '../../common/src/tests/e2e', `e2e.users.test.${e2eExt}.ejs`);

    if (await fs.pathExists(e2eTemplatePath)) {
        let e2eDestDir = path.join(targetDir, 'tests', 'e2e');
        await fs.ensureDir(e2eDestDir);

        const e2eContent = ejs.render(await fs.readFile(e2eTemplatePath, 'utf-8'), { ...config });
        await fs.writeFile(path.join(e2eDestDir, `e2e.users.test.${e2eExt}`), e2eContent);
    }

    // E2E Test Orchestrator Generation
    const e2eOrchestratorTemplatePath = path.join(templatePath, '../../common/scripts', 'run-e2e.js.ejs');
    if (await fs.pathExists(e2eOrchestratorTemplatePath)) {
        let scriptsDestDir = path.join(targetDir, 'scripts');
        await fs.ensureDir(scriptsDestDir);

        const orchestratorContent = ejs.render(await fs.readFile(e2eOrchestratorTemplatePath, 'utf-8'), { ...config });
        await fs.writeFile(path.join(scriptsDestDir, 'run-e2e.js'), orchestratorContent);
        
        // Cleanup the raw ejs copy in target
        if (await fs.pathExists(path.join(scriptsDestDir, 'run-e2e.js.ejs'))) {
            await fs.remove(path.join(scriptsDestDir, 'run-e2e.js.ejs'));
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
};

export const renderSwaggerConfig = async (templatesDir, targetDir, config) => {
    const { communication, projectName, architecture, language } = config;

    // Check for Swagger config template (typically in src/config/swagger.ts.ejs)
    const swaggerTsTemplate = path.join(targetDir, 'src', 'config', 'swagger.ts.ejs');
    // MVC JS uses swagger.js.ejs in src/config/
    const swaggerJsTemplate = path.join(targetDir, 'src', 'config', 'swagger.js.ejs');
    // Clean Arch JS uses swagger.js.ejs in src/infrastructure/webserver/
    const swaggerJsCleanTemplate = path.join(targetDir, 'src', 'infrastructure', 'webserver', 'swagger.js.ejs');

    // Ensure config directory exists
    let configDir = path.join(targetDir, 'src', 'config');
    if (architecture === 'Clean Architecture' && language === 'JavaScript') {
        configDir = path.join(targetDir, 'src', 'infrastructure', 'webserver');
    }
    await fs.ensureDir(configDir);

    if (communication === 'REST APIs' || communication === 'Kafka') {
        const swaggerYmlTemplateSource = path.join(templatesDir, 'common', 'swagger.yml.ejs');
        if (await fs.pathExists(swaggerYmlTemplateSource)) {
            const ymlContent = ejs.render(await fs.readFile(swaggerYmlTemplateSource, 'utf-8'), { ...config });
            await fs.writeFile(path.join(configDir, 'swagger.yml'), ymlContent);
        }


        if (await fs.pathExists(swaggerTsTemplate)) {
            const content = ejs.render(await fs.readFile(swaggerTsTemplate, 'utf-8'), { communication });
            await fs.writeFile(path.join(targetDir, 'src', 'config', 'swagger.ts'), content);
        }

        // MVC JS: render swagger.js.ejs → swagger.js
        if (await fs.pathExists(swaggerJsTemplate)) {
            const content = await fs.readFile(swaggerJsTemplate, 'utf-8');
            await fs.writeFile(path.join(targetDir, 'src', 'config', 'swagger.js'), content);
        }

        // Clean Arch JS: render swagger.js.ejs → swagger.js in webserver/
        if (await fs.pathExists(swaggerJsCleanTemplate)) {
            const content = await fs.readFile(swaggerJsCleanTemplate, 'utf-8');
            await fs.writeFile(path.join(targetDir, 'src', 'infrastructure', 'webserver', 'swagger.js'), content);
        }
    }

    // Always remove the .ejs template after processing (or if non-REST, just delete it)
    if (await fs.pathExists(swaggerTsTemplate)) await fs.remove(swaggerTsTemplate);
    if (await fs.pathExists(swaggerJsTemplate)) await fs.remove(swaggerJsTemplate);
    if (await fs.pathExists(swaggerJsCleanTemplate)) await fs.remove(swaggerJsCleanTemplate);

    // Also cleanup yml template if not REST APIs since copyBaseStructure copies it earlier
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

export const processAllTests = async (targetDir, config) => {
    const srcDir = path.join(targetDir, 'src');
    const testsDir = path.join(targetDir, 'tests');

    const processDir = async (currentDir) => {
        if (!(await fs.pathExists(currentDir))) return;
        const items = await fs.readdir(currentDir);
        for (const item of items) {

            const itemPath = path.join(currentDir, item);
            const stat = await fs.stat(itemPath);
            if (stat.isDirectory()) {
                await processDir(itemPath);
            } else if (itemPath.endsWith('.spec.ts') || 
                itemPath.endsWith('.spec.js') || 
                itemPath.endsWith('.test.ts') || 
                itemPath.endsWith('.test.js') || 
                itemPath.endsWith('.spec.ts.ejs') || 
                itemPath.endsWith('.spec.js.ejs') || 
                itemPath.endsWith('.test.ts.ejs') || 
                itemPath.endsWith('.test.js.ejs')) {
                const relativePath = path.relative(srcDir, itemPath);

                const cleanRelativePath = relativePath.replace(/\.ejs$/, '');

                // Exclude e2e if it accidentally falls here, as it's processed separately
                if (cleanRelativePath.includes('e2e')) {
                    await fs.remove(itemPath);
                    continue;
                }

                const targetTestPath = path.join(testsDir, 'unit', cleanRelativePath);

                await fs.ensureDir(path.dirname(targetTestPath));

                const template = await fs.readFile(itemPath, 'utf-8');
                const content = ejs.render(template, config);

                await fs.writeFile(targetTestPath, content);
                await fs.remove(itemPath);
            }
        }
    };

    await processDir(srcDir);
};