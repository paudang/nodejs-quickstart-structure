const { ApiError } = require('./ApiError');
const HTTP_STATUS = require('../utils/httpCodes');
const ERROR_MESSAGES = require('../utils/errorMessages');

class NotFoundError extends ApiError {
  constructor(message = ERROR_MESSAGES.RESOURCE_NOT_FOUND) {
    super(HTTP_STATUS.NOT_FOUND, message);
  }
}

module.exports = { NotFoundError };
