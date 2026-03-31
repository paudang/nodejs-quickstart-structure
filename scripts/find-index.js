import { combinations } from './lib/validation-core.js';

const target = {
    language: 'TypeScript',
    architecture: 'Clean Architecture',
    database: 'PostgreSQL',
    communication: 'Kafka',
    caching: 'Redis'
};

const index = combinations.findIndex(c => 
    c.language === target.language &&
    c.architecture === target.architecture &&
    c.database === target.database &&
    c.communication === target.communication &&
    c.caching === target.caching
);

console.log(`Target Index: ${index}`);
console.log('Target Config:', JSON.stringify(combinations[index], null, 2));
