const logger = require('./logger');
const { ApiError } = require('../errors/ApiError');
const HTTP_STATUS = require('./httpCodes');

const errorMiddleware = (err, req, res) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    const statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
    const message = error.message || 'Internal Server Error';
    error = new ApiError(statusCode, message, false, err.stack);
  }

  const { statusCode, message } = error;

  if (statusCode === HTTP_STATUS.INTERNAL_SERVER_ERROR) {
    logger.error(`${statusCode} - ${message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    logger.error(error.stack || 'No stack trace');
  }

  res.status(statusCode).json({
    statusCode,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
  });
};

module.exports = { errorMiddleware };
