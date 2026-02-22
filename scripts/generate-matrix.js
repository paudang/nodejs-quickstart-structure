import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const languages = ['JavaScript', 'TypeScript'];
const archs = ['MVC', 'Clean Architecture'];
const viewEngines = ['None', 'EJS', 'Pug'];
const databases = ['MySQL', 'PostgreSQL', 'MongoDB', 'None'];
const communications = ['REST APIs', 'Kafka'];
const cachings = ['None', 'Redis', 'Memory Cache'];

let mvcCases = [];
let cleanArchCases = [];
let counter = 1;

// MVC
for (const lang of languages) {
    for (const view of viewEngines) {
        for (const db of databases) {
            for (const comm of communications) {
                const applicableCachings = db !== 'None' ? cachings : ['None'];
                for (const cache of applicableCachings) {
                    mvcCases.push(`| ${counter++} | ${lang} | MVC | ${view} | ${db} | ${comm} | ${cache} |`);
                }
            }
        }
    }
}

// Clean Architecture
for (const lang of languages) {
    for (const db of databases) {
        for (const comm of communications) {
            const applicableCachings = db !== 'None' ? cachings : ['None'];
            for (const cache of applicableCachings) {
                cleanArchCases.push(`| ${counter++} | ${lang} | Clean Architecture | N/A | ${db} | ${comm} | ${cache} |`);
            }
        }
    }
}

const content = `# NodeJS Quickstart Generator - Test Cases

This document lists the **${counter - 1} possible project combinations** supported by the \`nodejs-quickstart\` CLI. These combinations cover all supported languages, architectures, databases, communication patterns, and caching options.

## Summary
- **CI Providers**: \`None\`, \`GitHub Actions\`, \`Jenkins\`, \`GitLab CI\`
- **MVC Architecture**: ${mvcCases.length} Combinations
  - **With Database (108)**: 2 Lang × 3 View × 3 DB × 2 Comm = 36 * 3 (Caching: None/Redis/Memory Cache) = 108
  - **No Database (12)**: 2 Lang × 3 View × 1 DB × 2 Comm = 12 * 1 (Caching: None) = 12
- **Clean Architecture**: ${cleanArchCases.length} Combinations
  - **With Database (36)**: 2 Lang × 1 View (None) × 3 DB × 2 Comm = 12 * 3 (Caching: None/Redis/Memory Cache) = 36
  - **No Database (4)**: 2 Lang × 1 View (None) × 1 DB × 2 Comm = 4 * 1 (Caching: None) = 4

**Total Core Combinations: ${counter - 1}**

> **Note on CI/CD**: Each combination can be generated with or without CI/CD (\`--ci-provider\`), effectively doubling the state space.

---

## 1. MVC Architecture (${mvcCases.length} Cases)

| # | Language | Architecture | View Engine | Database | Communication | Caching |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
${mvcCases.join('\n')}

## 2. Clean Architecture (${cleanArchCases.length} Cases)
*Note: Clean Architecture does not use server-side view engines (EJS/Pug).*

| # | Language | Architecture | View Engine | Database | Communication | Caching |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
${cleanArchCases.join('\n')}
`;

fs.writeFileSync(path.join(__dirname, '../docs/generateCase.md'), content);
console.log('Matrix generated');
