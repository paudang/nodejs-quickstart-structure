const startServer = require('./infrastructure/webserver/server');

const PORT = process.env.PORT || 3000;

startServer(PORT);
