const startServer = require('./infrastructure/webserver/server');


const PORT = process.env.PORT || 3000;

// Start the web server
startServer(PORT);



// Database Sync
const sequelize = require('./infrastructure/database/database');
sequelize.sync().then(() => {
    console.log('Database synced');
}).catch(err => {
    console.error('Database sync failed:', err);
});