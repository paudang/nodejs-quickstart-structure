import fs from 'fs-extra';
import path from 'path';

export const setupProjectDirectory = async (targetDir, projectName) => {
    if (await fs.pathExists(targetDir)) {
        throw new Error(`Directory ${projectName} already exists.`);
    }
    await fs.ensureDir(targetDir);
};

export const copyBaseStructure = async (templatesDir, targetDir, architecture, language) => {
    const structureMap = {
        'MVC': 'mvc',
        'Clean Architecture': 'clean-architecture'
    };
    const archTemplate = structureMap[architecture];
    const langExt = language === 'TypeScript' ? 'ts' : 'js';
    const templatePath = path.join(templatesDir, archTemplate, langExt);

    await fs.copy(templatePath, targetDir);
    return { archTemplate, langExt, templatePath };
};

export const copyCommonFiles = async (templatesDir, targetDir, language) => {
    await fs.copy(path.join(templatesDir, 'common', '_gitignore'), path.join(targetDir, '.gitignore'));
    await fs.copy(path.join(templatesDir, 'common', '.dockerignore'), path.join(targetDir, '.dockerignore'));
    
    if (language === 'TypeScript') {
        await fs.copy(path.join(templatesDir, 'common', 'tsconfig.json'), path.join(targetDir, 'tsconfig.json'));
    }
};
