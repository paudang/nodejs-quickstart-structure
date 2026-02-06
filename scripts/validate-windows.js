import { runValidation } from './lib/validation-core.js';

// Parse CLI args for specific test index
const args = process.argv.slice(2);
const specificIndex = args.length > 0 ? parseInt(args[0]) : undefined;

// Run Full Suite (Docker Enabled)
runValidation({ 
    skipDocker: false, 
    specificTestIndex: specificIndex 
});
