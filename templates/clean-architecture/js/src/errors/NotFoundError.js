const { ApiError } = require('./ApiError');
const { HTTP_STATUS } = require('../utils/httpCodes');

class NotFoundError extends ApiError {
  constructor(message = 'Resource not found') {
    super(HTTP_STATUS.NOT_FOUND, message);
  }
}

module.exports = { NotFoundError };
