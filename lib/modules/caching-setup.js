import fs from 'fs-extra';
import path from 'path';
import ejs from 'ejs';

export const setupCaching = async (templatesDir, targetDir, config) => {
    const { caching, language, architecture } = config;
    if (!caching || caching === 'None') return;

    if (caching === 'Redis') {
        const langExt = language === 'TypeScript' ? 'ts' : 'js';
        const redisClientObj = language === 'TypeScript' ? 'redisClient.ts' : 'redisClient.js';
        const redisSource = path.join(templatesDir, 'common', 'caching', langExt, `${redisClientObj}.ejs`);
        
        let redisTarget;
        let loggerPath;

        if (architecture === 'MVC') {
            await fs.ensureDir(path.join(targetDir, 'src/config'));
            redisTarget = path.join(targetDir, 'src/config', redisClientObj);
            loggerPath = language === 'TypeScript' ? '@/utils/logger' : '../utils/logger';
        } else {
            // Clean Architecture
            await fs.ensureDir(path.join(targetDir, 'src/infrastructure/caching'));
            redisTarget = path.join(targetDir, 'src/infrastructure/caching', redisClientObj);
            loggerPath = language === 'TypeScript' ? '@/infrastructure/log/logger' : '../log/logger';

            // Overwrite UseCase with Caching Enabled
            const useCaseName = language === 'TypeScript' ? 'getAllUsers.ts' : 'GetAllUsers.js';
            const useCaseSource = path.join(templatesDir, 'common', 'caching', 'clean', langExt, `${useCaseName}.ejs`);
            
            // Both TS and JS templates use 'usecases' directory
            const useCaseTargetDir = path.join(targetDir, 'src/usecases');
            await fs.ensureDir(useCaseTargetDir); 
            
                const ucContent = await fs.readFile(useCaseSource, 'utf-8');
                await fs.writeFile(path.join(useCaseTargetDir, useCaseName), ucContent);
            }

            // Also Overwrite CreateUser with Caching (Invalidation) Enabled
            const createUserParams = language === 'TypeScript' ? { name: 'createUser.ts', src: 'createUser.ts.ejs' } : { name: 'CreateUser.js', src: 'CreateUser.js.ejs' };
            const createUserSource = path.join(templatesDir, 'common', 'caching', 'clean', langExt, createUserParams.src);

            if (await fs.pathExists(createUserSource)) {
                const createUserContent = await fs.readFile(createUserSource, 'utf-8');
                await fs.writeFile(path.join(useCaseTargetDir, createUserParams.name), createUserContent);
            }
        }

        if (await fs.pathExists(redisSource)) {
            const redisTemplate = await fs.readFile(redisSource, 'utf-8');
            const content = ejs.render(redisTemplate, { loggerPath });
            await fs.writeFile(redisTarget, content);
        }
    }
};
