
import { combinations } from './lib/validation-core.js';

const target1 = 'test_clean_javascript_mysql_restapis_memorycache';
const target2 = 'test_mvc_typescript_none_mongodb_restapis_redis';

console.log('Target 1 (' + target1 + '): ' + combinations.findIndex(c => c.projectName === target1));
console.log('Target 2 (' + target2 + '): ' + combinations.findIndex(c => c.projectName === target2));

