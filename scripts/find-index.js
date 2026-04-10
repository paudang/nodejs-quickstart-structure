import { combinations } from './lib/validation-core.js';

const target = {
    language: 'TypeScript',
    architecture: 'MVC',
    database: 'MySQL',
    communication: 'REST APIs',
    caching: 'None',
    auth: ['JWT']
};

const index = combinations.findIndex(c => 
    c.language === target.language &&
    c.architecture === target.architecture &&
    c.database === target.database &&
    c.communication === target.communication &&
    c.caching === target.caching &&
    JSON.stringify(c.auth) === JSON.stringify(target.auth)
);

console.log(`Target Index: ${index}`);
console.log('Target Config:', JSON.stringify(combinations[index], null, 2));
