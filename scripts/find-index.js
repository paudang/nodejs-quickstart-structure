import { combinations } from './lib/validation-core.js';

const target1 = 'test_mvc_typescript_ejs_mysql_restapis_none';

console.log('Target 1 (' + target1 + '): ' + combinations.findIndex(c => c.projectName === target1));
