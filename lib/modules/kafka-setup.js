import fs from 'fs-extra';
import path from 'path';
import ejs from 'ejs';

export const setupKafka = async (templatesDir, targetDir, config) => {
    const { communication, architecture, language } = config;
    if (communication !== 'Kafka') return;

    const langExt = language === 'TypeScript' ? 'ts' : 'js';
    const kafkaSource = path.join(templatesDir, 'common', 'kafka', langExt);
    
    // 1. Copy necessary directories individually (to avoid orphaned templates in src)
    if (await fs.pathExists(path.join(kafkaSource, 'services'))) {
        await fs.copy(path.join(kafkaSource, 'services'), path.join(targetDir, 'src/services'));
    }
    if (await fs.pathExists(path.join(kafkaSource, 'config'))) {
        await fs.copy(path.join(kafkaSource, 'config'), path.join(targetDir, 'src/config'));
    }

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
        let specLoggerPath, specConfigPath, specServicePath;
        if (language === 'TypeScript') {
            specLoggerPath = architecture === 'Clean Architecture' ? '@/infrastructure/log/logger' : '@/utils/logger';
            specConfigPath = architecture === 'Clean Architecture' ? '@/infrastructure/config/kafka' : '@/config/kafka';
            specServicePath = architecture === 'Clean Architecture' ? '@/infrastructure/messaging/kafkaClient' : '@/services/kafkaService';
        } else {
            specLoggerPath = architecture === 'Clean Architecture' ? '../../infrastructure/log/logger' : '../utils/logger';
            specConfigPath = architecture === 'Clean Architecture' ? '../../infrastructure/config/kafka' : '../config/kafka';
            specServicePath = architecture === 'Clean Architecture' ? '../../infrastructure/messaging/kafkaClient' : '../services/kafkaService';
        }

        const specContent = ejs.render(await fs.readFile(kafkaSpecTemplate, 'utf-8'), { ...config, loggerPath: specLoggerPath, configPath: specConfigPath, servicePath: specServicePath });
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
        
        await fs.move(
            path.join(targetDir, `src/services/kafkaService.${serviceExt}`), 
            path.join(targetDir, `src/infrastructure/messaging/kafkaClient.${serviceExt}`),
            { overwrite: true }
        );

        if (await fs.pathExists(path.join(targetDir, `src/services/kafkaService.spec.${serviceExt}`))) {
            await fs.move(
                path.join(targetDir, `src/services/kafkaService.spec.${serviceExt}`),
                path.join(targetDir, `tests/infrastructure/messaging/kafkaClient.spec.${serviceExt}`),
                { overwrite: true }
            );
        }

        if (await fs.pathExists(path.join(targetDir, `src/config/kafka.${serviceExt}`))) {
            await fs.move(
                path.join(targetDir, `src/config/kafka.${serviceExt}`),
                path.join(targetDir, `src/infrastructure/config/kafka.${serviceExt}`),
                { overwrite: true }
            );
        }

        await fs.remove(path.join(targetDir, 'src/services'));

        // Messaging Infrastructure Enhancement
        const messagingDir = path.join(targetDir, 'src/interfaces/messaging');
        await fs.ensureDir(path.join(messagingDir, 'consumers/instances'));
        await fs.ensureDir(path.join(messagingDir, 'schemas'));

        const loggerPath = language === 'TypeScript' ? '@/infrastructure/log/logger' : '../../infrastructure/log/logger';
        const messagingTemplates = [
            { src: 'baseConsumer', dest: 'interfaces/messaging/baseConsumer' },
            { src: 'userEventSchema', dest: 'interfaces/messaging/schemas/userEventSchema' },
            { src: 'welcomeEmailConsumer', dest: 'interfaces/messaging/consumers/instances/welcomeEmailConsumer' }
        ];

        for (const t of messagingTemplates) {
            const templateSource = path.join(templatesDir, 'common', 'kafka', langExt, 'messaging', `${t.src}.${langExt}.ejs`);
            if (await fs.pathExists(templateSource)) {
                const content = ejs.render(await fs.readFile(templateSource, 'utf-8'), { ...config, loggerPath });
                await fs.writeFile(path.join(targetDir, 'src', `${t.dest}.${langExt}`), content);
            }

            // Render Specs for messaging components
            const specTemplateSource = path.join(templatesDir, 'common', 'kafka', langExt, 'messaging', `${t.src}.spec.${langExt}.ejs`);
            if (await fs.pathExists(specTemplateSource)) {
                const specContent = ejs.render(await fs.readFile(specTemplateSource, 'utf-8'), { ...config, loggerPath });
                const specDest = path.join(targetDir, 'tests', `${t.dest}.spec.${langExt}`);
                await fs.ensureDir(path.dirname(specDest));
                await fs.writeFile(specDest, specContent);
            }
        }
        
    } else if (architecture === 'MVC') {
        const serviceExt = language === 'TypeScript' ? 'ts' : 'js';
        
        const messagingDir = path.join(targetDir, 'src/messaging');
        await fs.ensureDir(path.join(messagingDir, 'consumers/instances'));
        await fs.ensureDir(path.join(messagingDir, 'schemas'));

        const loggerPath = language === 'TypeScript' ? '@/utils/logger' : '../utils/logger';
        const messagingTemplates = [
            { src: 'baseConsumer', dest: 'messaging/baseConsumer' },
            { src: 'userEventSchema', dest: 'messaging/schemas/userEventSchema' },
            { src: 'welcomeEmailConsumer', dest: 'messaging/consumers/instances/welcomeEmailConsumer' }
        ];

        for (const t of messagingTemplates) {
            const templateSource = path.join(templatesDir, 'common', 'kafka', langExt, 'messaging', `${t.src}.${langExt}.ejs`);
            if (await fs.pathExists(templateSource)) {
                const content = ejs.render(await fs.readFile(templateSource, 'utf-8'), { ...config, loggerPath });
                await fs.writeFile(path.join(targetDir, 'src', `${t.dest}.${langExt}`), content);
            }

            // Render Specs for messaging components
            const specTemplateSource = path.join(templatesDir, 'common', 'kafka', langExt, 'messaging', `${t.src}.spec.${langExt}.ejs`);
            if (await fs.pathExists(specTemplateSource)) {
                const specContent = ejs.render(await fs.readFile(specTemplateSource, 'utf-8'), { ...config, loggerPath });
                const specDest = path.join(targetDir, 'tests', `${t.dest}.spec.${langExt}`);
                await fs.ensureDir(path.dirname(specDest));
                await fs.writeFile(specDest, specContent);
            }
        }

        if (await fs.pathExists(path.join(targetDir, `src/services/kafkaService.spec.${serviceExt}`))) {
            await fs.ensureDir(path.join(targetDir, 'tests/services'));
            await fs.move(
                path.join(targetDir, `src/services/kafkaService.spec.${serviceExt}`),
                path.join(targetDir, `tests/services/kafkaService.spec.${serviceExt}`),
                { overwrite: true }
            );
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
