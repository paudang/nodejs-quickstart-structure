import { runValidation } from './lib/validation-core.js';

// Run specific test index 40 (Clean Architecture + TypeScript + MongoDB + REST APIs)
// with Docker enabled to verify migration service.
console.log("Starting Migration Verification for MongoDB...");
runValidation({ 
    skipDocker: false, 
    specificTestIndex: 40 
});
