import { jest } from '@jest/globals';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import ejs from 'ejs';
import { renderPackageJson, renderDockerCompose } from '../lib/modules/config-files.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mocks are created via spyOn in beforeEach

describe('ELK Stack Integration (Generator Engine)', () => {
    let templatesDir;
    let targetDir;

    beforeEach(() => {
        templatesDir = path.join(__dirname, '../templates');
        targetDir = '/tmp/test-project';
        jest.clearAllMocks();
        
        
        // Spy on fs-extra methods
        jest.spyOn(fs, 'readFile').mockResolvedValue('template content');
        jest.spyOn(fs, 'writeFile').mockResolvedValue(undefined);
        jest.spyOn(fs, 'copy').mockResolvedValue(undefined);
        jest.spyOn(fs, 'ensureDir').mockResolvedValue(undefined);
        jest.spyOn(fs, 'pathExists').mockResolvedValue(true);

        // Mock ejs.render to just return a stringified version of the data for easy assertion
        jest.spyOn(ejs, 'render').mockImplementation((template, data) => JSON.stringify(data));
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('renderPackageJson', () => {
        it('should inject ELK config when withELK is true', async () => {
            const config = { withELK: true };
            await renderPackageJson(templatesDir, targetDir, config);
            
            expect(fs.writeFile).toHaveBeenCalledWith(
                path.join(targetDir, 'package.json'),
                expect.stringContaining('"withELK":true')
            );
        });

        it('should omit Elastic packages when withELK is false', async () => {
            const config = { withELK: false };
            await renderPackageJson(templatesDir, targetDir, config);
            
            expect(fs.writeFile).toHaveBeenCalledWith(
                path.join(targetDir, 'package.json'),
                expect.stringContaining('"withELK":false')
            );
        });
    });

    describe('renderDockerCompose', () => {
        it('should render docker-compose.elk.yml when withELK is true', async () => {
            const config = { withELK: true };
            await renderDockerCompose(templatesDir, targetDir, config);
            
            expect(fs.writeFile).toHaveBeenCalledWith(
                path.join(targetDir, 'docker-compose.elk.yml'),
                expect.any(String)
            );
        });

        it('should completely omit ELK containers when withELK is false', async () => {
            const config = { withELK: false };
            await renderDockerCompose(templatesDir, targetDir, config);
            
            expect(fs.writeFile).not.toHaveBeenCalledWith(
                path.join(targetDir, 'docker-compose.elk.yml'),
                expect.any(String)
            );
        });
    });
});
