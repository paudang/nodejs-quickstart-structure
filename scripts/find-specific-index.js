import { combinations } from './lib/validation-core.js';

const target = {
    architecture: 'MVC',
    language: 'TypeScript',
    viewEngine: 'EJS',
    database: 'None',
    communication: 'REST APIs',
    caching: 'None',
    auth: ['JWT']
};

const index = combinations.findIndex(c => 
    c.architecture === target.architecture &&
    c.language === target.language &&
    c.viewEngine === target.viewEngine &&
    c.database === target.database &&
    c.communication === target.communication &&
    c.caching === target.caching &&
    JSON.stringify(c.auth) === JSON.stringify(target.auth)
);

console.log('Index:', index);
