import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEMPLATE_PATH = path.join(__dirname, '../templates/common/package.json.ejs');

async function extractDependencies() {
    try {
        const templateContent = fs.readFileSync(TEMPLATE_PATH, 'utf-8');
        
        let deps = {};
        let devDeps = {};
        let overrides = {};
        
        let currentBlock = null;

        const lines = templateContent.split('\n');
        for (let line of lines) {
            line = line.trim();
            if (!line) continue;
            
            // Detect blocks
            if (line.includes('"dependencies": {')) {
                currentBlock = deps;
                continue;
            } else if (line.includes('"devDependencies": {')) {
                currentBlock = devDeps;
                continue;
            } else if (line.includes('"overrides": {')) {
                currentBlock = overrides;
                continue;
            } else if (line.includes('},') || line === '}') {
                if (currentBlock && !line.includes('<%')) { // roughly avoid EJS blocks mimicking an end
                     // We don't strictly reset block if we just hit an EJS end bracket, but for simplicity:
                     // We actually don't even need to strictly reset if we just keep adding to whatever the last block was.
                     // But let's reset to null for safety if it's a structural end.
                }
            }

            // If we are inside a known block, try to extract package mappings
            if (currentBlock) {
                 const pkgMatch = line.match(/"([^"]+)":\s*"([^"]+)"/);
                 if (pkgMatch) {
                     currentBlock[pkgMatch[1]] = pkgMatch[2];
                 }
            }
        }

        const dummyPackage = {
            name: "template-audit-dummy",
            version: "1.0.0",
            private: true,
            description: "Dummy package for automatically auditing templates/common/package.json.ejs",
            dependencies: deps,
            devDependencies: devDeps,
            overrides: Object.keys(overrides).length > 0 ? overrides : undefined
        };

        const outputPath = process.argv[2] || 'audit-package.json';
        fs.writeFileSync(outputPath, JSON.stringify(dummyPackage, null, 2), 'utf-8');
        console.log(`Dependencies extracted successfully to ${outputPath}`);

    } catch (error) {
        console.error("Failed to parse template dependencies:", error);
        process.exit(1);
    }
}

extractDependencies();
