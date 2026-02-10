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
        
        // Remove src/config if it was only for Kafka and not needed by other parts
        // But Database setup might assume src/config existence in some templates (though moved to infrastructure/database for clean arch)
        // Safest to leave src/config if non-empty, or remove if empty. 
        // For now, mirroring original logic: remove specific REST folders
        
        // Remove REST-specific folders (Interfaces)
        await fs.remove(path.join(targetDir, 'src/interfaces/routes'));
        await fs.remove(path.join(targetDir, 'src/interfaces/controllers'));
        
        // Original logic removed src/config entirely for clean arch kafka? 
        // Let's check original logic: 
        // await fs.remove(path.join(targetDir, 'src/config'));
        // Yes, it did.
         await fs.remove(path.join(targetDir, 'src/config'));

    } else if (architecture === 'MVC' && (!config.viewEngine || config.viewEngine === 'None')) {
        // MVC Cleanup for Kafka Worker (No views)
        await fs.remove(path.join(targetDir, 'src/controllers'));
        await fs.remove(path.join(targetDir, 'src/routes'));
    }
};

export const setupViews = async (templatesDir, targetDir, config) => {
    const { architecture, viewEngine } = config;
    if (architecture === 'MVC' && viewEngine && viewEngine !== 'None') {
        const publicDir = path.join(templatesDir, 'common', 'public');
        if (await fs.pathExists(publicDir)) {
            await fs.copy(publicDir, path.join(targetDir, 'public'));
        }
        
        // Copy views mapping
        // Logic handled in database-setup (part of db config block in original) but functionally belongs here or separate.
        // Original: if (viewEngine && viewEngine !== 'None') await fs.copy(...) inside the DB block for MVC.
        // We moved it to database-setup.js to match flow, but let's double check if we missed it there.
        // Checked database-setup.js: It copies views ONLY if database !== 'None' OR if database === 'None'
        // So it is covered. Ideally it should be here, but for now strict refactor keeps it effectively in DB/structure setup phase.
        // To be cleaner, we should move the VIEW copying here.
        
        // Moving View Copying Check here for better separation:
        // We need to verify if database-setup.js ALREADY does this. 
        // In my prev step for database-setup.js, I included logic:
        // if (architecture === 'MVC') { if (viewEngine...) copy views }
        // So duplication might occur if I add it here too. 
        // Let's relies on this module ONLY for public assets for now, or ensure idempotency.
        
        // Actually, let's keep it clean. database-setup.js shouldn't handle views. 
        // I will assume I can update database-setup.js to remove view copying if I put it here?
        // OR just leave it there for this iteration to avoid breaking changes in flow order.
        // Let's stick to the original flow where possible, but this module is 'kafka-and-views'.
        
        // The original logic had view copying inside the "Database Config" block.
        // My database-setup.js preserved that. 
        // So this logic here only handles 'public' folder copying which was Step 8 in original.
    }
};
