import path from 'path';
import fs from 'fs-extra';
import chalk from 'chalk';

export const setupTerraform = async (templatesDir, targetDir, config) => {
    const { terraform, projectName } = config;

    if (!terraform || terraform === 'None') {
        return;
    }

    const terraformSourceDir = path.join(templatesDir, 'common/terraform');
    const terraformTargetDir = path.join(targetDir, 'terraform');

    try {
        // Ensure the source directory exists
        if (!(await fs.pathExists(terraformSourceDir))) {
            console.warn(chalk.yellow(`\n⚠️  Terraform templates not found at ${terraformSourceDir}. Skipping...`));
            return;
        }

        // Create target directory
        await fs.ensureDir(terraformTargetDir);

        // Copy everything first
        await fs.copy(terraformSourceDir, terraformTargetDir);

        // --- Customization ---

        // 1. Customize variables.tf
        const variablesPath = path.join(terraformTargetDir, 'variables.tf');
        if (await fs.pathExists(variablesPath)) {
            let content = await fs.readFile(variablesPath, 'utf8');
            content = content.replace(/default\s*=\s*"nodejs-quickstart"/, `default = "${projectName}"`);
            
            // Map database engine
            if (config.database === 'PostgreSQL') {
                content = content.replace(/variable "db_engine" {[\s\S]*?default\s*=\s*"mysql"/, 'variable "db_engine" {\n  description = "Database engine (mysql or postgres)"\n  default     = "postgres"');
            } else if (config.database === 'MySQL') {
                content = content.replace(/default\s*=\s*"myappdb"/, `default = "${config.dbName || 'demo'}"`);
            }

            // Set is_production flag
            if (terraform === 'Production') {
                content = content.replace(/variable "is_production" \{[\s\S]*?default\s*=\s*false/, 'variable "is_production" {\n  description = "Enable production-grade features (Multi-AZ, WAF, Scaling)"\n  type        = bool\n  default     = true');
            }
            
            await fs.writeFile(variablesPath, content);
        }

        // 2. Handle Database "None" case
        if (config.database === 'None') {
            // REMOVE database module call from main.tf
            const mainTfPath = path.join(terraformTargetDir, 'main.tf');
            if (await fs.pathExists(mainTfPath)) {
                let content = await fs.readFile(mainTfPath, 'utf8');
                // Remove the database module block entirely (from comment to closing brace)
                content = content.replace(/# --- Data Layer \(RDS Isolated\) ---[\s\S]*?module "database" \{[\s\S]*?\}\n/g, '');
                await fs.writeFile(mainTfPath, content);
            }

            // REMOVE database outputs from outputs.tf
            const outputsTfPath = path.join(terraformTargetDir, 'outputs.tf');
            if (await fs.pathExists(outputsTfPath)) {
                let content = await fs.readFile(outputsTfPath, 'utf8');
                // Remove individual database outputs
                content = content.replace(/output "database_[\s\S]*?\}\n/g, '');
                await fs.writeFile(outputsTfPath, content);
            }

            // DELETE the database module folder
            const dbModuleDir = path.join(terraformTargetDir, 'modules/database');
            if (await fs.pathExists(dbModuleDir)) {
                await fs.remove(dbModuleDir);
            }
        }

        // 3. Handle Caching case (Delete if NOT Redis)
        if (config.caching !== 'Redis') {
            // REMOVE cache module call from main.tf
            const mainTfPath = path.join(terraformTargetDir, 'main.tf');
            if (await fs.pathExists(mainTfPath)) {
                let content = await fs.readFile(mainTfPath, 'utf8');
                // Remove the cache module block entirely
                content = content.replace(/# --- Cache Layer \(Redis ElastiCache\) ---[\s\S]*?module "cache" \{[\s\S]*?\}\n/g, '');
                await fs.writeFile(mainTfPath, content);
            }

            // REMOVE redis output from outputs.tf
            const outputsTfPath = path.join(terraformTargetDir, 'outputs.tf');
            if (await fs.pathExists(outputsTfPath)) {
                let content = await fs.readFile(outputsTfPath, 'utf8');
                content = content.replace(/output "redis_endpoint" \{[\s\S]*?\}\n/g, '');
                await fs.writeFile(outputsTfPath, content);
            }

            // DELETE the cache module folder
            const cacheModuleDir = path.join(terraformTargetDir, 'modules/cache');
            if (await fs.pathExists(cacheModuleDir)) {
                await fs.remove(cacheModuleDir);
            }
        }
        // If caching IS Redis, it's already uncommented in the template, so no action needed here.

        // 4. Customize Compute module based on language
        const computeMainPath = path.join(terraformTargetDir, 'modules/compute/main.tf');
        if (await fs.pathExists(computeMainPath)) {
            let content = await fs.readFile(computeMainPath, 'utf8');
            const startHint = config.language === 'TypeScript' 
                ? 'npm run build && node dist/index.js' 
                : 'node src/index.js';
            
            content = content.replace(/# docker run -d -p 3000:3000 my-node-app:latest/, 
                `# For ${config.language}: ${startHint}\n              # docker run -d -p 3000:3000 my-node-app:latest`);
            await fs.writeFile(computeMainPath, content);
        }

        // 5. Handle "Standard" tier (Optional: disable WAF for cost)
        if (terraform === 'Standard') {
            const mainTfPath = path.join(terraformTargetDir, 'main.tf');
            if (await fs.pathExists(mainTfPath)) {
                let content = await fs.readFile(mainTfPath, 'utf8');
                // In Standard tier, we might want to tell the security module to skip WAF
                // For now, we'll keep it simple, but we could add a variable 'enable_waf'
            }
        }

    } catch (error) {
        console.error(chalk.red(`\n❌ Error setting up Terraform: ${error.message}`));
    }
};
