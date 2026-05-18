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
    await fs.copy(path.join(templatesDir, 'common', '.gitattributes'), path.join(targetDir, '.gitattributes'));
    
    if (language === 'TypeScript') {
        await fs.copy(path.join(templatesDir, 'common', 'tsconfig.json'), path.join(targetDir, 'tsconfig.json'));
        await fs.copy(path.join(templatesDir, 'common', 'tsconfig.eslint.json'), path.join(targetDir, 'tsconfig.eslint.json'));
    }
};

export const cleanGeneratedFiles = async (dir) => {
    const items = await fs.readdir(dir);
    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = await fs.stat(fullPath);
        if (stat.isDirectory()) {
            if (item !== 'node_modules' && item !== '.git') {
                await cleanGeneratedFiles(fullPath);
            }
        } else {
            const ext = path.extname(item);
            if (['.ts', '.js', '.json', '.yml', '.yaml', '.md', '.env', '.example', '.cursorrules'].includes(ext) || item === 'Dockerfile' || item === 'Jenkinsfile') {
                let content = await fs.readFile(fullPath, 'utf-8');
                const original = content;
                
                content = content.replace(/\r\n/g, '\n');
                
                // 1. Remove trailing spaces on lines
                content = content.replace(/[ \t]+$/gm, '');
                
                // 2. Collapse 3+ consecutive newlines to maximum 2 newlines (double spacing)
                content = content.replace(/\n{3,}/g, '\n\n');
                
                // 3. Remove blank lines immediately before closing braces/brackets, preserving indentation
                content = content.replace(/\n\s*\n(\s*)([\}|\]])/g, '\n$1$2');
                
                // 4. Remove blank lines immediately after opening braces/brackets, preserving indentation
                content = content.replace(/({\s*)\n\s*\n(\s*)/g, '$1\n$2');
                content = content.replace(/(\[\s*)\n\s*\n(\s*)/g, '$1\n$2');
                
                // 5. Ensure exactly one trailing newline at the end of the file
                content = content.trim() + '\n';
                
                if (content !== original) {
                    await fs.writeFile(fullPath, content, 'utf-8');
                }
            }
        }
    }
};
