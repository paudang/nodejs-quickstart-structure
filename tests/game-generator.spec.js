import { useGenerator } from '../docs/.vitepress/theme/composables/useGenerator.js';

describe('Game Generator (useGenerator) Logic', () => {
    let generator;

    beforeEach(() => {
        // Reset generator state before each test
        generator = useGenerator();
        const { form, showAdvanced } = generator;
        form.projectName = 'test-app';
        form.language = 'JavaScript';
        form.architecture = 'MVC';
        form.viewEngine = 'None';
        form.database = 'None';
        form.dbName = '';
        form.communication = 'REST APIs';
        form.caching = 'None';
        form.ciProvider = 'None';
        form.includeSecurity = false;
        form.auth = 'None';
        form.terraform = 'None';
        form.cloudProvider = 'AWS';
        form.resilience = [];
        form.withELK = false;
        form.backgroundJobs = false;
        showAdvanced.value = false;
    });

    it('should generate basic command (JS, MVC, No Infra)', () => {
        const { cliCommand } = generator;
        const cmd = cliCommand.value;
        
        expect(cmd).toContain('npx nodejs-quickstart-structure@latest init');
        expect(cmd).toContain('-n "test-app"');
        expect(cmd).toContain('-l "JavaScript"');
        expect(cmd).toContain('-a "MVC"');
        expect(cmd).toContain('-d "None"');
        expect(cmd).toContain('-c "REST APIs"');
        expect(cmd).toContain('--caching "None"');
        expect(cmd).toContain('--ci-provider "None"');
        expect(cmd).toContain('--auth None');
        expect(cmd).toContain('--no-advanced-options');
        expect(cmd).not.toContain('--db-name');
    });

    it('should generate valid CLI command for full enterprise setup (All Features)', () => {
        const { form, cliCommand, showAdvanced } = generator;
        
        form.projectName = 'enterprise-app';
        form.language = 'TypeScript';
        form.architecture = 'Clean Architecture';
        form.database = 'PostgreSQL';
        form.dbName = 'core_db';
        form.communication = 'Kafka';
        
        // Advanced
        showAdvanced.value = true;
        form.auth = 'OAuth2 - Google/GitHub - JWT';
        form.resilience = ['Timeout', 'Retry'];
        form.backgroundJobs = true;
        form.caching = 'Redis'; // Background jobs forces Redis
        form.withELK = true;
        form.ciProvider = 'GitHub Actions';
        form.includeSecurity = true;
        form.terraform = 'Production';
        form.cloudProvider = 'AWS';

        const cmd = cliCommand.value;
        expect(cmd).toContain('-n "enterprise-app"');
        expect(cmd).toContain('-l "TypeScript"');
        expect(cmd).toContain('-a "Clean Architecture"');
        expect(cmd).toContain('-d "PostgreSQL" --db-name "core_db"');
        expect(cmd).toContain('-c "Kafka"');
        expect(cmd).toContain('--caching "Redis"');
        expect(cmd).toContain('--auth JWT --social-auth Google GitHub');
        expect(cmd).toContain('--resilience Timeout Retry');
        expect(cmd).toContain('--background-jobs');
        expect(cmd).toContain('--with-elk');
        expect(cmd).toContain('--ci-provider "GitHub Actions"');
        expect(cmd).toContain('--include-security');
        expect(cmd).toContain('--terraform "Production" --cloud-provider "AWS"');
        expect(cmd).toContain('--advanced-options');
    });

    it('should correctly format JWT-only Authentication', () => {
        const { form, cliCommand } = generator;
        form.auth = 'JWT Authentication';
        
        expect(cliCommand.value).toContain('--auth JWT');
        expect(cliCommand.value).not.toContain('--social-auth');
    });

    it('should exclude --db-name if database is None', () => {
        const { form, cliCommand } = generator;
        form.database = 'None';
        form.dbName = 'ignored_name';
        
        expect(cliCommand.value).toContain('-d "None"');
        expect(cliCommand.value).not.toContain('--db-name');
    });

    it('should generate GraphQL and MongoDB combination correctly', () => {
        const { form, cliCommand } = generator;
        form.communication = 'GraphQL';
        form.database = 'MongoDB';
        form.dbName = 'mongo_test';
        form.caching = 'Memory Cache';
        
        const cmd = cliCommand.value;
        expect(cmd).toContain('-c "GraphQL"');
        expect(cmd).toContain('-d "MongoDB" --db-name "mongo_test"');
        expect(cmd).toContain('--caching "Memory Cache"');
    });

    it('should disable security correctly if includeSecurity is false', () => {
        const { form, cliCommand } = generator;
        form.ciProvider = 'GitLab CI';
        form.includeSecurity = false;
        
        expect(cliCommand.value).toContain('--ci-provider "GitLab CI"');
        expect(cliCommand.value).toContain('--no-include-security');
    });

    it('should include MVC view engines correctly', () => {
        const { form, cliCommand } = generator;
        form.architecture = 'MVC';
        form.viewEngine = 'EJS';
        
        expect(cliCommand.value).toContain('-a "MVC"');
        expect(cliCommand.value).toContain('--view-engine "EJS"');
    });

    it('should not output view engine if architecture is Clean Architecture', () => {
        const { form, cliCommand } = generator;
        form.architecture = 'Clean Architecture';
        form.viewEngine = 'EJS'; // Even if mistakenly set
        
        expect(cliCommand.value).not.toContain('--view-engine');
    });

    it('should append no-with-elk if advanced options are open but elk is off', () => {
        const { form, cliCommand, showAdvanced } = generator;
        showAdvanced.value = true;
        form.withELK = false;
        
        expect(cliCommand.value).toContain('--no-with-elk');
    });

    it('should handle resilience "None" correctly when advanced options are shown', () => {
        const { form, cliCommand, showAdvanced } = generator;
        showAdvanced.value = true;
        form.resilience = [];
        
        expect(cliCommand.value).toContain('--resilience None');
    });

    describe('Game Specific Scenarios (Project Coverage)', () => {
        beforeEach(() => {
            // Reset state before each game simulation test
            const { form, showAdvanced } = generator;
            form.projectName = 'nodejs-service';
            form.language = 'TypeScript';
            form.architecture = 'MVC';
            form.viewEngine = 'None';
            form.database = 'None';
            form.dbName = '';
            form.communication = 'REST APIs';
            form.caching = 'None';
            form.auth = 'None';
            form.ciProvider = 'None';
            form.includeSecurity = false;
            form.terraform = 'None';
            form.cloudProvider = 'None';
            form.resilience = [];
            form.withELK = false;
            form.backgroundJobs = false;
            showAdvanced.value = false;
        });

        // ==========================================
        // 1. THE ARCHITECTURE SKILL TREE SCENARIOS
        // ==========================================
        it('SkillTreeGame: Minimal MVC Project (JavaScript, Pug, MySQL, REST)', () => {
            const { form, cliCommand } = generator;
            form.projectName = 'skill-mvc-min';
            form.language = 'JavaScript';
            form.architecture = 'MVC';
            form.viewEngine = 'Pug';
            form.database = 'MySQL';
            form.dbName = 'core_db';
            form.caching = 'None';
            form.communication = 'REST APIs';
            
            const cmd = cliCommand.value;
            expect(cmd).toContain('-n "skill-mvc-min"');
            expect(cmd).toContain('-l "JavaScript"');
            expect(cmd).toContain('-a "MVC"');
            expect(cmd).toContain('--view-engine "Pug"');
            expect(cmd).toContain('-d "MySQL"');
            expect(cmd).toContain('-c "REST APIs"');
            expect(cmd).toContain('--caching "None"');
            expect(cmd).toContain('--no-advanced-options');
        });

        it('SkillTreeGame: Maximum Enterprise Clean Architecture (GraphQL, Mongo, Full Enterprise, AWS)', () => {
            const { form, cliCommand, showAdvanced } = generator;
            form.projectName = 'skill-clean-max';
            form.language = 'TypeScript';
            form.architecture = 'Clean Architecture';
            form.database = 'MongoDB';
            form.dbName = 'core_db';
            form.caching = 'Memory Cache';
            form.communication = 'GraphQL';
            form.auth = 'OAuth2 - Google/GitHub - JWT';
            form.resilience = ['Timeout', 'CircuitBreaker'];
            form.withELK = true;
            form.backgroundJobs = true;
            form.caching = 'Redis'; // Forced by background jobs logic
            form.ciProvider = 'GitLab CI';
            form.includeSecurity = true;
            form.terraform = 'Production';
            form.cloudProvider = 'AWS';
            showAdvanced.value = true;

            const cmd = cliCommand.value;
            expect(cmd).toContain('-a "Clean Architecture"');
            expect(cmd).not.toContain('--view-engine');
            expect(cmd).toContain('-d "MongoDB"');
            expect(cmd).toContain('-c "GraphQL"');
            expect(cmd).toContain('--caching "Redis"');
            expect(cmd).toContain('--auth JWT --social-auth Google GitHub');
            expect(cmd).toContain('--resilience Timeout CircuitBreaker');
            expect(cmd).toContain('--with-elk');
            expect(cmd).toContain('--background-jobs');
            expect(cmd).toContain('--ci-provider "GitLab CI"');
            expect(cmd).toContain('--include-security');
            expect(cmd).toContain('--terraform "Production"');
            expect(cmd).toContain('--cloud-provider "AWS"');
        });

        // ==========================================
        // 2. BACKEND FACTORIO SCENARIOS
        // ==========================================
        it('FactorioGame: Fast Pipeline (Clean Arch, Kafka, Redis, Bitbucket CI, Azure)', () => {
            const { form, cliCommand, showAdvanced } = generator;
            
            // Factorio applyConfigToForm simulation
            form.projectName = 'factory-backend';
            showAdvanced.value = true;
            
            // Slot configurations
            form.architecture = 'Clean Architecture';
            form.language = 'TypeScript';
            form.communication = 'Kafka';
            form.backgroundJobs = false;
            form.database = 'PostgreSQL';
            form.dbName = 'factory_db';
            form.caching = 'Redis';
            form.ciProvider = 'GitHub Actions';
            form.includeSecurity = true;
            form.terraform = 'Production';
            form.cloudProvider = 'GCP';

            const cmd = cliCommand.value;
            expect(cmd).toContain('-n "factory-backend"');
            expect(cmd).toContain('-a "Clean Architecture"');
            expect(cmd).toContain('-c "Kafka"');
            expect(cmd).toContain('-d "PostgreSQL"');
            expect(cmd).toContain('--caching "Redis"');
            expect(cmd).toContain('--ci-provider "GitHub Actions"');
            expect(cmd).toContain('--cloud-provider "GCP"');
        });

        it('FactorioGame: Alternate CI/CD Pipelines (Bitbucket, CircleCI, Jenkins)', () => {
            const { form, cliCommand, showAdvanced } = generator;
            form.projectName = 'factory-alt-ci';
            showAdvanced.value = true;
            
            form.ciProvider = 'Bitbucket Pipelines';
            form.includeSecurity = true;
            expect(cliCommand.value).toContain('--ci-provider "Bitbucket Pipelines"');
            expect(cliCommand.value).toContain('--include-security');

            form.ciProvider = 'CircleCI';
            expect(cliCommand.value).toContain('--ci-provider "CircleCI"');

            form.ciProvider = 'Jenkins';
            expect(cliCommand.value).toContain('--ci-provider "Jenkins"');
        });

        it('FactorioGame: Complete "None" Infrastructure (No CI/CD, No Cloud) with MVC', () => {
            const { form, cliCommand, showAdvanced } = generator;
            form.projectName = 'factory-none-infra';
            form.architecture = 'MVC';
            form.viewEngine = 'EJS';
            form.language = 'JavaScript';
            form.communication = 'REST APIs';
            form.database = 'MySQL';
            form.dbName = 'mysql_db';
            form.caching = 'None';
            form.auth = 'None';
            showAdvanced.value = true;
            form.ciProvider = 'None';
            form.terraform = 'None';
            form.cloudProvider = 'None';

            const cmd = cliCommand.value;
            expect(cmd).toContain('-a "MVC"');
            expect(cmd).toContain('--view-engine "EJS"');
            expect(cmd).toContain('--ci-provider "None"');
            expect(cmd).toContain('--terraform None');
            expect(cmd).not.toContain('--cloud-provider');
        });

        it('FactorioGame: Background Jobs Forced Redis Simulation', () => {
            const { form, cliCommand, showAdvanced } = generator;
            form.projectName = 'factory-bg-jobs';
            showAdvanced.value = true;
            form.architecture = 'Clean Architecture';
            form.language = 'TypeScript';
            form.communication = 'REST APIs';
            form.database = 'PostgreSQL';
            form.dbName = 'pg_db';
            form.backgroundJobs = true;
            form.caching = 'Redis'; // Automatically forced when backgroundJobs is true

            const cmd = cliCommand.value;
            expect(cmd).toContain('--background-jobs');
            expect(cmd).toContain('--caching "Redis"');
        });

        it('SkillTreeGame: TypeScript Clean Architecture with PostgreSQL and Memory Cache', () => {
            const { form, cliCommand, showAdvanced } = generator;
            form.projectName = 'skill-tree-mem-cache';
            form.architecture = 'Clean Architecture';
            form.language = 'TypeScript';
            form.database = 'PostgreSQL';
            form.dbName = 'pg_db';
            form.caching = 'Memory Cache';
            form.communication = 'REST APIs';
            form.auth = 'JWT Authentication';
            showAdvanced.value = true;

            const cmd = cliCommand.value;
            expect(cmd).toContain('-a "Clean Architecture"');
            expect(cmd).toContain('--caching "Memory Cache"');
            expect(cmd).toContain('--auth JWT');
        });

        it('FactorioGame: GraphQL without Database', () => {
            const { form, cliCommand, showAdvanced } = generator;
            form.projectName = 'factory-graphql-nodb';
            form.architecture = 'MVC';
            form.viewEngine = 'None';
            form.language = 'JavaScript';
            form.communication = 'GraphQL';
            form.database = 'None';
            form.caching = 'Memory Cache';
            showAdvanced.value = false;

            const cmd = cliCommand.value;
            expect(cmd).toContain('-c "GraphQL"');
            expect(cmd).toContain('-d "None"');
            expect(cmd).toContain('--caching "Memory Cache"');
            expect(cmd).not.toContain('--db-name');
        });

        it('SkillTreeGame: Advanced Options Enabled but All Features Disabled', () => {
            const { form, cliCommand, showAdvanced } = generator;
            form.projectName = 'skill-tree-adv-none';
            form.architecture = 'Clean Architecture';
            form.language = 'TypeScript';
            form.communication = 'REST APIs';
            form.database = 'None';
            showAdvanced.value = true;
            form.auth = 'None';
            form.resilience = [];
            form.backgroundJobs = false;
            form.withELK = false;
            form.ciProvider = 'None';
            form.includeSecurity = false;
            form.terraform = 'None';

            const cmd = cliCommand.value;
            expect(cmd).toContain('--advanced-options');
            expect(cmd).toContain('--auth None');
            expect(cmd).toContain('--resilience None');
            expect(cmd).toContain('--no-with-elk');
            expect(cmd).toContain('--ci-provider "None"');
            expect(cmd).not.toContain('include-security');
            expect(cmd).toContain('--terraform None');
        });
    });
});
