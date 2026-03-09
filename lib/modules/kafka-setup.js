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
    // Render Kafka Service Spec
    const kafkaSpecFileName = `kafkaService.spec.${langExt}`;
    const kafkaSpecTemplate = path.join(targetDir, 'src', 'services', `${kafkaSpecFileName}.ejs`);

    if (await fs.pathExists(kafkaServiceTemplate)) {
        let serviceLoggerPath, serviceConfigPath;
        if (language === 'TypeScript') {
            serviceLoggerPath = architecture === 'Clean Architecture' ? '@/infrastructure/log/logger' : '@/utils/logger';
            serviceConfigPath = architecture === 'Clean Architecture' ? '@/infrastructure/config/kafka' : '@/config/kafka';
        } else {
            serviceLoggerPath = architecture === 'Clean Architecture' ? '../../infrastructure/log/logger' : '../utils/logger';
            serviceConfigPath = architecture === 'Clean Architecture' ? '../../infrastructure/config/kafka' : '../config/kafka';
        }
        
        const content = ejs.render(await fs.readFile(kafkaServiceTemplate, 'utf-8'), { ...config, loggerPath: serviceLoggerPath, configPath: serviceConfigPath });
        await fs.writeFile(path.join(targetDir, 'src', 'services', kafkaServiceFileName), content);
        await fs.remove(kafkaServiceTemplate);
    }

    if (await fs.pathExists(kafkaSpecTemplate)) {
        let specLoggerPath, specConfigPath;
        if (language === 'TypeScript') {
            specLoggerPath = architecture === 'Clean Architecture' ? '@/infrastructure/log/logger' : '@/utils/logger';
            specConfigPath = architecture === 'Clean Architecture' ? '@/infrastructure/config/kafka' : '@/config/kafka';
        } else {
            // For JS tests, we use @/ to ensure resolution after move to tests/
            specLoggerPath = architecture === 'Clean Architecture' ? '@/infrastructure/log/logger' : '@/utils/logger';
            specConfigPath = architecture === 'Clean Architecture' ? '@/infrastructure/config/kafka' : '@/config/kafka';
        }

        const specContent = ejs.render(await fs.readFile(kafkaSpecTemplate, 'utf-8'), { ...config, loggerPath: specLoggerPath, configPath: specConfigPath });
        await fs.writeFile(path.join(targetDir, 'src', 'services', kafkaSpecFileName), specContent);
        await fs.remove(kafkaSpecTemplate);
    }

    // Render Kafka Config Spec
    const kafkaConfigSpecFileName = `kafka.spec.${langExt}`;
    const kafkaConfigSpecTemplate = path.join(templatesDir, 'common', 'kafka', langExt, 'config', `${kafkaConfigSpecFileName}.ejs`);
    if (await fs.pathExists(kafkaConfigSpecTemplate)) {
        const specContent = ejs.render(await fs.readFile(kafkaConfigSpecTemplate, 'utf-8'), { ...config });
        let specTarget;
        if (architecture === 'MVC') {
            specTarget = path.join(targetDir, 'tests', 'config', kafkaConfigSpecFileName);
        } else {
            specTarget = path.join(targetDir, 'tests', 'infrastructure', 'config', kafkaConfigSpecFileName);
        }
        await fs.ensureDir(path.dirname(specTarget));
        await fs.writeFile(specTarget, specContent);
        
        // Remove the template from src in targetDir to avoid double processing by processAllTests
        const targetSpecTemplate = path.join(targetDir, 'src', 'config', `${kafkaConfigSpecFileName}.ejs`);
        if (await fs.pathExists(targetSpecTemplate)) {
            await fs.remove(targetSpecTemplate);
        }
    }

    if (architecture === 'Clean Architecture') {
        // Clean Architecture Restructuring
        await fs.ensureDir(path.join(targetDir, 'src/infrastructure/messaging'));
        await fs.ensureDir(path.join(targetDir, 'tests/infrastructure/messaging'));
        await fs.ensureDir(path.join(targetDir, 'src/infrastructure/config'));

        const serviceExt = language === 'TypeScript' ? 'ts' : 'js';
        
        // Move Service to Infrastructure/Messaging
        await fs.move(
            path.join(targetDir, `src/services/kafkaService.${serviceExt}`), 
            path.join(targetDir, `src/infrastructure/messaging/kafkaClient.${serviceExt}`),
            { overwrite: true }
        );

        // Move Spec to Tests/Infrastructure/Messaging
        if (await fs.pathExists(path.join(targetDir, `src/services/kafkaService.spec.${serviceExt}`))) {
            await fs.move(
                path.join(targetDir, `src/services/kafkaService.spec.${serviceExt}`),
                path.join(targetDir, `tests/infrastructure/messaging/kafkaClient.spec.${serviceExt}`),
                { overwrite: true }
            );
        }

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
        await fs.remove(path.join(targetDir, 'tests/interfaces/controllers'));
        
        // Original logic removed src/config entirely, but now we use it for Zod env validation in TS.
        // We will no longer delete it.
    } else if (architecture === 'MVC') {
        const serviceExt = language === 'TypeScript' ? 'ts' : 'js';
        // Move Spec to Tests/Services
        if (await fs.pathExists(path.join(targetDir, `src/services/kafkaService.spec.${serviceExt}`))) {
            await fs.ensureDir(path.join(targetDir, 'tests/services'));
            await fs.move(
                path.join(targetDir, `src/services/kafkaService.spec.${serviceExt}`),
                path.join(targetDir, `tests/services/kafkaService.spec.${serviceExt}`),
                { overwrite: true }
            );
        }

        if (!config.viewEngine || config.viewEngine === 'None') {
            // MVC Cleanup for Kafka Worker (No views) - Note: routes is kept for health endpoint
            await fs.remove(path.join(targetDir, 'src/controllers'));
            await fs.remove(path.join(targetDir, 'tests/controllers'));
        }
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
