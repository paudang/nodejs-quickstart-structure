import { runValidation } from './lib/validation-core.js';

async function run() {
    await runValidation({ startIndex: 1, endIndex: 1, concurrency: 1, skipDocker: true });
}

run();
