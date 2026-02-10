import fs from 'fs-extra';
import path from 'path';
import ejs from 'ejs';

export const renderPackageJson = async (templatesDir, targetDir, config) => {
    const { projectName, database, communication, language, viewEngine } = config;
    const packageJsonPath = path.join(targetDir, 'package.json');
    const packageTemplate = await fs.readFile(path.join(templatesDir, 'common', 'package.json.ejs'), 'utf-8');
    const packageContent = ejs.render(packageTemplate, {
        projectName,
        database,
        communication,
        language,
        viewEngine
    });
    await fs.writeFile(packageJsonPath, packageContent);
};

export const renderDockerCompose = async (templatesDir, targetDir, config) => {
    const { projectName, database, dbName, communication } = config;
    const dockerComposePath = path.join(targetDir, 'docker-compose.yml');
    const dockerTemplate = await fs.readFile(path.join(templatesDir, 'common', 'docker-compose.yml.ejs'), 'utf-8');
    const dockerContent = ejs.render(dockerTemplate, {
        projectName,
        database,
        dbName,
        communication
    });
    await fs.writeFile(dockerComposePath, dockerContent);
};

export const renderReadme = async (templatesDir, targetDir, config) => {
    const { projectName, architecture, database, communication, language, ciProvider } = config;
    const readmePath = path.join(targetDir, 'README.md');
    const readmeTemplate = await fs.readFile(path.join(templatesDir, 'common', 'README.md.ejs'), 'utf-8');
    const readmeContent = ejs.render(readmeTemplate, {
        projectName,
        architecture,
        database,
        communication,
        language,
        ciProvider
    });
    await fs.writeFile(readmePath, readmeContent);
};

export const renderDockerfile = async (templatesDir, targetDir, config) => {
    const { language, viewEngine } = config;
    const dockerfileTemplate = await fs.readFile(path.join(templatesDir, 'common', 'Dockerfile'), 'utf-8');
    const dockerfileContent = ejs.render(dockerfileTemplate, { 
        language,
        viewEngine
    });
    await fs.writeFile(path.join(targetDir, 'Dockerfile'), dockerfileContent);
};

export const renderProfessionalConfig = async (templatesDir, targetDir, language) => {
    const eslintTemplate = await fs.readFile(path.join(templatesDir, 'common', '.eslintrc.json.ejs'), 'utf-8');
    const eslintContent = ejs.render(eslintTemplate, { language });
    await fs.writeFile(path.join(targetDir, '.eslintrc.json'), eslintContent);

    await fs.copy(path.join(templatesDir, 'common', '.prettierrc'), path.join(targetDir, '.prettierrc'));
    await fs.copy(path.join(templatesDir, 'common', '.lintstagedrc'), path.join(targetDir, '.lintstagedrc'));

    const jestTemplate = await fs.readFile(path.join(templatesDir, 'common', 'jest.config.js.ejs'), 'utf-8');
    const jestContent = ejs.render(jestTemplate, { language });
    await fs.writeFile(path.join(targetDir, 'jest.config.js'), jestContent);
};

export const setupCiCd = async (templatesDir, targetDir, config) => {
    const { ciProvider, projectName } = config;
    if (ciProvider === 'GitHub Actions') {
        await fs.ensureDir(path.join(targetDir, '.github/workflows'));
        await fs.copy(path.join(templatesDir, 'common', '_github/workflows/ci.yml'), path.join(targetDir, '.github/workflows/ci.yml'));
    } else if (ciProvider === 'Jenkins') {
        const jenkinsTemplate = await fs.readFile(path.join(templatesDir, 'common', 'Jenkinsfile.ejs'), 'utf-8');
        const jenkinsContent = ejs.render(jenkinsTemplate, { projectName });
        await fs.writeFile(path.join(targetDir, 'Jenkinsfile'), jenkinsContent);
    }
};

export const renderTestSample = async (templatesDir, targetDir, language) => {
    await fs.ensureDir(path.join(targetDir, 'tests'));
    const healthTestTemplate = await fs.readFile(path.join(templatesDir, 'common', 'tests', 'health.test.ts.ejs'), 'utf-8');
    const healthTestContent = ejs.render(healthTestTemplate, { language }); 
    const testFileName = language === 'TypeScript' ? 'health.test.ts' : 'health.test.js';
    await fs.writeFile(path.join(targetDir, 'tests', testFileName), healthTestContent);
};
