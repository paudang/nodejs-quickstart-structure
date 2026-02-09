const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

logger.add(new winston.transports.Console({
  format: process.env.NODE_ENV !== 'production'
    ? winston.format.simple()
    : winston.format.json(),
}));

module.exports = logger;
