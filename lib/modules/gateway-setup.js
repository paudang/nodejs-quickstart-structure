import fs from 'fs-extra';
import path from 'path';

export const setupApiGateway = async (templatesDir, targetDir, config) => {
    const { apiGateway } = config;
    if (!apiGateway || apiGateway === 'None') return;

    const gatewayName = apiGateway === 'Nginx' ? 'nginx' : 'kong';
    const sourceDir = path.join(templatesDir, 'common', 'gateway', gatewayName);
    const targetGatewayDir = path.join(targetDir, 'deploy', 'gateway');

    if (await fs.pathExists(sourceDir)) {
        await fs.ensureDir(targetGatewayDir);
        await fs.copy(sourceDir, targetGatewayDir);
    }
};
