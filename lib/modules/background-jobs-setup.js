import path from 'path';
import fs from 'fs-extra';
import ejs from 'ejs';

export const setupBackgroundJobs = async (templatesDir, targetDir, config) => {
    const { backgroundJobs, language, architecture } = config;

    if (!backgroundJobs) {
        return;
    }

    const ext = language === 'TypeScript' ? 'ts' : 'js';
    
    // Determine the target directory for queues based on architecture
    const baseDir = architecture === 'Clean Architecture' ? 'infrastructure' : 'utils';
    const utilsDestDir = path.join(targetDir, 'src', baseDir, 'queues');
    
    // Create directories
    await fs.ensureDir(utilsDestDir);

    const queueFiles = [
        'emailQueue',
        'emailWorker',
        'queueBoard'
    ];

    // Render and copy each background jobs file
    for (const file of queueFiles) {
        const templatePath = path.join(templatesDir, 'common', 'queues', `${file}.${ext}.ejs`);
        const destPath = path.join(utilsDestDir, `${file}.${ext}`);

        if (await fs.pathExists(templatePath)) {
            const content = await ejs.renderFile(templatePath, config);
            await fs.writeFile(destPath, content);
        } else {
            console.warn(`[Warning] Background Jobs template missing: ${templatePath}`);
        }

        const testTemplatePath = path.join(templatesDir, 'common', 'queues', `${file}.spec.${ext}.ejs`);
        const testDestPath = path.join(utilsDestDir, `${file}.spec.${ext}`);
        
        if (await fs.pathExists(testTemplatePath)) {
            const testContent = await ejs.renderFile(testTemplatePath, config);
            await fs.writeFile(testDestPath, testContent);
        }
    }
};
