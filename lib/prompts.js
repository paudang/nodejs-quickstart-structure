import inquirer from 'inquirer';

const validateName = (name) => {
    return /^[a-zA-Z0-9-_]+$/.test(name) ? true : 'Project name may only include letters, numbers, underscores and hashes.';
};

export const getProjectDetails = async (options = {}) => {
    const questions = [
        {
            type: 'input',
            name: 'projectName',
            message: 'Project name:',
            default: 'nodejs-service',
            validate: validateName,
            when: !options.projectName
        },
        {
            type: 'list',
            name: 'language',
            message: 'Select Language:',
            choices: ['JavaScript', 'TypeScript'],
            default: 'TypeScript',
            when: !options.language
        },
        {
            type: 'list',
            name: 'architecture',
            message: 'Select Architecture:',
            choices: ['MVC', 'Clean Architecture'],
            default: 'MVC',
            when: !options.architecture
        },
        {
            type: 'list',
            name: 'viewEngine',
            message: 'Select View Engine:',
            choices: ['None', 'EJS', 'Pug'],
            when: (answers) => (options.architecture || answers.architecture) === 'MVC' && !options.viewEngine,
            default: 'None'
        },
        {
            type: 'list',
            name: 'database',
            message: 'Select Database:',
            choices: ['MySQL', 'PostgreSQL', 'MongoDB'],
            default: 'MySQL',
            when: !options.database
        },
        {
            type: 'input',
            name: 'dbName',
            message: 'Database Name:',
            default: 'demo',
            validate: validateName,
            when: !options.dbName
        },
        {
            type: 'list',
            name: 'communication',
            message: 'Microservices Communication:',
            choices: ['REST APIs', 'Kafka'],
            default: 'REST APIs',
            when: !options.communication
        },
        {
            type: 'list',
            name: 'ciProvider',
            message: 'Select CI/CD Provider:',
            choices: ['None', 'GitHub Actions', 'Jenkins'],
            default: 'None',
            when: !options.ciProvider
        }
    ];

    const answers = await inquirer.prompt(questions);
    return { ...options, ...answers };
};
