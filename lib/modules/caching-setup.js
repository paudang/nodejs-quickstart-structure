import fs from 'fs-extra';
import path from 'path';
import ejs from 'ejs';

export const setupCaching = async (templatesDir, targetDir, config) => {
    const { caching, language, architecture } = config;
    if (!caching || caching === 'None') return;

    if (caching === 'Redis' || caching === 'Memory Cache') {
        const langExt = language === 'TypeScript' ? 'ts' : 'js';
        const clientObj = caching === 'Redis' 
            ? (language === 'TypeScript' ? 'redisClient.ts' : 'redisClient.js')
            : (language === 'TypeScript' ? 'memoryCache.ts' : 'memoryCache.js');
        const cacheSource = path.join(templatesDir, 'common', 'caching', langExt, `${clientObj}.ejs`);
        
        let cacheTarget;
        let loggerPath;

        if (architecture === 'MVC') {
            await fs.ensureDir(path.join(targetDir, 'src/config'));
            cacheTarget = path.join(targetDir, 'src/config', clientObj);
            loggerPath = language === 'TypeScript' ? '@/utils/logger' : '../utils/logger';
        } else {
            // Clean Architecture
            await fs.ensureDir(path.join(targetDir, 'src/infrastructure/caching'));
            cacheTarget = path.join(targetDir, 'src/infrastructure/caching', clientObj);
            loggerPath = language === 'TypeScript' ? '@/infrastructure/log/logger' : '../log/logger';

            // Overwrite UseCase with Caching Enabled
            const useCaseName = language === 'TypeScript' ? 'getAllUsers.ts' : 'GetAllUsers.js';
            const useCaseSource = path.join(templatesDir, 'common', 'caching', 'clean', langExt, `${useCaseName}.ejs`);
            
            // Both TS and JS templates use 'usecases' directory
            const useCaseTargetDir = path.join(targetDir, 'src/usecases');
            await fs.ensureDir(useCaseTargetDir); 
            
            if (await fs.pathExists(useCaseSource)) {
                const ucContent = await fs.readFile(useCaseSource, 'utf-8');
                const renderedUc = ejs.render(ucContent, { caching });
                await fs.writeFile(path.join(useCaseTargetDir, useCaseName), renderedUc);
            }

            // Also Overwrite CreateUser with Caching (Invalidation) Enabled
            const createUserParams = language === 'TypeScript' ? { name: 'createUser.ts', src: 'createUser.ts.ejs' } : { name: 'CreateUser.js', src: 'CreateUser.js.ejs' };
            const createUserSource = path.join(templatesDir, 'common', 'caching', 'clean', langExt, createUserParams.src);

            if (await fs.pathExists(createUserSource)) {
                const createUserContent = await fs.readFile(createUserSource, 'utf-8');
                const renderedCreateUser = ejs.render(createUserContent, { caching });
                await fs.writeFile(path.join(useCaseTargetDir, createUserParams.name), renderedCreateUser);
            }
        }

        if (await fs.pathExists(cacheSource)) {
            const cacheTemplate = await fs.readFile(cacheSource, 'utf-8');
            const content = ejs.render(cacheTemplate, { loggerPath });
            await fs.writeFile(cacheTarget, content);

            // Render Spec if exists
            const specTemplateName = clientObj.replace(`.${langExt}`, `.spec.${langExt}.ejs`);
            const specTemplateSource = path.join(templatesDir, 'common', 'caching', langExt, specTemplateName);
            if (await fs.pathExists(specTemplateSource)) {
                const specTemplate = await fs.readFile(specTemplateSource, 'utf-8');
                const specLoggerPath = architecture === 'Clean Architecture' ? '@/infrastructure/log/logger' : '@/utils/logger';
                const specRedisPath = architecture === 'Clean Architecture' ? '@/infrastructure/caching/redisClient' : '@/config/redisClient';
                const specContent = ejs.render(specTemplate, { ...config, loggerPath: specLoggerPath, redisClientPath: specRedisPath });
                const specTarget = cacheTarget.replace(`${path.sep}src${path.sep}`, `${path.sep}tests${path.sep}unit${path.sep}`).replace(`.${langExt}`, `.spec.${langExt}`);
                await fs.ensureDir(path.dirname(specTarget));
                await fs.writeFile(specTarget, specContent);
            }
        }
    }
};
