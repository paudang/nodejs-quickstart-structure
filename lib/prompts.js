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
            name: 'communication',
            message: 'Microservices Communication:',
            choices: ['REST APIs', 'GraphQL', 'Kafka'],
            default: 'REST APIs',
            when: !options.communication
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
            name: 'caching',
            message: 'Caching Layer:',
            choices: ['None', 'Redis', 'Memory Cache'],
            default: 'None',
            when: !options.caching
        },
        {
            type: 'select',
            name: 'authChoice',
            message: 'Select Authentication Mode:',
            choices: ['None', 'JWT', 'Google - Github - JWT'],
            default: 'None',
            when: !options.auth && options.advancedOptions !== false
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
            message: 'Enable Advanced Options (Terraform, Resilience, etc.)?',
            choices: ['No', 'Yes'],
            default: 'No',
            when: options.advancedOptions === undefined
        },
        {
            type: 'select',
            name: 'useApiGateway',
            message: 'Integrate an API Gateway?',
            choices: ['No', 'Yes'],
            default: 'No',
            when: (answers) => {
                const advanced = options.advancedOptions !== undefined ? options.advancedOptions : answers.advancedOptions;
                const comm = options.communication !== undefined ? options.communication : answers.communication;
                return (advanced === 'Yes' || advanced === true) && comm !== 'Kafka' && options.apiGateway === undefined;
            }
        },
        {
            type: 'select',
            name: 'apiGateway',
            message: 'Select API Gateway:',
            choices: ['Nginx', 'Kong (DB-less)'],
            default: 'Nginx',
            when: (answers) => answers.useApiGateway === 'Yes' && options.apiGateway === undefined
        },
        {
            type: 'checkbox',
            name: 'resilience',
            message: 'Select Application Resilience Features:',
            choices: [
                { name: '1. Timeout (Prevent resource hanging)', value: 'Timeout' },
                { name: '2. Advanced Retry (Exponential Backoff)', value: 'Retry' },
                { name: '3. Circuit Breaker (Isolate failing downstream services)', value: 'CircuitBreaker' }
            ],
            default: [],
            when: (answers) => {
                const advanced = options.advancedOptions !== undefined ? options.advancedOptions : answers.advancedOptions;
                return (advanced === 'Yes' || advanced === true) && !options.resilience;
            }
        },
        {
            type: 'select',
            name: 'terraform',
            message: 'Select Infrastructure (IaC - Terraform):',
            choices: [
                { name: 'None (No infrastructure files)', value: 'None' },
                { name: 'Standard (Single VM - Cost Efficient)', value: 'Standard' },
                { name: 'Production (WAF + LB + Private Subnets - High Availability)', value: 'Production' }
            ],
            default: 'None',
            when: (answers) => {
                const advanced = options.advancedOptions !== undefined ? options.advancedOptions : answers.advancedOptions;
                return (advanced === 'Yes' || advanced === true) && !options.terraform;
            }
        },
        {
            type: 'select',
            name: 'cloudProvider',
            message: 'Select Cloud Provider for Terraform:',
            choices: ['AWS', 'GCP', 'Azure'],
            default: 'AWS',
            when: (answers) => {
                const tf = options.terraform !== undefined ? options.terraform : answers.terraform;
                return tf && tf !== 'None' && !options.cloudProvider;
            }
        },
        {
            type: 'select',
            name: 'withELK',
            message: 'Enable Centralized Logging (ELK Stack - Elasticsearch & Kibana)?',
            choices: ['No', 'Yes'],
            default: 'No',
            when: (answers) => {
                const advanced = options.advancedOptions !== undefined ? options.advancedOptions : answers.advancedOptions;
                return (advanced === 'Yes' || advanced === true) && options.withElk === undefined;
            }
        },
        {
            type: 'select',
            name: 'backgroundJobs',
            message: 'Enable Background Jobs & Task Queues (BullMQ + Bull-Board)?',
            choices: ['No', 'Yes'],
            default: 'No',
            when: (answers) => {
                const advanced = options.advancedOptions !== undefined ? options.advancedOptions : answers.advancedOptions;
                return (advanced === 'Yes' || advanced === true) && options.backgroundJobs === undefined;
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

    if (options.apiGateway !== undefined) {
        result.apiGateway = options.apiGateway;
    } else if (result.useApiGateway === 'No' || !result.apiGateway) {
        result.apiGateway = 'None';
    }
    delete result.useApiGateway;

    if (result.communication === 'Kafka') {
        result.apiGateway = 'None';
    }

    if (options.withElk !== undefined) {
        result.withELK = options.withElk;
    }
    if (typeof result.withELK === 'string') {
        result.withELK = result.withELK === 'Yes' || result.withELK === 'true';
    } else if (result.withELK === undefined) {
        result.withELK = false;
    }

    if (options.backgroundJobs !== undefined) {
        result.backgroundJobs = options.backgroundJobs;
    }
    if (typeof result.backgroundJobs === 'string') {
        result.backgroundJobs = result.backgroundJobs === 'Yes' || result.backgroundJobs === 'true';
    } else if (result.backgroundJobs === undefined) {
        result.backgroundJobs = false;
    }

    if (result.backgroundJobs) {
        result.caching = 'Redis'; // Background jobs require Redis
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
        result.auth = result.auth.split(',').map(s => s.trim());
    } else if (Array.isArray(result.auth)) {
        result.auth = result.auth.flatMap(s => s.split(',').map(ss => ss.trim()));
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
        result.socialAuth = result.socialAuth.split(',').map(s => s.trim());
    } else if (Array.isArray(result.socialAuth)) {
        result.socialAuth = result.socialAuth.flatMap(s => s.split(',').map(ss => ss.trim()));
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
