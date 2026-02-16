
import { combinations } from './lib/validation-core.js';

const targetName = 'test_clean_javascript_mysql_restapis_redis';
const index = combinations.findIndex(c => c.projectName === targetName);

if (index !== -1) {
    console.log(`Index for ${targetName}: ${index}`);
} else {
    console.log(`Project ${targetName} not found`);
}
