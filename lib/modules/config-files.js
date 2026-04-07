import fs from 'fs-extra';
import path from 'path';
import ejs from 'ejs';

export const renderPackageJson = async (templatesDir, targetDir, config) => {
    const packageJsonPath = path.join(targetDir, 'package.json');
    const packageTemplate = await fs.readFile(path.join(templatesDir, 'common', 'package.json.ejs'), 'utf-8');
    const packageContent = ejs.render(packageTemplate, { ...config });
    await fs.writeFile(packageJsonPath, packageContent);
};

export const renderDockerCompose = async (templatesDir, targetDir, config) => {
    const dockerComposePath = path.join(targetDir, 'docker-compose.yml');
    const dockerTemplate = await fs.readFile(path.join(templatesDir, 'common', 'docker-compose.yml.ejs'), 'utf-8');
    const dockerContent = ejs.render(dockerTemplate, { ...config });
    await fs.writeFile(dockerComposePath, dockerContent);
};

export const renderReadme = async (templatesDir, targetDir, config) => {
    const readmePath = path.join(targetDir, 'README.md');
    const readmeTemplate = await fs.readFile(path.join(templatesDir, 'common', 'README.md.ejs'), 'utf-8');
    const readmeContent = ejs.render(readmeTemplate, { ...config });
    await fs.writeFile(readmePath, readmeContent);
};

export const renderDockerfile = async (templatesDir, targetDir, config) => {
    const dockerfileTemplate = await fs.readFile(path.join(templatesDir, 'common', 'Dockerfile'), 'utf-8');
    const dockerfileContent = ejs.render(dockerfileTemplate, { ...config });
    await fs.writeFile(path.join(targetDir, 'Dockerfile'), dockerfileContent);
};

export const renderPm2Config = async (templatesDir, targetDir, config) => {
    const pm2ConfigPath = path.join(targetDir, 'ecosystem.config.js');
    const pm2Template = await fs.readFile(path.join(templatesDir, 'common', 'ecosystem.config.js.ejs'), 'utf-8');
    const pm2Content = ejs.render(pm2Template, { ...config });
    await fs.writeFile(pm2ConfigPath, pm2Content);
};

export const renderProfessionalConfig = async (templatesDir, targetDir, config) => {
    const eslintTemplate = await fs.readFile(path.join(templatesDir, 'common', 'eslint.config.mjs.ejs'), 'utf-8');
    const eslintContent = ejs.render(eslintTemplate, { ...config });
    await fs.writeFile(path.join(targetDir, 'eslint.config.mjs'), eslintContent);

    await fs.copy(path.join(templatesDir, 'common', '.prettierrc'), path.join(targetDir, '.prettierrc'));
    await fs.copy(path.join(templatesDir, 'common', '.lintstagedrc'), path.join(targetDir, '.lintstagedrc'));

    const jestTemplate = await fs.readFile(path.join(templatesDir, 'common', 'jest.config.js.ejs'), 'utf-8');
    const jestContent = ejs.render(jestTemplate, { ...config });
    await fs.writeFile(path.join(targetDir, 'jest.config.js'), jestContent);
    
    // E2E Config
    const jestE2eTemplate = await fs.readFile(path.join(templatesDir, 'common', 'jest.e2e.config.js.ejs'), 'utf-8');
    const jestE2eContent = ejs.render(jestE2eTemplate, { ...config });
    await fs.writeFile(path.join(targetDir, 'jest.e2e.config.js'), jestE2eContent);

    // 1. Setup Husky pre-commit (Always for Professional Standard)
    const huskyDir = path.join(targetDir, '.husky');
    await fs.ensureDir(huskyDir);
    await fs.copy(path.join(templatesDir, 'common', '_husky', 'pre-commit'), path.join(huskyDir, 'pre-commit'));

    // 2. Enterprise Security Hardening (Optional)
    if (config.includeSecurity) {
        await fs.copy(path.join(templatesDir, 'common', 'SECURITY.md'), path.join(targetDir, 'SECURITY.md'));
        
        const sonarTemplate = await fs.readFile(path.join(templatesDir, 'common', 'sonar-project.properties.ejs'), 'utf-8');
        const sonarContent = ejs.render(sonarTemplate, { ...config });
        await fs.writeFile(path.join(targetDir, 'sonar-project.properties'), sonarContent);

        const snykTemplate = await fs.readFile(path.join(templatesDir, 'common', '.snyk.ejs'), 'utf-8');
        const snykContent = ejs.render(snykTemplate, { ...config });
        await fs.writeFile(path.join(targetDir, '.snyk'), snykContent);
    }
};

