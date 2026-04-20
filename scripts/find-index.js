import { combinations } from './lib/validation-core.js';

const target1 = {
    language: 'JavaScript',
    architecture: 'MVC',
    viewEngine: 'None',
    database: 'MySQL',
    communication: 'GraphQL',
    caching: 'Redis',
    auth: ['None']
};

const target2 = {
    language: 'JavaScript',
    architecture: 'MVC',
    viewEngine: 'None',
    database: 'MySQL',
    communication: 'GraphQL',
    caching: 'Redis',
    auth: ['JWT']
};

const target3 = {
    language: 'TypeScript',
    architecture: 'Clean Architecture',
    database: 'PostgreSQL',
    communication: 'REST APIs',
    caching: 'None',
    auth: ['None']
};

const target4 = {
    language: 'TypeScript',
    architecture: 'Clean Architecture',
    database: 'PostgreSQL',
    communication: 'REST APIs',
    caching: 'None',
    auth: ['JWT']
};

const findIndex = (t) => combinations.findIndex(c => 
    c.language === t.language &&
    c.architecture === t.architecture &&
    c.viewEngine === t.viewEngine &&
    c.database === t.database &&
    c.communication === t.communication &&
    c.caching === t.caching &&
    JSON.stringify(c.auth) === JSON.stringify(t.auth)
);

console.log(`Test 1 (MVC JS NoneAuth): ${findIndex(target1)}`);
console.log(`Test 2 (MVC JS Auth): ${findIndex(target2)}`);
console.log(`Test 3 (Clean TS NoneAuth): ${findIndex(target3)}`);
console.log(`Test 4 (Clean TS Auth): ${findIndex(target4)}`);
