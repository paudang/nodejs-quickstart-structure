import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEMPLATE_PATH = path.join(__dirname, '../templates/common/package.json.ejs');

async function extractDependencies() {
    try {
        const templateContent = fs.readFileSync(TEMPLATE_PATH, 'utf-8');
        
        // Strip EJS template blocks and clean trailing commas to allow valid JSON parsing
        const cleanedContent = templateContent
            .replace(/<%[\s\S]*?%>/g, '')
            .replace(/,\s*([\}\]])/g, '$1');

        const parsed = JSON.parse(cleanedContent);

        const dummyPackage = {
            name: "template-audit-dummy",
            version: "1.0.0",
            private: true,
            description: "Dummy package for automatically auditing templates/common/package.json.ejs",
            dependencies: parsed.dependencies || {},
            devDependencies: parsed.devDependencies || {},
            overrides: parsed.overrides || undefined
        };

        const outputPath = process.argv[2] || 'audit-package.json';
        const dir = path.dirname(outputPath);
        if (dir && !fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(outputPath, JSON.stringify(dummyPackage, null, 2), 'utf-8');
        console.log(`Dependencies extracted successfully to ${outputPath}`);

    } catch (error) {
        console.error("Failed to parse template dependencies:", error);
        process.exit(1);
    }
}

extractDependencies();