export const renderAiNativeFiles = async (templatesDir, targetDir, config) => {
    // 1. .cursorrules
    const cursorRulesPath = path.join(targetDir, '.cursorrules');
    const cursorRulesTemplate = await fs.readFile(path.join(templatesDir, 'common', '.cursorrules.ejs'), 'utf-8');
    const cursorRulesContent = ejs.render(cursorRulesTemplate, { ...config });
    await fs.writeFile(cursorRulesPath, cursorRulesContent);

    // 2. prompts/
    const promptsDirTarget = path.join(targetDir, 'prompts');
    await fs.ensureDir(promptsDirTarget);
    
    const promptsSourceDir = path.join(templatesDir, 'common', 'prompts');
    const promptFiles = await fs.readdir(promptsSourceDir);
    
    for (const file of promptFiles) {
        if (file.endsWith('.ejs')) {
            const templatePath = path.join(promptsSourceDir, file);
            const targetFilePath = path.join(promptsDirTarget, file.replace('.ejs', ''));
            const templateContent = await fs.readFile(templatePath, 'utf-8');
            const renderedContent = ejs.render(templateContent, { ...config });
            await fs.writeFile(targetFilePath, renderedContent);
        }
    }
};

export const setupCiCd = async (templatesDir, targetDir, config) => {
    const { ciProvider, includeSecurity } = config;
    if (ciProvider === 'GitHub Actions') {
        const workflowsDir = path.join(targetDir, '.github/workflows');
        await fs.ensureDir(workflowsDir);
        
        const ciTemplate = await fs.readFile(path.join(templatesDir, 'common', '_github/workflows/ci.yml.ejs'), 'utf-8');
        const ciContent = ejs.render(ciTemplate, { ...config });
        await fs.writeFile(path.join(workflowsDir, 'ci.yml'), ciContent);
        
        if (includeSecurity) {
            const securityTemplate = await fs.readFile(path.join(templatesDir, 'common', '_github/workflows/security.yml.ejs'), 'utf-8');
            const securityContent = ejs.render(securityTemplate, { ...config });
            await fs.writeFile(path.join(workflowsDir, 'security.yml'), securityContent);
        }
    } else if (ciProvider === 'Jenkins') {
        const jenkinsTemplate = await fs.readFile(path.join(templatesDir, 'common', 'Jenkinsfile.ejs'), 'utf-8');
        const jenkinsContent = ejs.render(jenkinsTemplate, { ...config });
        await fs.writeFile(path.join(targetDir, 'Jenkinsfile'), jenkinsContent);
    } else if (ciProvider === 'GitLab CI') {
        const gitlabTemplate = await fs.readFile(path.join(templatesDir, 'common', '.gitlab-ci.yml.ejs'), 'utf-8');
        const gitlabContent = ejs.render(gitlabTemplate, { ...config });
        await fs.writeFile(path.join(targetDir, '.gitlab-ci.yml'), gitlabContent);
    } else if (ciProvider === 'Bitbucket Pipelines') {
        const bitbucketTemplate = await fs.readFile(path.join(templatesDir, 'common', 'bitbucket-pipelines.yml.ejs'), 'utf-8');
        const bitbucketContent = ejs.render(bitbucketTemplate, { ...config });
        await fs.writeFile(path.join(targetDir, 'bitbucket-pipelines.yml'), bitbucketContent);
    } else if (ciProvider === 'CircleCI') {
        const circleCiDir = path.join(targetDir, '.circleci');
        await fs.ensureDir(circleCiDir);
        const circleCiTemplate = await fs.readFile(path.join(templatesDir, 'common', '_circleci/config.yml.ejs'), 'utf-8');
        const circleCiContent = ejs.render(circleCiTemplate, { ...config });
        await fs.writeFile(path.join(circleCiDir, 'config.yml'), circleCiContent);
    }
};

export const renderTestSample = async (templatesDir, targetDir, config) => {
    await fs.ensureDir(path.join(targetDir, 'tests'));
    if (config.language === 'TypeScript') {
        const testsTsConfig = {
            "extends": "../tsconfig.json",
            "compilerOptions": {
                "types": ["jest", "node"],
                "rootDir": "..",
                "noEmit": true
            },
            "include": ["**/*.ts", "../src/**/*.ts"]
        };
        await fs.writeFile(path.join(targetDir, 'tests', 'tsconfig.json'), JSON.stringify(testsTsConfig, null, 4));
    }
};

export const renderEnvExample = async (templatesDir, targetDir, config) => {
    const envExamplePath = path.join(targetDir, '.env.example');
    const envPath = path.join(targetDir, '.env');
    const envTemplate = await fs.readFile(path.join(templatesDir, 'common', '.env.example.ejs'), 'utf-8');
    
    const envContent = ejs.render(envTemplate, { ...config });
    
    await fs.writeFile(envExamplePath, envContent);
    await fs.writeFile(envPath, envContent);
};
