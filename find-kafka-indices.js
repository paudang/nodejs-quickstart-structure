import { combinations } from './scripts/lib/validation-core.js';

combinations.forEach((c, i) => {
    if (c.communication === 'Kafka') {
        console.log(`${i}: ${c.projectName} (${c.architecture}, ${c.language})`);
    }
});
