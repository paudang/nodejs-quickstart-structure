import fs from 'fs-extra';
import path from 'path';
import ejs from 'ejs';

export const setupAuth = async (templatesDir, targetDir, config) => {
    const { auth, architecture, language, communication, viewEngine } = config;
    if (!auth || auth.includes('None') || !auth.includes('JWT')) return;

    const langExt = language === 'TypeScript' ? 'ts' : 'js';
    const authSource = path.join(templatesDir, 'common', 'auth', langExt);
    const viewsSource = path.join(templatesDir, 'common', 'views');

    // 1. JWT Service
    await renderAuthComponent(authSource, targetDir, 'services', `jwtService.${langExt}`, config);

    if (config.socialAuth && config.socialAuth.filter(a => a !== 'None').length > 0) {
        await renderAuthComponent(authSource, targetDir, 'services', `socialAuthService.${langExt}`, config);
    }

    // 2. Auth Middleware
    await renderAuthComponent(authSource, targetDir, 'middleware', `authMiddleware.${langExt}`, config);

    // 3. Auth Controller (Login only)
    await renderAuthComponent(authSource, targetDir, 'controllers', `authController.${langExt}`, config);

    // 4. Auth Routes
    await renderAuthComponent(authSource, targetDir, 'routes', `authRoutes.${langExt}`, config);

    // 5. Social Login Use Case (Clean Architecture only)
    if (architecture === 'Clean Architecture' && config.socialAuth && config.socialAuth.filter(a => a !== 'None').length > 0) {
        await renderAuthComponent(authSource, targetDir, 'usecases', `SocialLoginUseCase.${langExt}`, config);
    }

    // 6. MVC Views (if applicable)
    if (architecture === 'MVC' && viewEngine && viewEngine !== 'None') {
        const engine = viewEngine.toLowerCase();
        const views = ['login', 'signup'];
        for (const view of views) {
            const viewTemplate = path.join(viewsSource, engine, `${view}.${engine}.ejs`);
            if (await fs.pathExists(viewTemplate)) {
                const content = ejs.render(await fs.readFile(viewTemplate, 'utf-8'), config);
                const destPath = path.join(targetDir, 'src', 'views', `${view}.${engine}`);
                await fs.ensureDir(path.dirname(destPath));
                await fs.writeFile(destPath, content);
            }
        }
    }

    // 7. Restructuring for Clean Architecture
    if (architecture === 'Clean Architecture') {
        await restructureAuthForCleanArch(targetDir, langExt);
    }
};

async function renderAuthComponent(authSource, targetDir, subDir, fileName, config) {
    const templatePath = path.join(authSource, subDir, `${fileName}.ejs`);
    if (await fs.pathExists(templatePath)) {
        const content = ejs.render(await fs.readFile(templatePath, 'utf-8'), config);
        const destPath = path.join(targetDir, 'src', subDir, fileName);
        await fs.ensureDir(path.dirname(destPath));
        await fs.writeFile(destPath, content);
        
        // Render Spec
        const specName = fileName.replace(`.${config.language === 'TypeScript' ? 'ts' : 'js'}`, `.spec.${config.language === 'TypeScript' ? 'ts' : 'js'}`);
        const specTemplate = path.join(authSource, subDir, `${specName}.ejs`);
        if (await fs.pathExists(specTemplate)) {
            const specContent = ejs.render(await fs.readFile(specTemplate, 'utf-8'), config);
            const testDir = path.join(targetDir, 'tests', 'unit', subDir);
            await fs.ensureDir(testDir);
            await fs.writeFile(path.join(testDir, specName), specContent);
        }
    }
}

