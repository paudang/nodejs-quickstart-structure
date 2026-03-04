import { runValidation } from './lib/validation-core.js';

// Parse CLI args for start and end test index
const args = process.argv.slice(2);
const startIndex = args.length > 0 ? parseInt(args[0], 10) : 0;
const endIndex = args.length > 1 ? parseInt(args[1], 10) : 240;

// Run the targeted subset of the test suite (Docker Enabled)
runValidation({ 
    skipDocker: false, 
    startIndex,
    endIndex,
    concurrency: 4 // Adjust concurrency if needed depending on your computer's resources
});
