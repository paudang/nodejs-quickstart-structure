const { ApiError } = require('./ApiError');
const HTTP_STATUS = require('../utils/httpCodes');

class BadRequestError extends ApiError {
  constructor(message = 'Bad request') {
    super(HTTP_STATUS.BAD_REQUEST, message);
  }
}

module.exports = { BadRequestError };
