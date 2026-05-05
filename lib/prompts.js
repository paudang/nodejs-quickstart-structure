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
            type: 'select',
            name: 'authChoice',
            message: 'Select Authentication Mode:',
            choices: ['None', 'JWT', 'Google - Github - JWT'],
            default: 'None',
            when: (answers) => {
                const advanced = options.advancedOptions !== undefined ? options.advancedOptions : answers.advancedOptions;
                return (advanced === 'Yes' || advanced === true) && !options.auth;
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

    // Map authChoice to auth and socialAuth if not provided via options
    if (!options.auth && result.authChoice) {
        const choice = result.authChoice.toLowerCase();
        if (choice.includes('google') || choice.includes('github')) {
            result.auth = ['JWT'];
            result.socialAuth = ['Google', 'GitHub'];
        } else if (choice.includes('jwt')) {
            result.auth = ['JWT'];
            result.socialAuth = ['None'];
        } else {
            result.auth = ['None'];
            result.socialAuth = ['None'];
        }
    }
    
    // Cleanup the temporary authChoice
    delete result.authChoice;

    // Normalize auth to array if it's a string from the options
    if (typeof result.auth === 'string') {
        result.auth = [result.auth];
    }

    // Map friendly CLI strings to actual values
    if (result.auth && (result.auth.includes('Google - Github - JWT') || result.auth.includes('Google - GitHub - JWT'))) {
        result.auth = ['JWT'];
        if (!result.socialAuth || result.socialAuth.includes('None')) {
            result.socialAuth = ['Google', 'GitHub'];
        }
    }

    // Default auth if not provided
    if (!result.auth) {
        result.auth = ['None'];
    }

    // Filter out 'None' if 'JWT' is selected
    if (result.auth.includes('JWT')) {
        result.auth = result.auth.filter(a => a !== 'None');
    }

    // Normalize socialAuth to array from options
    if (typeof result.socialAuth === 'string') {
        result.socialAuth = [result.socialAuth];
    }

    // Default socialAuth if not provided
    if (!result.socialAuth) {
        result.socialAuth = ['None'];
    }

    // Filter out 'None' if providers are selected
    if (result.socialAuth.includes('Google') || result.socialAuth.includes('GitHub') || result.socialAuth.includes('Github')) {
        result.socialAuth = result.socialAuth.filter(a => a !== 'None');
    }

    return result;
};
