import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const languages = ['JavaScript', 'TypeScript'];
const viewEngines = ['None', 'EJS', 'Pug'];
const databases = ['MySQL', 'PostgreSQL', 'MongoDB', 'None'];
const communications = ['REST APIs', 'GraphQL', 'Kafka'];
const cachings = ['None', 'Redis', 'Memory Cache'];
const auths = ['None', 'JWT'];
const socialAuths = ['None', 'Google,GitHub'];
const backgroundJobs = ['Disabled', 'Enabled'];

let mvcCases = {};
let cleanArchCases = {};
let counter = 1;

const initGroup = (cases, lang, db) => {
    if (!cases[lang]) cases[lang] = {};
    if (!cases[lang][db]) cases[lang][db] = [];
    return cases[lang][db];
};

// MVC
for (const lang of languages) {
    for (const view of viewEngines) {
        for (const db of databases) {
            for (const comm of communications) {
                for (const auth of auths) {
                    const applicableSocials = auth === 'JWT' ? socialAuths : ['None'];
                    for (const social of applicableSocials) {
                        const applicableCachings = db !== 'None' ? cachings : ['None'];
                        for (const cache of applicableCachings) {
                            for (const bgJob of backgroundJobs) {
                                if (bgJob === 'Enabled' && cache !== 'Redis') continue;
                                const group = initGroup(mvcCases, lang, db);
                                group.push(`| ${counter++} | ${view} | ${comm} | ${cache} | ${auth} | ${social} | ${bgJob} |`);
                            }
                        }
                    }
                }
            }
        }
    }
}

// Clean Architecture
for (const lang of languages) {
    for (const db of databases) {
        for (const comm of communications) {
            for (const auth of auths) {
                const applicableSocials = auth === 'JWT' ? socialAuths : ['None'];
                for (const social of applicableSocials) {
                    const applicableCachings = db !== 'None' ? cachings : ['None'];
                    for (const cache of applicableCachings) {
                        for (const bgJob of backgroundJobs) {
                            if (bgJob === 'Enabled' && cache !== 'Redis') continue;
                            const group = initGroup(cleanArchCases, lang, db);
                            group.push(`| ${counter++} | ${comm} | ${cache} | ${auth} | ${social} | ${bgJob} |`);
                        }
                    }
                }
            }
        }
    }
}

const renderGrouped = (groupedCases, isMvc) => {
    let md = '';
    for (const lang of languages) {
        md += `\n### ${lang}\n`;
        for (const db of databases) {
            if (!groupedCases[lang][db] || groupedCases[lang][db].length === 0) continue;
            md += `\n#### Database: ${db}\n\n`;
            if (isMvc) {
                md += `| # | View Engine | Communication | Caching | Auth | Social Auth | Background Jobs |\n`;
                md += `| :--- | :--- | :--- | :--- | :--- | :--- | :--- |\n`;
            } else {
                md += `| # | Communication | Caching | Auth | Social Auth | Background Jobs |\n`;
                md += `| :--- | :--- | :--- | :--- | :--- | :--- |\n`;
            }
            md += groupedCases[lang][db].join('\n') + '\n';
        }
    }
    return md;
};

const totalMvc = Object.values(mvcCases).reduce((acc, langObj) => acc + Object.values(langObj).reduce((sum, arr) => sum + arr.length, 0), 0);
const totalClean = Object.values(cleanArchCases).reduce((acc, langObj) => acc + Object.values(langObj).reduce((sum, arr) => sum + arr.length, 0), 0);

const content = `# NodeJS Quickstart Generator - Test Cases

This document lists the **${counter - 1} possible project combinations** supported by the \`nodejs-quickstart\` CLI. These combinations cover all supported languages, architectures, databases, communication patterns, caching, and authentication options.

## Summary
- **CI Providers**: \`None\`, \`GitHub Actions\`, \`Jenkins\`, \`GitLab CI\`, \`CircleCI\`, \`Bitbucket Pipelines\`
- **MVC Architecture**: ${totalMvc} Combinations
- **Clean Architecture**: ${totalClean} Combinations

**Total Core Combinations: ${counter - 1}**

> **Note on CI/CD**: Each core combination can be generated with \`None\` (1 state) or any of the **5 CI Providers** in two states (with or without Enterprise Security Hardening).
> 
> **Total Validated Permutations**: ${counter - 1} × (1 + 5 × 2) = **${(counter - 1) * 11} Cases**

---

## 1. MVC Architecture (${totalMvc} Cases)
${renderGrouped(mvcCases, true)}

## 2. Clean Architecture (${totalClean} Cases)
*Note: Clean Architecture does not use server-side view engines (EJS/Pug).*
${renderGrouped(cleanArchCases, false)}
`;

fs.writeFileSync(path.join(__dirname, '../docs/generateCase.md'), content);
console.log('Matrix generated');
