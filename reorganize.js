import fs from 'fs-extra';
import path from 'path';

const moveTemplates = async () => {
    try {
        // MVC
        if (await fs.pathExists('templates/mvc/src')) {
            console.log('Moving MVC templates...');
            await fs.move('templates/mvc/src', 'templates/mvc/js/src');
        }

        // Clean Architecture
        if (await fs.pathExists('templates/clean-architecture/src')) {
            console.log('Moving Clean Arch templates...');
            await fs.move('templates/clean-architecture/src', 'templates/clean-architecture/js/src');
        }

        console.log('Templates moved successfully.');
    } catch (err) {
        console.error(err);
    }
};

moveTemplates();
