import { runValidation } from './lib/validation-core.js';

// Parse CLI args for specific test index or range (start, end)
const args = process.argv.slice(2);
let specificIndex = undefined;
let startIndex = 0;
let endIndex = undefined;

if (args.length === 1) {
    specificIndex = parseInt(args[0]);
} else if (args.length >= 2) {
    startIndex = parseInt(args[0]);
    endIndex = parseInt(args[1]);
}

// Run Full Suite (Docker Enabled)
runValidation({ 
    skipDocker: false, 
    specificTestIndex: specificIndex,
    startIndex,
    endIndex,
    concurrency: 4
});
