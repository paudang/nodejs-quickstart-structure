import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const languages = ['JavaScript', 'TypeScript'];
const archs = ['MVC', 'Clean Architecture'];
const viewEngines = ['None', 'EJS', 'Pug'];
const databases = ['MySQL', 'PostgreSQL', 'MongoDB', 'None'];
const communications = ['REST APIs', 'GraphQL', 'Kafka'];
const cachings = ['None', 'Redis', 'Memory Cache'];
const auths = ['None', 'JWT'];
const socialAuths = ['None', 'Google,GitHub'];

let mvcCases = [];
let cleanArchCases = [];
let counter = 1;

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
                            mvcCases.push(`| ${counter++} | ${lang} | MVC | ${view} | ${db} | ${comm} | ${cache} | ${auth} | ${social} |`);
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
                        cleanArchCases.push(`| ${counter++} | ${lang} | Clean Architecture | N/A | ${db} | ${comm} | ${cache} | ${auth} | ${social} |`);
                    }
                }
            }
        }
    }
}


const content = `# NodeJS Quickstart Generator - Test Cases

This document lists the **${counter - 1} possible project combinations** supported by the \`nodejs-quickstart\` CLI. These combinations cover all supported languages, architectures, databases, communication patterns, caching, and authentication options.

## Summary
- **CI Providers**: \`None\`, \`GitHub Actions\`, \`Jenkins\`, \`GitLab CI\`, \`CircleCI\`, \`Bitbucket Pipelines\`
- **MVC Architecture**: ${mvcCases.length} Combinations
  - **With Database (324)**: 2 Lang × 3 View × 3 DB × 3 Comm × 2 Auth = 108 * 3 (Caching: None/Redis/Memory Cache) = 324
  - **No Database (36)**: 2 Lang × 3 View × 1 DB × 3 Comm × 2 Auth = 36 * 1 (Caching: None) = 36
- **Clean Architecture**: ${cleanArchCases.length} Combinations
  - **With Database (108)**: 2 Lang × 1 View (None) × 3 DB × 3 Comm × 2 Auth = 36 * 3 (Caching: None/Redis/Memory Cache) = 108
  - **No Database (12)**: 2 Lang × 1 View (None) × 1 DB × 3 Comm × 2 Auth = 12 * 1 (Caching: None) = 12

**Total Core Combinations: ${counter - 1}**

> **Note on CI/CD**: Each core combination can be generated with \`None\` (1 state) or any of the **5 CI Providers** in two states (with or without Enterprise Security Hardening).
> 
> **Total Validated Permutations**: ${counter - 1} × (1 + 5 × 2) = **${(counter - 1) * 11} Cases**


---

## 1. MVC Architecture (${mvcCases.length} Cases)

| # | Language | Architecture | View Engine | Database | Communication | Caching | Auth | Social Auth |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |

${mvcCases.join('\n')}

## 2. Clean Architecture (${cleanArchCases.length} Cases)
*Note: Clean Architecture does not use server-side view engines (EJS/Pug).*

| # | Language | Architecture | View Engine | Database | Communication | Caching | Auth | Social Auth |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |

${cleanArchCases.join('\n')}
`;

fs.writeFileSync(path.join(__dirname, '../docs/generateCase.md'), content);
console.log('Matrix generated');
