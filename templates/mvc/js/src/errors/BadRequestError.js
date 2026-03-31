const { ApiError } = require('./ApiError');
const HTTP_STATUS = require('../utils/httpCodes');
const ERROR_MESSAGES = require('../utils/errorMessages');

class BadRequestError extends ApiError {
  constructor(message = ERROR_MESSAGES.BAD_REQUEST) {
    super(HTTP_STATUS.BAD_REQUEST, message);
  }
}

module.exports = { BadRequestError };
