const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const TEST_DIR = path.join(__dirname, '../.terraform_test');
const BIN_PATH = path.join(__dirname, '../bin/index.js');

const testMatrix = [
  { name: 'Standard_MySQL_NoCache', terraform: 'Standard', db: 'MySQL', caching: 'None' },
  { name: 'Standard_PostgreSQL_Redis', terraform: 'Standard', db: 'PostgreSQL', caching: 'Redis' },
  { name: 'Production_MySQL_Redis', terraform: 'Production', db: 'MySQL', caching: 'Redis' },
  { name: 'Production_PostgreSQL_NoCache', terraform: 'Production', db: 'PostgreSQL', caching: 'None' }
];

async function runTests() {
  console.log('🚀 Starting Terraform Matrix Validation...\n');

  if (!fs.existsSync(TEST_DIR)) fs.mkdirSync(TEST_DIR);

  for (const test of testMatrix) {
    console.log(`Testing Case: [${test.name}]`);
    
    try {
      execSync(`node ${BIN_PATH} init -n "${test.name}" -l "TypeScript" -a "MVC" --view-engine "Pug" -d "${test.db}" --db-name "demo" -c "REST APIs" --caching "${test.caching}" --ci-provider "GitHub Actions" --auth "None" --terraform "${test.terraform}" --no-include-security --advanced-options`, { cwd: TEST_DIR, stdio: 'inherit' });
      
      const terraformDir = path.join(TEST_DIR, test.name, 'terraform');
      execSync('terraform init -backend=false', { cwd: terraformDir, stdio: 'inherit' });
      execSync('terraform validate', { cwd: terraformDir, stdio: 'inherit' });
      
      console.log(`  ✨ [${test.name}] Validation: PASS\n`);
    } catch (error) {
      console.error(`  ❌ Failed at Case: ${test.name}`);
      process.exit(1);
    }
  }

  console.log('✅ ALL CRITICAL COMBINATIONS PASSED VALIDATION!');
}

runTests();
