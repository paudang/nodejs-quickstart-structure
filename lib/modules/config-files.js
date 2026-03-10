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
};

export const setupCiCd = async (templatesDir, targetDir, config) => {
    const { ciProvider } = config;
    if (ciProvider === 'GitHub Actions') {
        await fs.ensureDir(path.join(targetDir, '.github/workflows'));
        await fs.copy(path.join(templatesDir, 'common', '_github/workflows/ci.yml'), path.join(targetDir, '.github/workflows/ci.yml'));
    } else if (ciProvider === 'Jenkins') {
        const jenkinsTemplate = await fs.readFile(path.join(templatesDir, 'common', 'Jenkinsfile.ejs'), 'utf-8');
        const jenkinsContent = ejs.render(jenkinsTemplate, { ...config });
        await fs.writeFile(path.join(targetDir, 'Jenkinsfile'), jenkinsContent);
    } else if (ciProvider === 'GitLab CI') {
        const gitlabTemplate = await fs.readFile(path.join(templatesDir, 'common', '.gitlab-ci.yml.ejs'), 'utf-8');
        const gitlabContent = ejs.render(gitlabTemplate, { ...config });
        await fs.writeFile(path.join(targetDir, '.gitlab-ci.yml'), gitlabContent);
    }
};

export const renderTestSample = async (templatesDir, targetDir, config) => {
    await fs.ensureDir(path.join(targetDir, 'tests'));
};

export const renderEnvExample = async (templatesDir, targetDir, config) => {
    const envExamplePath = path.join(targetDir, '.env.example');
    const envPath = path.join(targetDir, '.env');
    const envTemplate = await fs.readFile(path.join(templatesDir, 'common', '.env.example.ejs'), 'utf-8');
    
    const envContent = ejs.render(envTemplate, { ...config });
    
    await fs.writeFile(envExamplePath, envContent);
    await fs.writeFile(envPath, envContent);
};
