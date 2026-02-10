import { runTest, combinations } from './lib/validation-core.js';

// We want to test one of each:
// 1. MVC JS
// 2. MVC TS
// 3. Clean JS
// 4. Clean TS

// Helper to find index
function findIndex(arch, lang) {
    return combinations.findIndex(c => c.architecture === arch && c.language === lang && c.database === 'MySQL' && c.communication === 'REST APIs');
}

const targetIndices = [
    findIndex('MVC', 'JavaScript'),
    findIndex('MVC', 'TypeScript'),
    findIndex('Clean Architecture', 'JavaScript'),
    findIndex('Clean Architecture', 'TypeScript')
].filter(i => i !== -1);

console.log('Running logging verification for indices:', targetIndices);

async function runTargetedTests() {
  const sharedPorts = new Set();
  const results = [];

  for (const index of targetIndices) {
    const config = combinations[index];
    console.log(`\n---------------------------------------------------------`);
    console.log(`Starting Verification for Test ${index}: ${config.projectName}`);
    console.log(`---------------------------------------------------------`);
    
    try {
      // Run with Docker to verify app starts up correctly with new logging config
      const result = await runTest(config, index, { skipDocker: false }, sharedPorts); 
      if (!result.success) {
        console.error(`FAILED: ${config.projectName}`);
        results.push({ name: config.projectName, status: 'FAILED', error: result.error });
      } else {
        console.log(`PASSED: ${config.projectName}`);
        results.push({ name: config.projectName, status: 'PASSED' });
      }
    } catch (e) {
      console.error(`ERROR in harness: ${e.message}`);
      results.push({ name: config.projectName, status: 'ERROR', error: e.message });
    }
  }

  console.log('\n=== Verification Summary ===');
  results.forEach(r => console.log(`${r.status}: ${r.name} ${r.error ? `(${r.error})` : ''}`));
  
  if (results.some(r => r.status !== 'PASSED')) {
    process.exit(1);
  }
}

runTargetedTests();
