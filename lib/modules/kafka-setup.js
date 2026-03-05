import fs from 'fs-extra';
import path from 'path';
import ejs from 'ejs';

export const setupKafka = async (templatesDir, targetDir, config) => {
    const { communication, architecture, language } = config;
    if (communication !== 'Kafka') return;

    const langExt = language === 'TypeScript' ? 'ts' : 'js';
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
        // Note: Check if config path exists before moving, though copy above should have put it there
        if (await fs.pathExists(path.join(targetDir, `src/config/kafka.${serviceExt}`))) {
            await fs.move(
                path.join(targetDir, `src/config/kafka.${serviceExt}`),
                path.join(targetDir, `src/infrastructure/config/kafka.${serviceExt}`),
                { overwrite: true }
            );
        }

        // Cleanup old services folder
        await fs.remove(path.join(targetDir, 'src/services'));
        
        // Remove REST-specific folders (Interfaces) - Note: routes is kept for health endpoint
        await fs.remove(path.join(targetDir, 'src/interfaces/controllers'));
        
        // Original logic removed src/config entirely, but now we use it for Zod env validation in TS.
        // We will no longer delete it.
    } else if (architecture === 'MVC' && (!config.viewEngine || config.viewEngine === 'None')) {
        // MVC Cleanup for Kafka Worker (No views) - Note: routes is kept for health endpoint
        await fs.remove(path.join(targetDir, 'src/controllers'));
    }
};

export const setupViews = async (templatesDir, targetDir, config) => {
    const { architecture, viewEngine } = config;
    if (architecture === 'MVC' && viewEngine && viewEngine !== 'None') {
        const publicDir = path.join(templatesDir, 'common', 'public');
        if (await fs.pathExists(publicDir)) {
            await fs.copy(publicDir, path.join(targetDir, 'public'));
        }
    }
};
