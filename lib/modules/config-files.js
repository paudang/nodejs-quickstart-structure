import fs from 'fs-extra';
import path from 'path';
import ejs from 'ejs';

export const renderPackageJson = async (templatesDir, targetDir, config) => {
    const { projectName, database, communication, language, viewEngine, caching } = config;
    const packageJsonPath = path.join(targetDir, 'package.json');
    const packageTemplate = await fs.readFile(path.join(templatesDir, 'common', 'package.json.ejs'), 'utf-8');
    const packageContent = ejs.render(packageTemplate, {
        projectName,
        database,
        communication,
        language,
        communication,
        language,
        viewEngine,
        caching
    });
    await fs.writeFile(packageJsonPath, packageContent);
};

export const renderDockerCompose = async (templatesDir, targetDir, config) => {
    const { projectName, database, dbName, communication, caching } = config;
    const dockerComposePath = path.join(targetDir, 'docker-compose.yml');
    const dockerTemplate = await fs.readFile(path.join(templatesDir, 'common', 'docker-compose.yml.ejs'), 'utf-8');
    const dockerContent = ejs.render(dockerTemplate, {
        projectName,
        database,
        dbName,
        communication,
        caching
    });
    await fs.writeFile(dockerComposePath, dockerContent);
};

export const renderReadme = async (templatesDir, targetDir, config) => {
    const { projectName, architecture, database, communication, language, ciProvider, caching } = config;
    const readmePath = path.join(targetDir, 'README.md');
    const readmeTemplate = await fs.readFile(path.join(templatesDir, 'common', 'README.md.ejs'), 'utf-8');
    const readmeContent = ejs.render(readmeTemplate, {
        projectName,
        architecture,
        database,
        communication,
        caching,
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

export const renderProfessionalConfig = async (templatesDir, targetDir, config) => {
    const { language, architecture } = config;
    const eslintTemplate = await fs.readFile(path.join(templatesDir, 'common', 'eslint.config.mjs.ejs'), 'utf-8');
    const eslintContent = ejs.render(eslintTemplate, { language });
    await fs.writeFile(path.join(targetDir, 'eslint.config.mjs'), eslintContent);

    await fs.copy(path.join(templatesDir, 'common', '.prettierrc'), path.join(targetDir, '.prettierrc'));
    await fs.copy(path.join(templatesDir, 'common', '.lintstagedrc'), path.join(targetDir, '.lintstagedrc'));

    const jestTemplate = await fs.readFile(path.join(templatesDir, 'common', 'jest.config.js.ejs'), 'utf-8');
    const jestContent = ejs.render(jestTemplate, { language, architecture });
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
    } else if (ciProvider === 'GitLab CI') {
        const gitlabTemplate = await fs.readFile(path.join(templatesDir, 'common', '.gitlab-ci.yml.ejs'), 'utf-8');
        const gitlabContent = ejs.render(gitlabTemplate, { projectName });
        await fs.writeFile(path.join(targetDir, '.gitlab-ci.yml'), gitlabContent);
    }
};

export const renderTestSample = async (templatesDir, targetDir, config) => {
    const { language, architecture, communication, database, caching } = config;
    await fs.ensureDir(path.join(targetDir, 'tests'));
    
    const context = { language, architecture, communication, database, caching };
    const ext = language === 'TypeScript' ? 'ts' : 'js';

    const healthTestTemplate = await fs.readFile(path.join(templatesDir, 'common', 'tests', 'health.test.ts.ejs'), 'utf-8');
    await fs.writeFile(path.join(targetDir, 'tests', `health.test.${ext}`), ejs.render(healthTestTemplate, context));

    const errorsTestTemplate = await fs.readFile(path.join(templatesDir, 'common', 'tests', 'errors.spec.ts.ejs'), 'utf-8');
    await fs.writeFile(path.join(targetDir, 'tests', `errors.spec.${ext}`), ejs.render(errorsTestTemplate, context));

    const errMiddlewareTestTemplate = await fs.readFile(path.join(templatesDir, 'common', 'tests', 'error.middleware.spec.ts.ejs'), 'utf-8');
    await fs.writeFile(path.join(targetDir, 'tests', `error.middleware.spec.${ext}`), ejs.render(errMiddlewareTestTemplate, context));

    const loggerTestTemplate = await fs.readFile(path.join(templatesDir, 'common', 'tests', 'logger.spec.ts.ejs'), 'utf-8');
    await fs.writeFile(path.join(targetDir, 'tests', `logger.spec.${ext}`), ejs.render(loggerTestTemplate, context));

    if (architecture === 'Clean Architecture') {
        const usecaseTestTemplate = await fs.readFile(path.join(templatesDir, 'common', 'tests', 'user.usecase.spec.ts.ejs'), 'utf-8');
        await fs.writeFile(path.join(targetDir, 'tests', `user.usecase.spec.${ext}`), ejs.render(usecaseTestTemplate, context));
    }

    const controllerTestTemplate = await fs.readFile(path.join(templatesDir, 'common', 'tests', 'user.controller.spec.ts.ejs'), 'utf-8');
    await fs.writeFile(path.join(targetDir, 'tests', `user.controller.spec.${ext}`), ejs.render(controllerTestTemplate, context));

    if (architecture === 'Clean Architecture') {
        const domainTestTemplate = await fs.readFile(path.join(templatesDir, 'common', 'tests', 'domain.spec.ts.ejs'), 'utf-8');
        await fs.writeFile(path.join(targetDir, 'tests', `domain.spec.${ext}`), ejs.render(domainTestTemplate, context));
    }

    const httpCodesTestTemplate = await fs.readFile(path.join(templatesDir, 'common', 'tests', 'httpCodes.spec.ts.ejs'), 'utf-8');
    await fs.writeFile(path.join(targetDir, 'tests', `httpCodes.spec.${ext}`), ejs.render(httpCodesTestTemplate, context));

    if (architecture === 'Clean Architecture' && database !== 'None') {
        const repoTestTemplate = await fs.readFile(path.join(templatesDir, 'common', 'tests', 'repository.spec.ts.ejs'), 'utf-8');
        const rendered = ejs.render(repoTestTemplate, context).trim();
        if (rendered) {
            await fs.writeFile(path.join(targetDir, 'tests', `repository.spec.${ext}`), rendered);
        }
    }
};

export const renderEnvExample = async (templatesDir, targetDir, config) => {
    const { database, dbName, communication, projectName, caching } = config;
    const envPath = path.join(targetDir, '.env.example');
    const envTemplate = await fs.readFile(path.join(templatesDir, 'common', '.env.example.ejs'), 'utf-8');
    
    const envContent = ejs.render(envTemplate, {
        database,
        dbName,
        communication,
        projectName,
        caching
    });
    
    await fs.writeFile(envPath, envContent);
};
