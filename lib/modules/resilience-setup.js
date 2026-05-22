import fs from 'fs-extra';
import path from 'path';
import ejs from 'ejs';

export const setupResilience = async (templatesDir, targetDir, config) => {
    const { resilience, language } = config;

    if (!resilience || resilience.length === 0) {
        return;
    }

    const ext = language === 'TypeScript' ? 'ts' : 'js';
    
    const utilsDestDir = path.join(targetDir, 'src', 'utils', 'resilience');
    await fs.ensureDir(utilsDestDir);

    const testUtilsDestDir = path.join(targetDir, 'tests', 'unit', 'utils', 'resilience');
    await fs.ensureDir(testUtilsDestDir);

    const renderFeature = async (featureName) => {
        const templatePath = path.join(templatesDir, 'common', 'resilience', `${featureName}.${ext}.ejs`);
        const specTemplatePath = path.join(templatesDir, 'common', 'resilience', 'tests', `${featureName}.spec.${ext}.ejs`);

        if (await fs.pathExists(templatePath)) {
            const content = ejs.render(await fs.readFile(templatePath, 'utf-8'), config);
            await fs.writeFile(path.join(utilsDestDir, `${featureName}.${ext}`), content);
        }

        if (await fs.pathExists(specTemplatePath)) {
            const specContent = ejs.render(await fs.readFile(specTemplatePath, 'utf-8'), config);
            await fs.writeFile(path.join(testUtilsDestDir, `${featureName}.spec.${ext}`), specContent);
        }
    };

    if (resilience.includes('Timeout')) {
        await renderFeature('timeout');
    }
    if (resilience.includes('Retry')) {
        await renderFeature('retry');
    }
    if (resilience.includes('CircuitBreaker')) {
        await renderFeature('circuitBreaker');
    }
};
