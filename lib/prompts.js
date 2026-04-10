import inquirer from 'inquirer';

const validateName = (name) => {
    return /^[a-zA-Z0-9-_]+$/.test(name) ? true : 'Project name may only include letters, numbers, underscores and dashes.';
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
            type: 'select',
            name: 'language',
            message: 'Select Language:',
            choices: ['JavaScript', 'TypeScript'],
            default: 'TypeScript',
            when: !options.language
        },
        {
            type: 'select',
            name: 'architecture',
            message: 'Select Architecture:',
            choices: ['MVC', 'Clean Architecture'],
            default: 'MVC',
            when: !options.architecture
        },
        {
            type: 'select',
            name: 'viewEngine',
            message: 'Select View Engine:',
            choices: ['None', 'EJS', 'Pug'],
            when: (answers) => (options.architecture || answers.architecture) === 'MVC' && !options.viewEngine,
            default: 'None'
        },
        {
            type: 'select',
            name: 'database',
            message: 'Select Database:',
            choices: ['None', 'MySQL', 'PostgreSQL', 'MongoDB'],
            default: 'None',
            when: !options.database
        },
        {
            type: 'input',
            name: 'dbName',
            message: 'Database Name:',
            default: 'demo',
            validate: validateName,
            when: (answers) => !options.dbName && (options.database || answers.database) !== 'None'
        },
        {
            type: 'select',
            name: 'communication',
            message: 'Microservices Communication:',
            choices: ['REST APIs', 'GraphQL', 'Kafka'],
            default: 'REST APIs',
            when: !options.communication
        },
        {
            type: 'select',
            name: 'caching',
            message: 'Caching Layer:',
            choices: ['None', 'Redis', 'Memory Cache'],
            default: 'None',
            when: (answers) => !options.caching && (options.database || answers.database) !== 'None'
        },
        {
            type: 'select',
            name: 'ciProvider',
            message: 'Select CI/CD Provider:',
            choices: ['None', 'GitHub Actions', 'Jenkins', 'GitLab CI', 'CircleCI', 'Bitbucket Pipelines'],
            default: 'None',
            when: !options.ciProvider
        },
        {
            type: 'select',
            name: 'includeSecurity',
            message: 'Include Enterprise Security Hardening (Big Tech Standard: Snyk, SonarQube)?',
            choices: ['No', 'Yes'],
            default: "No",
            when: (answers) => options.includeSecurity === undefined && (options.ciProvider || answers.ciProvider) !== 'None'
        },
        {
            type: 'select',
            name: 'advancedOptions',
            message: 'Enable Advanced Options (Authentication, etc.)?',
            choices: ['No', 'Yes'],
            default: 'No',
            when: options.advancedOptions === undefined
        },
        {
            type: 'checkbox',
            name: 'auth',
            message: 'Select Authentication Modes:',
            choices: ['None', 'JWT'],
            default: ['None'],
            when: (answers) => {
                const advanced = options.advancedOptions !== undefined ? options.advancedOptions : answers.advancedOptions;
                return (advanced === 'Yes' || advanced === true) && !options.auth;
            },
            validate: (answer) => {
                if (answer.length === 0) return 'You must select at least one option.';
                if (answer.includes('JWT') && answer.includes('None')) {
                    return 'Selecting "JWT" will automatically disable "None". Please uncheck one.';
                }
                return true;
            }
        }
    ];

    const answers = await inquirer.prompt(questions);
    const result = { ...options, ...answers };

    // Normalize includeSecurity to boolean if it's a string from the select prompt
    if (typeof result.includeSecurity === 'string') {
        result.includeSecurity = result.includeSecurity === 'Yes';
    }

    if (typeof result.advancedOptions === 'string') {
        result.advancedOptions = result.advancedOptions === 'Yes';
    }

    // Default auth if not provided
    if (!result.auth) {
        result.auth = ['None'];
    }

    // Filter out 'None' if 'JWT' is selected
    if (result.auth.includes('JWT')) {
        result.auth = result.auth.filter(a => a !== 'None');
    }

    return result;
};