async function restructureAuthForCleanArch(targetDir, ext) {
    // Services -> Infrastructure/Auth
    await fs.ensureDir(path.join(targetDir, 'src/infrastructure/auth'));
    await fs.ensureDir(path.join(targetDir, 'tests/unit/infrastructure/auth'));
    if (await fs.pathExists(path.join(targetDir, `src/services/jwtService.${ext}`))) {
        await fs.move(
            path.join(targetDir, `src/services/jwtService.${ext}`),
            path.join(targetDir, `src/infrastructure/auth/jwtService.${ext}`),
            { overwrite: true }
        );
        if (await fs.pathExists(path.join(targetDir, `tests/unit/services/jwtService.spec.${ext}`))) {
            await fs.move(
                path.join(targetDir, `tests/unit/services/jwtService.spec.${ext}`),
                path.join(targetDir, `tests/unit/infrastructure/auth/jwtService.spec.${ext}`),
                { overwrite: true }
            );
        }
    }

    if (await fs.pathExists(path.join(targetDir, `src/services/socialAuthService.${ext}`))) {
        await fs.move(
            path.join(targetDir, `src/services/socialAuthService.${ext}`),
            path.join(targetDir, `src/infrastructure/auth/socialAuthService.${ext}`),
            { overwrite: true }
        );
        if (await fs.pathExists(path.join(targetDir, `tests/unit/services/socialAuthService.spec.${ext}`))) {
            await fs.move(
                path.join(targetDir, `tests/unit/services/socialAuthService.spec.${ext}`),
                path.join(targetDir, `tests/unit/infrastructure/auth/socialAuthService.spec.${ext}`),
                { overwrite: true }
            );
        }
    }

    // Controllers -> Interfaces/Controllers/auth
    await fs.ensureDir(path.join(targetDir, 'src/interfaces/controllers/auth'));
    await fs.ensureDir(path.join(targetDir, 'tests/unit/interfaces/controllers/auth'));
    if (await fs.pathExists(path.join(targetDir, `src/controllers/authController.${ext}`))) {
        await fs.move(
            path.join(targetDir, `src/controllers/authController.${ext}`),
            path.join(targetDir, `src/interfaces/controllers/auth/authController.${ext}`),
            { overwrite: true }
        );
        if (await fs.pathExists(path.join(targetDir, `tests/unit/controllers/authController.spec.${ext}`))) {
            await fs.move(
                path.join(targetDir, `tests/unit/controllers/authController.spec.${ext}`),
                path.join(targetDir, `tests/unit/interfaces/controllers/auth/authController.spec.${ext}`),
                { overwrite: true }
            );
        }
    }

    // Middleware -> Infrastructure/Webserver/Middleware
    await fs.ensureDir(path.join(targetDir, 'src/infrastructure/webserver/middleware'));
    await fs.ensureDir(path.join(targetDir, 'tests/unit/infrastructure/webserver/middleware'));
    if (await fs.pathExists(path.join(targetDir, `src/middleware/authMiddleware.${ext}`))) {
        await fs.move(
            path.join(targetDir, `src/middleware/authMiddleware.${ext}`),
            path.join(targetDir, `src/infrastructure/webserver/middleware/authMiddleware.${ext}`),
            { overwrite: true }
        );
        if (await fs.pathExists(path.join(targetDir, `tests/unit/middleware/authMiddleware.spec.${ext}`))) {
            await fs.move(
                path.join(targetDir, `tests/unit/middleware/authMiddleware.spec.${ext}`),
                path.join(targetDir, `tests/unit/infrastructure/webserver/middleware/authMiddleware.spec.${ext}`),
                { overwrite: true }
            );
        }
    }

    // Routes -> Interfaces/Routes (No unit tests for routes normally, but move if exists)
    await fs.ensureDir(path.join(targetDir, 'src/interfaces/routes'));
    if (await fs.pathExists(path.join(targetDir, `src/routes/authRoutes.${ext}`))) {
        await fs.move(
            path.join(targetDir, `src/routes/authRoutes.${ext}`),
            path.join(targetDir, `src/interfaces/routes/authRoutes.${ext}`),
            { overwrite: true }
        );
    }

    // UseCases -> Domain/UseCases/auth
    await fs.ensureDir(path.join(targetDir, 'src/domain/usecases/auth'));
    await fs.ensureDir(path.join(targetDir, 'tests/unit/domain/usecases/auth'));
    if (await fs.pathExists(path.join(targetDir, `src/usecases/SocialLoginUseCase.${ext}`))) {
        await fs.move(
            path.join(targetDir, `src/usecases/SocialLoginUseCase.${ext}`),
            path.join(targetDir, `src/domain/usecases/auth/SocialLoginUseCase.${ext}`),
            { overwrite: true }
        );
        if (await fs.pathExists(path.join(targetDir, `tests/unit/usecases/SocialLoginUseCase.spec.${ext}`))) {
            await fs.move(
                path.join(targetDir, `tests/unit/usecases/SocialLoginUseCase.spec.${ext}`),
                path.join(targetDir, `tests/unit/domain/usecases/auth/SocialLoginUseCase.spec.${ext}`),
                { overwrite: true }
            );
        }
    }

    // Cleanup empty dirs in src and tests/unit
    const dirsToCleanup = [
        'src/services', 'src/controllers', 'src/middleware', 'src/routes', 'src/usecases',
        'tests/unit/services', 'tests/unit/controllers', 'tests/unit/middleware', 'tests/unit/usecases'
    ];
    for (const dir of dirsToCleanup) {
        const fullDir = path.join(targetDir, dir);
        if (await fs.pathExists(fullDir) && (await fs.readdir(fullDir)).length === 0) {
            await fs.remove(fullDir);
        }
    }
}

