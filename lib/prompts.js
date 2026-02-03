import inquirer from 'inquirer';

const validateName = (name) => {
    return /^[a-zA-Z0-9-_]+$/.test(name) ? true : 'Project name may only include letters, numbers, underscores and hashes.';
};

export const getProjectDetails = async () => {
    const questions = [
        {
            type: 'input',
            name: 'projectName',
            message: 'Project name:',
            default: 'nodejs-service',
            validate: validateName
        },
        {
            type: 'list',
            name: 'language',
            message: 'Select Language:',
            choices: ['JavaScript', 'TypeScript'],
            default: 'TypeScript'
        },
        {
            type: 'list',
            name: 'architecture',
            message: 'Select Architecture:',
            choices: ['MVC', 'Clean Architecture'],
            default: 'MVC'
        },
        {
            type: 'list',
            name: 'database',
            message: 'Select Database:',
            choices: ['MySQL', 'PostgreSQL'],
            default: 'MySQL'
        },
        {
            type: 'input',
            name: 'dbName',
            message: 'Database Name:',
            default: 'demo',
            validate: validateName
        },
        {
            type: 'list',
            name: 'communication',
            message: 'Microservices Communication:',
            choices: ['REST APIs', 'Kafka'],
            default: 'REST APIs'
        }
    ];

    return inquirer.prompt(questions);
};
