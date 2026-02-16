import path from 'path';
import { fileURLToPath } from 'url';
import { setupProjectDirectory, copyBaseStructure, copyCommonFiles } from './modules/project-setup.js';
import { renderPackageJson, renderDockerCompose, renderReadme, renderDockerfile, renderProfessionalConfig, setupCiCd, renderTestSample, renderEnvExample } from './modules/config-files.js';
import { renderIndexFile, renderDynamicComponents, renderSwaggerConfig, setupViews as setupSrcViews } from './modules/app-setup.js';
import { setupDatabase } from './modules/database-setup.js';
import { setupKafka, setupViews } from './modules/kafka-setup.js';
import { setupCaching } from './modules/caching-setup.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generateProject = async (config) => {
    const { projectName, architecture, language } = config;
    const targetDir = path.resolve(process.cwd(), projectName);
    const templatesDir = path.join(__dirname, '../templates');

    // 1. Create project directory
    await setupProjectDirectory(targetDir, projectName);

    // 2. Select & Copy Base Structure
    const { templatePath } = await copyBaseStructure(templatesDir, targetDir, architecture, language);

    // 3. Render package.json
    await renderPackageJson(templatesDir, targetDir, config);

    // 4. Render docker-compose.yml
    await renderDockerCompose(templatesDir, targetDir, config);

    // 5. Render README.md
    await renderReadme(templatesDir, targetDir, config);

    // 6. Render index file (ts/js)
    await renderIndexFile(templatePath, targetDir, config);

    // 7. Render Dynamic Components (Controllers/Repos/Server)
    await renderDynamicComponents(templatePath, targetDir, config);

    // 8. Kafka Setup
    await setupKafka(templatesDir, targetDir, config);

    // 9. Common Files (.gitignore, Dockerfile, tsconfig)
    await copyCommonFiles(templatesDir, targetDir, language);
    await renderDockerfile(templatesDir, targetDir, config);

    // 10. Database Setup (Migrations, Config, Models)
    // Note: logic for detailed view copying is also handled nicely if we ensure setupDatabase checks correctly,
    // or we can move strict view logic to setupViews. 
    // In strict refactor, database-setup handles the content that was in the DB block.
    await setupDatabase(templatesDir, targetDir, config);

    // 10a. Caching Setup
    await setupCaching(templatesDir, targetDir, config);

    // 11. View Engine Public Assets (MVC)
    await setupViews(templatesDir, targetDir, config);
    // Copy src/views (MVC)
    await setupSrcViews(templatesDir, targetDir, config);

    // 12. Swagger Config
    await renderSwaggerConfig(targetDir, config);

    // 13. Professional Config & Tests
    await renderProfessionalConfig(templatesDir, targetDir, language);
    await renderTestSample(templatesDir, targetDir, language);

    // 14. CI/CD
    await setupCiCd(templatesDir, targetDir, config);

    // 15. Env Example
    await renderEnvExample(templatesDir, targetDir, config);

    console.log(`
      ====================================================
             Node.js Project Created Successfully!
      ====================================================

      Project: ${projectName}
      Architecture: ${architecture}
      Language: ${language}
      Database: ${config.database}
      Communication: ${config.communication}${config.caching && config.caching === 'Redis' ? `\n      Caching: ${config.caching}` : ''}

      ----------------------------------------------------
      ✨  High-Quality Standards Applied:
      ----------------------------------------------------
      ✅  Linting & Formatting: Eslint + Prettier configured
      ✅  Git Hooks: Husky + Lint-Staged ready
      ✅  Security: Helmet, CORS, Rate-Limiting added
      ✅  Testing: Jest setup for Unit/Integration tests
      ✅  Docker: Production-ready multi-stage build
      ${config.ciProvider !== 'None' ? `✅  CI/CD: ${config.ciProvider} Workflow ready` : '❌  CI/CD: Skipped (User preferred)'}

      ----------------------------------------------------
      👉  Next Steps:
      ----------------------------------------------------
      1. cd ${projectName}
      2. git init
      3. npm install
      4. npm run prepare      (To setup Husky hooks)
      5. docker-compose up -d (To start DB/Infrastructure)
      6. npm run dev          (To start development server)
      7. npm test             (To run tests)
    `);
};
