import { jest } from '@jest/globals';

jest.unstable_mockModule('inquirer', () => ({
    default: {
        prompt: jest.fn().mockResolvedValue({})
    }
}));

const { getProjectDetails } = await import('../lib/prompts.js');
const inquirer = (await import('inquirer')).default;

describe('CLI Prompts and Command-Line Options Integration', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const getQuestionsForOptions = async (options) => {
        await getProjectDetails(options);
        return inquirer.prompt.mock.calls[0][0];
    };

    const getQuestionByName = (questions, name) => {
        return questions.find(q => q.name === name);
    };

    describe('authChoice prompt logic', () => {
        it('should skip authChoice if --no-advanced-options is passed', async () => {
            const questions = await getQuestionsForOptions({ advancedOptions: false });
            const authQuestion = getQuestionByName(questions, 'authChoice');
            expect(authQuestion.when).toBe(false);
        });

        it('should prompt authChoice if neither --auth nor --no-advanced-options is passed', async () => {
            const questions = await getQuestionsForOptions({});
            const authQuestion = getQuestionByName(questions, 'authChoice');
            expect(authQuestion.when).toBe(true);
        });

        it('should skip authChoice if --auth is passed', async () => {
            const questions = await getQuestionsForOptions({ auth: 'JWT' });
            const authQuestion = getQuestionByName(questions, 'authChoice');
            expect(authQuestion.when).toBe(false);
        });

        it('should prompt authChoice if --advanced-options is passed and no --auth is passed', async () => {
            const questions = await getQuestionsForOptions({ advancedOptions: true });
            const authQuestion = getQuestionByName(questions, 'authChoice');
            expect(authQuestion.when).toBe(true);
        });
    });

    describe('viewEngine prompt logic', () => {
        it('should prompt viewEngine if architecture is MVC', async () => {
            const questions = await getQuestionsForOptions({ architecture: 'MVC' });
            const viewEngineQuestion = getQuestionByName(questions, 'viewEngine');
            // when is a function for viewEngine
            expect(viewEngineQuestion.when({})).toBe(true);
        });

        it('should skip viewEngine if architecture is Clean Architecture', async () => {
            const questions = await getQuestionsForOptions({ architecture: 'Clean Architecture' });
            const viewEngineQuestion = getQuestionByName(questions, 'viewEngine');
            expect(viewEngineQuestion.when({})).toBe(false);
        });
    });

    describe('dbName prompt logic', () => {
        it('should skip dbName if database is None', async () => {
            const questions = await getQuestionsForOptions({ database: 'None' });
            const dbNameQuestion = getQuestionByName(questions, 'dbName');
            expect(dbNameQuestion.when({})).toBe(false);
        });

        it('should prompt dbName if database is provided', async () => {
            const questions = await getQuestionsForOptions({ database: 'MongoDB' });
            const dbNameQuestion = getQuestionByName(questions, 'dbName');
            expect(dbNameQuestion.when({})).toBe(true);
        });
    });

    describe('result resolution logic', () => {
        it('should set auth to ["None"] if authChoice is skipped and no auth is provided', async () => {
            const result = await getProjectDetails({ advancedOptions: false });
            expect(result.auth).toEqual(['None']);
        });

        it('should parse comma-separated auth options correctly', async () => {
            const result = await getProjectDetails({ auth: 'JWT, OAuth2' });
            expect(result.auth).toEqual(['JWT', 'OAuth2']);
        });
        
        it('should enforce Redis caching when background jobs are enabled', async () => {
            const result = await getProjectDetails({ backgroundJobs: true });
            expect(result.caching).toBe('Redis');
        });

        it('should filter out "None" from auth array if "JWT" is also selected (user cheating)', async () => {
            const result = await getProjectDetails({ auth: 'JWT, None' });
            expect(result.auth).not.toContain('None');
            expect(result.auth).toContain('JWT');
        });

        it('should filter out "None" from socialAuth array if a provider is selected (user cheating)', async () => {
            const result = await getProjectDetails({ socialAuth: 'Google, None, GitHub' });
            expect(result.socialAuth).not.toContain('None');
            expect(result.socialAuth).toEqual(['Google', 'GitHub']);
        });

        it('should correctly map the verbose "Google - Github - JWT" auth choice to respective arrays', async () => {
            const result = await getProjectDetails({ auth: 'Google - Github - JWT' });
            expect(result.auth).toEqual(['JWT']);
            expect(result.socialAuth).toContain('Google');
            expect(result.socialAuth).toContain('GitHub');
        });

        it('should normalize boolean string flags (e.g. "Yes" to true) for includeSecurity and withELK', async () => {
            const result = await getProjectDetails({ includeSecurity: 'Yes', withElk: 'Yes', backgroundJobs: 'Yes' });
            expect(result.includeSecurity).toBe(true);
            expect(result.withELK).toBe(true);
            expect(result.backgroundJobs).toBe(true);
        });

        it('should normalize boolean string flags (e.g. "No" to false)', async () => {
            const result = await getProjectDetails({ includeSecurity: 'No', withElk: 'No', backgroundJobs: 'No' });
            expect(result.includeSecurity).toBe(false);
            expect(result.withELK).toBe(false);
            expect(result.backgroundJobs).toBe(false);
        });
    });
});
