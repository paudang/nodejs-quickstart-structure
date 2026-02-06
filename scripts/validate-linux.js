import { runValidation } from './lib/validation-core.js';

// Parse CLI args for specific test index
const args = process.argv.slice(2);
const specificIndex = args.length > 0 ? parseInt(args[0]) : undefined;

// Run Light Suite (Docker Skipped)
// Suitable for Linux environments without rootless Docker or for fast validation
runValidation({ 
    skipDocker: true, 
    specificTestIndex: specificIndex 
});
